import React, {useState} from "react";
import {useNavigate} from "react-router";
import {Auth} from "../services/AuthService.ts";

export default function Login() {
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();

    async function login(event: React.FormEvent) {
        setDisabled(true);
        event.preventDefault();

        await Auth.login(event.target as HTMLFormElement)
            .then(() => navigate('/'))
            .catch(e => {
                // TODO: display an error message toaster for this
                console.error(e.message)
            })
            .finally(() => setDisabled(false));
    }

    return (
        <div className="flex h-full justify-center items-center flex-col">
            <div className="w-[300px] rounded-2xl p-4 bg-[rgb(245,245,245)] shadow-[2px_2px_10px_rgba(0,0,0,0.40)]">
                <div className="mb-5 text-center text-3xl">
                    <label>Login</label>
                </div>

                <div className="flex">
                    <form onSubmit={login}>
                        <input className="form-input" type='text' name='email'
                               placeholder='Email'
                               required/>

                        <input className="form-input" type='password' name='password'
                               placeholder='Password'
                               required/>

                        <div className="flex justify-center mt-5">
                            <button
                                className="form-button bg-[rgb(54,217,0)]"
                                type="submit"
                                disabled={disabled}>Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}