from fileinput import filename
from flask import Flask, request
from flask_cors import CORS
from models.user import db, User
from models.expense import Expense
from models.budget import Budget
from reports.report_generator import generate_report
from flask import send_file
from groq import Groq
from dotenv import load_dotenv
import os
from models.report import Report
from datetime import datetime


app = Flask(__name__)
CORS(
    app,
    resources={
        r"/*": {
            "origins": "*"
        }
    }
)
load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)



app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///finpilot.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

with app.app_context():

    db.create_all()

    existing_user = User.query.filter_by(
        email="admin@finpilot.com"
    ).first()

    if not existing_user:

        user = User(
            name="Shriyansh",
            email="admin@finpilot.com",
            password="123456"
        )

        db.session.add(user)
        db.session.commit()

    existing_expense = Expense.query.first()

    if not existing_expense:

        expense1 = Expense(
            amount=250,
            category="Food",
            description="Burger",
            date="2026-06-04",
            user_id=1        )

        expense2 = Expense(
            amount=1200,
            category="Shopping",
            description="T-Shirt",
            date="2026-06-04",
            user_id=1
        )

        db.session.add(expense1)
        db.session.add(expense2)

        db.session.commit()

    existing_budget = Budget.query.first()

    if not existing_budget:

        budget = Budget(
        amount=5000,
        user_id=1
        )

        db.session.add(budget)
        db.session.commit()


@app.route("/")
def home():

    users = User.query.all()

    return {
        "total_users": len(users),
        "users": [
            {
                "id": user.id,
                "name": user.name,
                "email": user.email
            }
            for user in users
        ]
    }

@app.route("/expenses/<int:user_id>")
def get_expenses(user_id):

    expenses = Expense.query.filter_by(
        user_id=user_id
    ).all()

    return [
        {
            "id": expense.id,
            "amount": expense.amount,
            "category": expense.category,
            "description": expense.description,
            "date": expense.date,
            "user_id": expense.user_id
        }
        for expense in expenses
    ]


@app.route("/expenses", methods=["POST"])
def add_expense():

    data = request.get_json()

    expense = Expense(
    amount=data["amount"],
    category=data["category"],
    description=data["description"],
    date=data["date"],
    user_id=data["user_id"]
    )

    db.session.add(expense)
    db.session.commit()

    return {
        "message": "Expense added successfully"
    }, 201


@app.route("/expenses/<int:id>", methods=["PUT"])
def update_expense(id):

    expense = Expense.query.get(id)

    if not expense:
        return {
            "message": "Expense not found"
        }, 404

    data = request.get_json()

    expense.amount = data["amount"]
    expense.category = data["category"]
    expense.description = data["description"]
    expense.date = data["date"]

    db.session.commit()

    return {
        "message": "Expense updated successfully"
    }


@app.route("/expenses/<int:id>", methods=["DELETE"])
def delete_expense(id):

    expense = Expense.query.get(id)

    if not expense:
        return {
            "message": "Expense not found"
        }, 404

    db.session.delete(expense)
    db.session.commit()

    return {
        "message": "Expense deleted successfully"
    }
@app.route("/budget/<int:user_id>")
def get_budget(user_id):

    budget = Budget.query.filter_by(
        user_id=user_id
    ).first()

    if not budget:
        return {
            "amount": 0
        }

    return {
        "amount": budget.amount
    }


@app.route("/budget", methods=["PUT"])
def update_budget():

    data = request.get_json()

    budget = Budget.query.filter_by(
        user_id=data["user_id"]
    ).first()

    if not budget:

        budget = Budget(
            amount=data["amount"],
            user_id=data["user_id"]
        )

        db.session.add(budget)

    else:

        budget.amount = data["amount"]

    db.session.commit()

    return {
        "message": "Budget updated successfully"
    }
@app.route(
    "/register",
    methods=["POST"]
)
def register():

    data = request.get_json()

    existing_user = User.query.filter_by(
        email=data["email"]
    ).first()

    if existing_user:
        return {
            "message":
            "Email already exists"
        }, 400

    user = User(
        name=data["name"],
        email=data["email"],
        password=data["password"]
    )

    db.session.add(user)
    db.session.commit()

    return {
        "message":
        "Registration successful" 
    }
@app.route(
    "/login",
    methods=["POST"]
)
def login():

    data = request.get_json()

    user = User.query.filter_by(
        email=data["email"]
    ).first()

    if (
        not user or
        user.password != data["password"]
    ):
        return {
            "message":
            "Invalid credentials"
        }, 401

    return {
    "message": "Login successful",
    "user": {
        "id": user.id,
        "name": user.name,
        "email": user.email
    }
}
@app.route("/download-report/<int:user_id>")
def download_report(user_id):

    user = User.query.get(user_id)

    expenses = Expense.query.filter_by(
        user_id=user_id
    ).all()

    budget = Budget.query.filter_by(
        user_id=user_id
    ).first()

    total_expenses = sum(
        expense.amount
        for expense in expenses
    )

    highest_expense = max(
        [expense.amount for expense in expenses],
        default=0
    )

    category_data = {}

    for expense in expenses:

        category_data[
            expense.category
        ] = (
            category_data.get(
                expense.category,
                0
            )
            + expense.amount
        )

    budget_amount = (
        budget.amount
        if budget
        else 0
    )

    budget_percentage = (
        (total_expenses / budget_amount) * 100
        if budget_amount > 0
        else 0
    )

    if budget_percentage >= 100:
        status = "Exceeded"

    elif budget_percentage >= 80:
        status = "Warning"

    else:
        status = "Safe"

    insights = [
        f"Total transactions: {len(expenses)}",
        f"Remaining budget: ₹{budget_amount - total_expenses}"
    ]

    filename = f"report_user_{user_id}.pdf"

    generate_report(
        filename=filename,
        user_name=user.name,
        total_expenses=total_expenses,
        budget=budget_amount,
        highest_expense=highest_expense,
        insights=insights,
        category_data=category_data,
        status=status
    )

    report_record = Report(
        filename=filename,
        generated_on=datetime.now().strftime(
            "%d-%m-%Y %H:%M"
        ),
        user_id=user_id
    )

    db.session.add(report_record)
    db.session.commit()

    return send_file(
        filename,
        as_attachment=True
    )
@app.route(
    "/reports/<int:user_id>"
)
def get_reports(user_id):

    reports = Report.query.filter_by(
        user_id=user_id
    ).order_by(
        Report.id.desc()
    ).all()

    return [
        {
            "id": report.id,
            "filename": report.filename,
            "generated_on": report.generated_on
        }
        for report in reports
    ]
@app.route(
    "/reports/<int:id>",
    methods=["DELETE"]
)
def delete_report(id):

    report = Report.query.get(id)

    if not report:
        return {
            "message":
            "Report not found"
        }, 404

    db.session.delete(report)

    db.session.commit()

    return {
        "message":
        "Report deleted"
    }
@app.route("/ai-advice/<int:user_id>")
def ai_advice(user_id):

    expenses = Expense.query.filter_by(
        user_id=user_id
    ).all()

    budget = Budget.query.filter_by(
        user_id=user_id
    ).first()

    total_expenses = sum(
        expense.amount
        for expense in expenses
    )

    expense_text = "\n".join([
        f"{expense.category}: ₹{expense.amount}"
        for expense in expenses
    ])

    prompt = f"""
    You are a financial advisor.

    Budget:
    ₹{budget.amount if budget else 0}

    Expenses:
    {expense_text}

    Give exactly 4 short recommendations.
    """

    try:

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        return {
            "advice":
            response.choices[0].message.content
        }

    except Exception as e:

        print(e)

        return {
            "advice":
            "Unable to generate AI advice right now."
        }
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)