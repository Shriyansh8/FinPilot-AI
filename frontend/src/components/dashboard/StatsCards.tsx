type Props = {
  title: string;
  value: string | number;
};

export default function StatsCards({
  title,
  value,
}: Props) {
  return (
    <div className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">

      <p className="text-gray-400">
        {title}
      </p>

      <h2 className="text-4xl font-bold mt-4 text-white">
        {value}
      </h2>

    </div>
  );
}