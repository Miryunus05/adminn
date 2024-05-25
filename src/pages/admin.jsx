import React from 'react'
import { useState } from 'react';
import { backendUrl } from '../constantas/backendUrl';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useMobile } from '../hooks/useMobile';

function Admin() {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
     
    const navigate = useNavigate()

    useAuth();
    const isMobile = useMobile();


    const handleSubmit = async () => {
        if (!image || !name) {
            alert("Maydomlani barchasini to'ldring")
        }
       try {
        const headers = {
            'Content-Type': 'application/json',
            Authorization : localStorage.getItem("token"),
        };
        const data = {
            name: name,
            image: image,
        };
        const response = await axios.post(`${backendUrl}/categories`, data, {
            headers: headers,
        });
        if (response.data) {
            navigate("/")
        }
       }catch (error){
        console.log("xatolik yuz berdi", error);
       }


    };


    return (
        <div className='h-screen w-screen bg-gray-200 flex justify-center items-center'>
            <div className=' p-4 shadow-xl bg-white'>
                <h1 className=' text-center text-xl'>Create Category </h1>
                <h2>{isMobile ? "From Mobile device" : "From desctop"}</h2>

                <div className='mb-5'>
                    <label htmlFor="">Category Name :</label>
                    <br />
                    <input
                        type="text"
                        className='bg-gray-200 p-2'
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='mb-5'>
                    <label htmlFor="">Image address :</label>
                    <br />
                    <input
                        type="text"
                        className='bg-gray-200 p-2'
                        onChange={(e) => setImage(e.target.value)} />
                </div>
                <div className='p-5'>
                    <button
                        onClick={handleSubmit}
                        className=' bg-blue-500 text-white px-4 py-2'
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default memo(Admin);
