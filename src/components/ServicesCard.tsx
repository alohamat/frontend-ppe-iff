interface ServicoCardProps {
  nome: string;
  url: string;
  size?: "small" | "medium" | "big";
}

export function ServicoCard({ nome, url, size = "medium" }: ServicoCardProps) {
  const sizeClasses: Record<typeof size, string> = {
    small: "h-12",
    medium: "h-32",
    big: "h-42",
  };

  return (
    <button
      onClick={() => window.open(url, "_blank")}
      className={` ${sizeClasses[size]} 
        flex items-center justify-center 
        rounded-2xl border border-white/20
        bg-gradient-to-b from-green-700 to-green-800
        shadow-lg cursor-pointer 
        text-white font-bold text-lg transition-all 
        w-[85%] sm:w-[40%] lg:w-[55%]
        hover:scale-105 hover:shadow-2xl `}
    >
      <p className="text-2xl sm:text-5xl text-black/55">{nome}</p>
    </button>
  );
}
