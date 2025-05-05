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
    bestTimeToVisit: string, //nt
      name: string, 
      description: string, 
      estimatedPrice: string, 
      duration: number, 

      itinerary: {[key: string]: string,}

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

    <div className="px-2 py-2 flex  w-ful h-full  flex-col  mb-2 overflow-auto">
      <h1 className="text-md font-semibold">Tasks</h1>
      <p className="text-sm text-muted-foreground">View and edit Ai-generated travel Plans</p>
      <div className="md:w-full md:h-full pt-5  flex  items-center overflow-auto  mb-3">
        {listings?.map((fl)=>(
          <div key={fl.id} className=" w-full px-3 flex flex-col h-full items-center justify-center ">
             <h1 className="font-bold text-lg">{fl.taskDetails.name}  </h1>            
            <div className=" text-sm text-center w-ful mt-3  text-muted-foreground justify-center pt-3 flex items-center ">
           <span className="flex items-center gap-2 w-42 ">  <FaRegCalendarAlt/> {fl.taskDetails.duration} day plan</span>  
           <span className="flex tems-center gap-2 w-full">  <FiMapPin /> {fl.taskDetails.location.city} </span>  

            </div>
            <div className="w-[] h-[30rem] gap-2  flex ">
            <Carousel className="w-sm md:w-xl items-center flex justify-center">
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
          <ul className=" flex gap-2 p-4 items-start "> 
            <li className="capitalize bg-gray-300 text-sm items-center rounded text-center">{fl.taskDetails.budget }</li>
            <li className="capitalize bg-sky-300 text-sm items-center rounded text-center">{fl.taskDetails.country }</li>
            <li className="capitalize bg-orange-300 text-sm items-center rounded text-center">{fl.taskDetails.group }</li>
            <li className="capitalize bg-green-300 text-sm items-center rounded text-center">{fl.taskDetails.interest }</li>
            <li className="capitalize bg-purple-300 text-sm items-center rounded text-center">{fl.taskDetails.travel}</li>


          </ul>
          <div className="flex flex-col w-full  pt-3 justify-center ">
            <span className="items-start w-full ">{fl.taskDetails.duration} Day {fl.taskDetails.location.city}</span>
            <span className="text-muted-foreground ] "> {fl.taskDetails.estimatedPrice}</span>
         
            <div className="flex flex-col w-full items-center pt-3 h-full">
            <p className="text-md text-pretty "> {fl.taskDetails.description}</p>


          </div>
          <p>{Object.entries(fl.taskDetails.itinerary).map(([day, dl])=>(
            <div key={day}>
              <strong>{day}</strong>: {dl}

            </div>
          ))}</p>
          </div>
          
          </div>
          
        ))}
      </div>
    </div>
   );
}
 
export default Taski;