import { useNavigate } from "react-router-dom";

type ImgProps = {
  src: string;
  alt: string;
  link?: string; // abre ao clicar na img
  funcao?: () => void; // executa ao clicar na img
  size?: "small" | "medium" | "big"; // restringe pros três valores
  blank?: boolean; // se abre link em nova pagina
  internal?: boolean; // se o link é interno
};

function Img({
  src,
  alt,
  link,
  blank,
  internal,
  funcao,
  size = "medium",
}: ImgProps) {
  const navigate = useNavigate();

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
        if (!link && !funcao) return;
        if (funcao) funcao();

        if (internal && link) {
          navigate(link);
        } else if (link && blank) {
          window.open(link, "_blank");
        } else if (link) {
          window.open(link);
        }
      }}
    />
  );
}

export default Img;
