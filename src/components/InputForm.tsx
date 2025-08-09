import type { InputHTMLAttributes } from "react";
type Props = InputHTMLAttributes<HTMLInputElement>

function InputForm({...props}: Props) {
    return (
        <input {...props}
        className="bg-white rounded-2xl w-[25vw] p-2 focus:scale-110 transition-all duration-300 ease-in-out"
        />
    )
}

export default InputForm;