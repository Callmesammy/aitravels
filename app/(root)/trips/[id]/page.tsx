/* eslint-disable @next/next/no-img-element */
"use client"

import { createClient } from "@/utils/supabase/client";
import React from "react";
import { useEffect, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
 
interface taskList{
  imagUrl: string[],
  taskDetails:{
      name: string, 
      description: string, 
      estimatedPrice: string, 
      duration: number, 

      itinerary: string[]

      budget: string,
      country: string,
      group: string,
      interest: string,
      travel: string


    location:{
      city: string,
    }
  }
  id: number,
  user_id: string

}
const Taski = ({params}: {params: {id: number}}) => {
  console.log(params)
  const [listings, setIslisting] = useState<taskList[]>()

  useEffect(()=>{
   
        itemsList();
     
 
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
            imagUrl: 
            typeof doc.imagUrl === "string"
            ? JSON.parse(doc.imagUrl || "[]")
            : doc.imagUrl
      }));
  
      setIslisting(parsedData as taskList[]);
    } else {
      console.log(error);
    }
  };
  return ( 

    <div className="px-2 py-2 flex w-full h-full  flex-col overflow-auto">
      <h1 className="text-md font-semibold">Tasks</h1>
      <p className="text-sm text-muted-foreground">View and edit Ai-generated travel Plans</p>
      <div className="w-full h-full pt-5  flex  items-center">
        {listings?.map((fl)=>(
          <div key={fl.id} className=" w-full px-3 flex flex-col h-full items-center justify-center">
             <h1 className="font-bold text-lg">{fl.taskDetails.name}  </h1>            
            
            <div className=" text-sm text-center w-full  text-muted-foreground justify-center pt-3 flex items-center ">
           <span className="flex items-center gap-2 w-42 ">  <FaRegCalendarAlt/> {fl.taskDetails.duration} day plan</span>  
           <span className="flex tems-center gap-2 ">  <FiMapPin /> {fl.taskDetails.location.city} </span>  

            </div>
            <div className="w-[] h-[30rem] gap-2  flex ">
            <Carousel className="w-xl items-center flex justify-center">
      <CarouselContent>
        {fl.imagUrl.map((doc: string, flx: number)=>(

          <CarouselItem key={doc}>
           <><img key={flx} src={doc} alt="doc" className=" w-full h-[29rem] flex rounded-md shrink-0" /></>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    
          </div>
          <div className=" grid grid-cols-5 w-[40rem] pt-3 gap-3"> 
            <span className="capitalize bg-gray-300 text-sm items-center rounded text-center">{fl.taskDetails.budget }</span>
            <span className="capitalize bg-sky-300 text-sm items-center rounded text-center">{fl.taskDetails.country }</span>
            <span className="capitalize bg-orange-300 text-sm items-center rounded text-center">{fl.taskDetails.group }</span>
            <span className="capitalize bg-green-300 text-sm items-center rounded text-center">{fl.taskDetails.interest }</span>
            <span className="capitalize bg-purple-300 text-sm items-center rounded text-center">{fl.taskDetails.travel}</span>


          </div>
          <div className="flex flex-col w-full  pt-3">
            <span className="items-start w-full pl-[4.4rem]">{fl.taskDetails.duration} Day {fl.taskDetails.location.city}</span>
            <span className="text-muted-foreground pl-[4.4rem] "> {fl.taskDetails.estimatedPrice}</span>
         
            <div className="flex flex-col w-full items-center pt-3">
            <p className="text-sm pl-[4.4rem] "> {fl.taskDetails.description}</p>
          </div>
          <div className="flex flex-col w-full items-center pt-3">


          </div>
          </div>
          </div>
          
        ))}
      </div>
    </div>
   );
}
 
export default Taski;