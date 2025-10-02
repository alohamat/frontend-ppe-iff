// componente pra evitar a repetição de classname
type ImgProps = {
    src: string;
    alt: string;
    link: string;
};

function Img({src, alt, link}: ImgProps) {
    return (
        <img src={src} alt={alt} className="w-fit max-w-xs lg:max-w-full h-32 lg:h-50 object-contain rounded-xl shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer"
        onClick={() => {window.open(link, "_blank")}}
        />
    )
}

export default Img;