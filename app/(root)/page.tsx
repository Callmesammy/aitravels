"use client"
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  useEffect(()=>{
    loginData()
  },[])
  const loginData =async()=>{
    const supabase = await createClient()
    const { data: { user }, } = await supabase.auth.getUser()
          if(!user){
            redirect("/login")
  }}
  return (
    <div className="flex h-full w-full">
     Main Page here 
    </div>
  );
}
