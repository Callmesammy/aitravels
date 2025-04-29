"use client"
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { Plus } from "lucide-react";
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
    <div className="flex h-full w-full px-2 pt-2 flex-col ">
      <div className="justify-between w-full flex items-start">
      <div className="flex flex-col">
       <h1 className="text-md font-semibold flex items-center gap-1 capitalize">Welcome {use} <MdOutlineWavingHand />
       </h1>
       <p className="text-sm text-muted-foreground">Track activity, trends, and popular destinationsin real time </p>
       </div> 
       <Button variant="outline" className="bg-sky-800 text-white cursor-pointer"><Plus/> Create a trip</Button>
      </div>
      <div className=" mt-3 grid md:grid-cols-2 lg:grid-cols-3 w-full rounded-md h-42  items-start  ">
        {}
     ff
      </div> 
    </div>
  );
}

export default Home;