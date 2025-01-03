import React from "react";
import {useState} from "react";
import {Auth} from "../../services/AuthService.ts";
import {useNavigate} from "react-router";
import {emailPattern, passwordPattern} from "../../constants/RegexPatterns.ts";

// TODO: When user navigates to sign_up (when they are already signed up), auto navigate them to root (not now)
export default function SignUp() {
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();

    async function signIn(event: React.FormEvent) {
        setDisabled(true);
        event.preventDefault();

        await Auth.signUp(event.target as HTMLFormElement)
            .then((resp) => {
                localStorage.setItem("ign", resp.data.in_game_name);
                navigate('/');
            })
            .catch(e => {
                // TODO: display an error message toaster for this
                console.error(e.message)
            })
            .finally(() => setDisabled(false));
    }

    function onPasswordInput(event) {
        const field = event.target;
        const value = field.value;

        if (value.length < 8) {
            field.setCustomValidity("Password must be at least 8 characters");
        } else if (!passwordPattern.test(value)) {
            field.setCustomValidity('Invalid password');
        } else {
            field.setCustomValidity('');
        }

    }

    function onEmailInput(event) {
        const field = event.target;
        const value = field.value;

        if (!emailPattern.test(value)) {
            field.setCustomValidity('Invalid email format');
        } else {
            field.setCustomValidity('');
        }
    }

    return (
        <div className="flex h-full justify-center items-center flex-col">
            <div className="w-[300px] rounded-2xl p-4 bg-[rgb(245,245,245)] shadow-[2px_2px_10px_rgba(0,0,0,0.40)]">
                <div className="mb-5 text-center text-3xl">
                    <label>Sign Up</label>
                </div>

                <div className="flex">
                    <form onSubmit={signIn}>
                        <input className="form-input" type='text' name='name'
                               placeholder='Name' required/>

                        <input className="form-input" type='text' name='in_game_name'
                               placeholder='In Game Name' required/>

                        <input className="form-input" type='text' name='email'
                               placeholder='Email'
                               onInput={onEmailInput}
                               required/>

                        <input className="form-input" type='password' name='password'
                               placeholder='Password'
                               onInput={onPasswordInput}
                               required/>
                        <label htmlFor='password'>
                            <small className='italic text-xs'>
                                Password must be
                                <ul className='list-disc list-inside indent-4'>
                                    <li>At least 8 characters long</li>
                                    <li>Contains an uppercase character</li>
                                    <li>Contains a lowercase character</li>
                                    <li>Contains a number</li>
                                    <li>Contains a symbol</li>
                                </ul>
                            </small>
                        </label>

                        <div className="flex justify-center mt-5">
                            <button
                                className="form-button bg-[rgb(54,217,0)]"
                                type="submit"
                                disabled={disabled}>Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}