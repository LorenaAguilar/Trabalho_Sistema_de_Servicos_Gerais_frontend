import { Login } from '../Endpoints.js';
import { Headers } from '../Constantes.js';

export function RealizarLogin(usuario, senha) {
    const data = {
        email: usuario,
        password: senha
    };    

    return axios.post(Login, data, {"content-type": Headers["content-type"]})
        .then(response => {
            console.log(response.data);
            if(response.data.authenticated) {
                localStorage.setItem('tokenUser', response.data.accessToken);
            }
            return response.data;
        }).catch((error) => {
            console.log('LoginService', error);
            throw error;
        });
};

export function EstaLogado() {
    return localStorage.getItem('tokenUser') !== null;
} 

export function Deslogar() {
    localStorage.removeItem('tokenUser');
}

export function getTokenDecodificado () {
    const token = localStorage.getItem('tokenUser');    
    return JSON.parse(window.atob(token.split('.')[1]));
}

export function getToken () {
    return localStorage.getItem('tokenUser');    
}