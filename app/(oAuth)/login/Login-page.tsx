"use client"

import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc";
import { createClient } from "@/utils/supabase/client";
import {  useState } from "react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { FcGlobe } from "react-icons/fc";


const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false)
  

  // 2. Define a submit handler.
 const onSubmit=async()=> {
    setIsLoading(true)
        try{
            const supabase = await createClient()
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
              })
              if(data){
                console.log(data)
            
            }else{
                console.log("something went wrong", error)
            }
        }catch(error){
            console.log(error)
        }

    }
    return ( 
        <div className="w-full h-full flex items-center justify-center  "> 
        <Image src="/back.webp" alt="background" fill className="object-cover z-10 absolute flex "/>
            <div className="w-full h-full flex  bg-white/50 z-30 relative"/>
            <div className="flex flex-col gap-2 absolute z-40 bg-black opacity-100 w-[20rem] h-62 rounded-md items-center justify-center">
           <div className="w-full  flex space-x-3 items-center justify-center"> <FcGlobe className="size-8 " /> <h1 className="text-white">Lets<span className="font-bold">TOUR</span></h1> </div>
            <h2 className="text-white font-bold">Login Dashboard </h2>
            <p className="text-muted-foreground text-sm text-center">Sing in with Google to manage destinations, <br/> itineraries, and user activity with ease</p>

        <Button className="cursor-pointer" disabled={isLoading} onClick={onSubmit}  variant="secondary"><FcGoogle />
        Signin with google {isLoading && <Loader2 className="animate-spin size-5" />}</Button>
   
            </div>
        </div>
     );
}
 
export default LoginPage;