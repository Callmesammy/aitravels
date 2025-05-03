"use client"

import { createClient } from "@/utils/supabase/client";
import React from "react";
import { useEffect, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";

interface taskList{
  taskDetails:{
      name: string, 
      description: string, 
      estimatedPrice: string, 
      duration: number 
    location:{
      city: string,
    }
  }
  id: number,
  user_id: string

}
const Taski = ({params}: {params: {id: string}}) => {
console.log(params)
  const [listings, setIslisting] = useState<taskList[]>()

  useEffect(()=>{
    const runFile = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
  
      if (user) {
        itemsList();
      } else {
        console.error("User not authenticated");
      }
    };
  
    runFile();
 
  },[])

  const itemsList = async () => {
    const supabase = createClient(); // no need for `await` here
    const { data, error } = await supabase.from("upload").select("*").eq("user_id", params.id);
  
    if (data) {
      const parsedData = data.map((doc) => ({
        ...doc,
        taskDetails:
          typeof doc.taskDetails === "string"
            ? JSON.parse(doc.taskDetails)
            : doc.taskDetails,
      }));
  
      setIslisting(parsedData as taskList[]);
    } else {
      console.log(error);
    }
  };
  return ( 

    <div className="px-2 py-2 flex w-full h-full  flex-col">
      <h1 className="text-md font-semibold">Tasks</h1>
      <p className="text-sm text-muted-foreground">View and edit Ai-generated travel Plans</p>
      <div className="w-full h-full pt-5  flex  items-center">
        {listings?.map((fl)=>(
          <div key={fl.id} className=" w-full px-3 flex flex-col h-full justify-center">
             <h1 className="font-bold text-lg">{fl.taskDetails.name}  </h1>            
            
            <div className="w-full text-sm space-x-5 text-muted-foreground pt-3 flex items-center gap-2">
           <span className="flex">  <FaRegCalendarAlt/> {fl.taskDetails.duration} day plan</span>  
           <span className="flex">  <FiMapPin />           {fl.taskDetails.location.city} </span>  

            </div>
          </div>
          
        ))}
      </div>
    </div>
   );
}
 
export default Taski;