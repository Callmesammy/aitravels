"use client"

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

interface details {
  id: number,
  taskDetails: {
      name: string,
      estimatedPrice: string,
      duration: number, 
      budget: string

  }
}


const TripDetailsPage = ({ params }: { params: { id: string } }) => {

  const [listing, Setlisting] = useState<details[]>()


  useEffect(()=>{
    itemsList()
  },[])

  const itemsList = async()=>{
    const supabase = await createClient()
    const{data, error} = await supabase.from("upload").select("*")
    if (data) {
      const parsedData = data.map((doc) => ({
        ...doc,
        taskDetails:
          typeof doc.taskDetails === "string"
            ? JSON.parse(doc.taskDetails)
            : doc.taskDetails,
      }));
  
      Setlisting(parsedData as details[]);
    } else {
      console.log(error);
    }

  }

    return <div className="w-full h-full flex pt-3 px-2 "> 
    <div className="w-full h-full flex flex-col ">
      <h1 className="font-semibold ">Trips</h1>
    <p className="text-muted-foreground text-sm">View and edit Ai generated travel plans</p>
    </div>
    <div>
      {listing?.map((doc)=>(
        <div key={doc.id} className="font-bold text-black text-2xl">
          {doc.taskDetails.name}
        </div>
      ))}
    </div>
    </div>;
  };
  
  export default TripDetailsPage;
  