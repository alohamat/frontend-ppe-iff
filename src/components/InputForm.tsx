import type { InputHTMLAttributes } from "react";
type Props = InputHTMLAttributes<HTMLInputElement>

function InputForm(props: Props) {
    return (
        <input {...props}
        className=""
        />
    )
}

export default InputForm;