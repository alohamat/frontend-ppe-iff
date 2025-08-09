import InputForm from "./InputForm";

type AuthDivProps = {
    mode: string;
}

function AuthDiv({mode}:AuthDivProps) {
    return (
        <div>
            <InputForm placeholder="Matrícula"/>
            <InputForm placeholder="Senha"/>
            {mode}
        </div>
    )
}

export default AuthDiv;