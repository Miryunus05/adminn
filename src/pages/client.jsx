import axios from 'axios';
import React, { memo, useEffect, useState } from 'react'
import { backendUrl } from '../constantas/backendUrl';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


function Client() {
    const [catigories, setCategoris] = useState([]);
    const navigate = useNavigate()
    
    useAuth();



    useEffect(() =>{
        async function getCategories(){
            try {
                const response = await axios.get(`${backendUrl}/categories`);
                setCategoris(response.data);
            }catch(err){
                console.log("Xatolik yuz berdi", err)
            }
        }
        getCategories();
    }, [navigate]);


    const handleDelete = async (id) =>{
        console.log(id)
        try{
            const response = await axios.delete(`${backendUrl}/categories/${id}`, {
                headers : {
                    'Content-Type': 'application/json',
                    Authorization : localStorage.getItem("token"),
                }
            }
        );
        if(response.data) {
            navigate(0);
        }

        
        }catch (err) {
          console.log("Xatolik yuz berdi", err)  
        }

        
    }


  return <div className='flex gap-5 justify-center mt-[50px]'>
    {
        catigories.map(catigory =>(
            <div className='shadow-lg p-4 hover:shadow-xl '>
                <img src={catigory.image} alt={catigory.name} />
                <h2 className='p-4'>{catigory.name}</h2>
                <button onClick={() => handleDelete(catigory._id)} className=' text-red-400'>Delete</button>
            </div>
        ))
    }
  </div>;
}

export default memo(Client);
