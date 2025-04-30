"use client"
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { ArrowDown, ArrowUp, MapPin, Plus } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineWavingHand } from "react-icons/md";
import { addItems, addtravels } from "./_components";
import Image from "next/image";
import Link from "next/link";

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
    <div className="flex h-full w-full px-2 pt-2 flex-col overflow-auto mb-2 ">
      <div className="justify-between w-full flex items-start">
      <div className="flex flex-col">
       <h1 className="text-md font-semibold flex items-center gap-1 capitalize">Welcome {use} <MdOutlineWavingHand />
       </h1>
       <p className="text-sm text-muted-foreground">Track activity, trends, and popular destinationsin real time </p>
       </div> 
       <Button variant="outline" className="bg-sky-800 text-white cursor-pointer"><Plus/> Create a trip</Button>
      </div>
      <div className=" mt-3 grid md:grid-cols-2 lg:grid-cols-3 w-full lg:h-32 rounded-md h-full  gap-2  items-start  ">
        {addItems.map((item)=>(
          <div key={item.id} className="w-full h-32 rounded  border px-3 pt-3 items-center space-y-2 ">
            <h1 className="text-sm ">{item.title} </h1>
           <div className="flex justify-between"> <h1 className="text-3xl">{item.amount}</h1> {item.id === 2? ( <span className="bg-red-700 items-center text-white justify-center text-xm p-2">Trips</span>):(<span className="bg-green-800 items-center text-white justify-center text-xm p-2">Profit</span>)}</div> 
            <div>{item.percent.length >= 3 ? (<div className="text-green-800 font-semibold flex gap-1 text-sm"><ArrowUp className="size-5"/> {item.percent} <p className="text-muted-foreground">{item.perios}</p>  </div>):(<div className="text-red-800 font-semibold flex text-sm gap-0"> <ArrowDown className="size-5"/> {item.percent}<p className="text-muted-foreground">{item.perios}</p></div>)}</div>
          </div>
        ))}
      </div>
      <div className="pt-5 flex flex-col w-full h-full ">
      <h1 className="text-md font-bold">Trips</h1>
      <div className="grid md:grid-cols-2  lg:grid-cols-4 w-full h-full gap-2">
          {addtravels.map((addT)=>{

            return(
            <Link href={`/trips/${addT.id}`} key={addT.id} className="border hover:scale-105 flex flex-col rounded-md w-full h-[16rem]">
              <div className="w-full h-[10rem] border rounded-t-md relative">
                <Image src={addT.img} alt="image" fill className="object-fill rounded-t-md"/>
                <div className="rounded end-2 mt-2 absolute px-3  bg-white text-black text-center text-sm items-center flex font-semibold">$ {addT.amount}</div>
              </div>
              <div className="px-2 pt-1 font-semibold text-purple-950">{addT.place}</div>
              <span className="text-sm px-2 pt-2 text-muted-foreground flex gap-1 items-center"><MapPin className="size-5"/> {addT.map}</span>
              <span className="text-sm px-2  flex gap-1 items-center">
              <span className="text-sm px-2 bg-green-200 rounded-lg text-center mt-2 text-muted-foreground flex gap-1 items-center">
                {addT.tour}
                </span>
                <span className="text-sm px-2 bg-purple-200 rounded-lg text-center mt-2 text-muted-foreground flex gap-1 items-center">
                {addT.features}
                </span>
               </span>

            </Link>  
            )
          }
            
          )}

      </div>
      </div> 
    </div>
  );
}

export default Home;