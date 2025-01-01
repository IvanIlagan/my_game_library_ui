import axios from "axios";

export class V1ApiService {
    private apiVersion: string = 'v1';
    private domain: string = 'localhost:3005';
    protected endpoint: string = `http://${this.domain}/api/${this.apiVersion}`;
    protected http = axios;

    constructor() {
        this.http.defaults.withCredentials = true;
        this.http.defaults.withXSRFToken = true;
    }
}