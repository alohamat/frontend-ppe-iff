import axios from "axios";

type RegistroUsuario = {
    matricula: string
    senha: string
    email: string
    nome: string
    sobrenome: string
    podeAlmocar: boolean
};

type LoginUsuario = {
    matricula: string
    senha: string
};


function RegisterService({matricula, senha, email, nome, sobrenome, podeAlmocar}: RegistroUsuario) {
    console.log("register");
    const obj = {matricula, senha, email, nome, sobrenome, podeAlmocar};
    console.log(obj);

}

function LoginService({matricula, senha}: LoginUsuario) {
    const obj = {matricula, senha};
    console.log(obj);
}

export default {RegisterService, LoginService};