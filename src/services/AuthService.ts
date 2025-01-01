import {V1ApiService} from "./V1ApiService.ts";

class AuthService extends V1ApiService{
    constructor() {
        super();
    }

    async signUp(form: HTMLFormElement) {
        await this.http.get('http://localhost:3005/sanctum/csrf-cookie');

        return this.http.post(`${(this.endpoint)}/sign_up`, form, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true,
                'Access-Control-Allow-Credentials': true
            }
        });
    }

    async login(form: HTMLFormElement) {
        await this.http.get('http://localhost:3005/sanctum/csrf-cookie');

        return this.http.post(`${(this.endpoint)}/login`, form, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true,
                'Access-Control-Allow-Credentials': true
            }
        });
    }
}

export const Auth = new AuthService();