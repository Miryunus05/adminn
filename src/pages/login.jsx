import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../constantas/backendUrl';
import { memo } from 'react';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${backendUrl}/auth`, {
            email: email,
            password: password
            });
            console.log(response.data)
            if (response.data) {
                localStorage.setItem("token", response.data);
                navigate("/admin");
            }
        }catch (error){
            alert("Foydalanuvchi email yoki parol xato")
            console.log("Xatolik yuz berdi"); 
        }
    }
    // "https://test-ecommerce-gamma.vercel.app/auth"
    return (
        <div className='w-screen h-screen bg-gray-300 flex items-center justify-center'>
            <div className='bg-white p-6 shadow-xl'>
                <div className='mb-5'>
                    <h1 className='text-xl text-center'>Login</h1>
                </div>
                <div className='mb-4 flex flex-row justify-between'>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id='email'
                        className='ml-4 bottom-2 bg-slate-200'
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                    />
                </div>
                <div className='mb-4 flex flex-row justify-between'>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id='password'
                        className='ml-4 bottom-2 bg-slate-200'
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                    />
                </div>
                <div className='mb-4 text-center'>
                    <button
                        onClick={handleSubmit}
                        className='bg-blue-500 text-white px-4 py-2'
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default memo(Login);
