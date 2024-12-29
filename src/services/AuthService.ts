import axios from "axios";

class AuthService {
    private apiVersion: string = 'v1';
    private domain: string = 'localhost:3005';
    private endpoint: string = `http://${this.domain}/api/${this.apiVersion}`;

    constructor() {
        axios.defaults.withCredentials = true;
        axios.defaults.withXSRFToken = true;
    }

    async signUp(form: HTMLFormElement) {
        await axios.get('http://localhost:3005/sanctum/csrf-cookie');

        return axios.post(`${(this.endpoint)}/sign_up`, form, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true,
                'Access-Control-Allow-Credentials': true
            }
        });
    }

    async login(form: HTMLFormElement) {
        await axios.get('http://localhost:3005/sanctum/csrf-cookie');

        return axios.post(`${(this.endpoint)}/login`, form, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true,
                'Access-Control-Allow-Credentials': true
            }
        });
    }
}

export const Auth = new AuthService();