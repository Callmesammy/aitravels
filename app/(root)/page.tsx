"use client"
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineWavingHand } from "react-icons/md";

const Home = () =>{
const [use, setUse] = useState()
  useEffect(()=>{
    loginData()
  },[])
  const loginData =async()=>{
    const supabase = await createClient()
    const { data: { user }, } = await supabase.auth.getUser()
          if(!user){
            redirect("/login")
           }else{
            setUse(user.user_metadata.full_name)
           }

}
  return (
    <div className="flex h-full w-full px-2 pt-2 flex-col relative">
       <h1 className="text-md font-semibold flex items-center gap-1 capitalize">Welcome {use} <MdOutlineWavingHand />
       </h1> 
     
    </div>
  );
}

export default Home;