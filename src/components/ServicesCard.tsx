interface ServicoCardProps {
  nome: string;
  url: string;
  gradient?: string;
  size?: "small" | "medium" | "big";
}

export function ServicoCard({
  nome,
  url,
  gradient,
  size = "medium",
}: ServicoCardProps) {
  const sizeClasses: Record<typeof size, string> = {
    small: "h-12",
    medium: "h-32",
    big: "h-42",
  };
  return (
    <button
      onClick={() => window.open(url, "_blank")}
      className={` ${
        sizeClasses[size]
      } flex items-center justify-center rounded-2xl shadow-lg cursor-pointer text-white font-bold text-lg transition-all w-[85%] sm:w-[40%] lg:w-[35%]
        hover:scale-105 hover:shadow-xl ${
          gradient || "bg-gradient-to-br from-blue-500 to-blue-700"
        }`}
    >
      <p className="text-5xl">{nome}</p>
    </button>
  );
}
