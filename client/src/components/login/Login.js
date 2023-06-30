import {LockClosedIcon} from '@heroicons/react/20/solid'
import logo from '../../images/logo.png'
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

import Footer from './Footer'
import {useEffect, useState} from "react";
import axios from "axios";


export default function Login() {
    const navigate = useNavigate();
    const [account, setAccount] = useState({
        id: "",
        password: "",
    })

    const [isChecked, setIsChecked] = useState(false)

    useEffect(() => {
        if (window.localStorage.getItem('isChecked') === 'true' && window.localStorage.getItem('username') !== "") {
            setAccount({
                id: window.localStorage.getItem('username'),
                password: window.localStorage.getItem('password')
            })
            setIsChecked(true)
        }
    },[])

    const onChangeAccount = e => {
        setAccount({
            ...account,
            [e.target.name]: e.target.value,
        });
    }

    const onChangeRememberMe = e => {
        setIsChecked(!isChecked)
    }

    const handleLogin = (e) => {
        axios.post("/api/login/check", account)
            .then(res => {
                if (res.data.idExists !== true) return alert("아이디와 비밀번호를 확인해주세요")

                window.localStorage.setItem('username', account.id)
                window.localStorage.setItem('password', account.password)
                window.localStorage.setItem('isChecked', `${isChecked}`)

                Cookies.set("id", res.data.id)
                Cookies.set("role", res.data.role)
                Cookies.set("name", res.data.name)
                Cookies.set("facility", res.data.facility)
                navigate("/Main");
            })
            .catch(err => alert("아이디와 비밀번호를 확인해주세요"))
        e.preventDefault()
    };

    return (
        <>
            <div className="flex h-screen justify-content-center">
                <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md space-y-8">
                        <div>
                            <img
                                className="mx-auto h-12 w-auto"
                                src={logo}
                                alt="Secret Code"
                            />
                            <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
                                로그인 후 이용하실 수 있습니다.
                            </h2>
                            <p className="mt-2 text-center text-sm text-gray-600">
                            </p>
                        </div>
                        <form className="mt-8 space-y-6" action="#" method="POST">
                            <input type="hidden" name="remember" defaultValue="true"/>
                            <div className="-space-y-px rounded-md shadow-sm">
                                <div>
                                    <label htmlFor="id" className="sr-only">
                                        ID
                                    </label>
                                    <input
                                        id="id"
                                        name="id"
                                        type="text"
                                        autoComplete="id"
                                        required
                                        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        placeholder="ID"
                                        onChange={onChangeAccount}
                                        value={account.id}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="sr-only">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Password"
                                        onChange={onChangeAccount}
                                        value={account.password}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        checked={isChecked}
                                        style = {{border : '1px solid darkgrey'}}
                                        onChange={e => onChangeRememberMe(e)}
                                        className="h-4 w-4 rememberMe rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label htmlFor="remember-me" className=" ml-2 block text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                            </div>

                            <div>
                                <button
                                    type="submit"
                                    onClick={handleLogin}
                                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-stone-900 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true"/>
                </span>
                                    Sign in
                                </button>
                            </div>
                        </form>
                        <Footer/>
                    </div>
                </div>
            </div>


        </>

    )
}
