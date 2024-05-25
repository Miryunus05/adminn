import { useEffect, useState } from "react";

export function useMobile() {
    const [iseMobile , setIseMobile] = useState(false);
    useEffect(() =>{

     const resize =  window.addEventListener("resize", () =>{
            const wiindowWidth = window.innerWidth;
            if(wiindowWidth <= 600){
              setIseMobile(true);
            }else {
                setIseMobile(false)
            }
        })

        return function(){
            window.addEventListener("resize",resize);
        }

    }, []);

    
    return iseMobile
}