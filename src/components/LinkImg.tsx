type ImgProps = {
  src: string;
  alt: string;
  link?: string;
  funcao?: () => void;
  size?: "small" | "medium" | "big"; // restringe pros três valores
  blank?: boolean;
};

function Img({ src, alt, link, blank, funcao, size = "medium" }: ImgProps) {
  const sizeClasses: Record<typeof size, string> = {
    small: "h-12",
    medium: "h-32",
    big: "h-42",
  };

  return (
    <img
      src={src}
      alt={alt}
      className={`
        w-fit max-w-xs lg:max-w-full
        ${sizeClasses[size]}
        object-contain rounded-xl shadow-lg 
        hover:shadow-2xl transition duration-300 cursor-pointer
      `}
      onClick={() => {
        if (funcao) funcao();
        if ((link) && blank) window.open(link, "_blank"); else if (link) window.open(link);
      }}
    />
  );
}

export default Img;
