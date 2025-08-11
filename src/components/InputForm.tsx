import type { InputHTMLAttributes } from "react";
type Props = InputHTMLAttributes<HTMLInputElement>

function InputForm({...props}: Props) {
    return (
        <input {...props}
        className="bg-white rounded-2xl w-[70vw] sm:w-[25vw] p-2 focus:scale-110 transition-all duration-300 ease-in-out focus:shadow-[0px_15px_50px_0px] focus:outline-green-700 hover:cursor-text border-2 border-solid"
        />
    )
}

export default InputForm;