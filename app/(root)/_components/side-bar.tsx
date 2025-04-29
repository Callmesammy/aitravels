"use client";

import Link from "next/link";
import { FcGlobe } from "react-icons/fc";
import { MdDashboardCustomize } from "react-icons/md";
import { CiMap } from "react-icons/ci";
import { LuUsersRound } from "react-icons/lu";
import {  usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

//add sidebar items
interface theuser{
name: User
}
const additems = [
  { id: 1, name: "dashboard", icon: <MdDashboardCustomize />, url: "/" },
  { id: 2, name: "all users", icon: <LuUsersRound />, url: "/users" },
  {
    id: 3,
    name: "Ai trips",
    icon: <CiMap />,
    url: "/trips",
  },
];

const Sidebar =  ({
    name
}: theuser) => {
    const [imagee, setImage] = useState("")
    useEffect(()=>{
        maindata()
    },[])
    const maindata = async()=>{
         const supabase = await createClient()
    
 const {data: {user}} = await  supabase.auth.getUser()
        if(user?.user_metadata.picture){
            setImage(user.user_metadata.picture)
        }
    }
   
    const pathname = usePathname()
  const refreash = (url: string) => {
    window.location.href = url;
  };
  return (
    <div className="shadow-md h-full w-[16rem]  pt-2 relative ">
      <div>
        <Link
          onClick={() => refreash("/")}
          href={"/"}
          className="w-full  shadow-sm cursor-pointer  flex space-x-3 items-center justify-center p-3"
        >
          {" "}
          <FcGlobe className="size-8 " />{" "}
          <h1 className="text-black">
            Lets<span className="font-bold">TOUR</span>
          </h1>{" "}
        </Link>
        <div className="pt-4 px-2 ">
          {additems.map((dc) => {
            const isActive =
              pathname == dc.url || pathname.startsWith(`${dc.url}/`);
            return (
              <Link
                href={dc.url}
                key={dc.id}
                className={cn(
                  "flex px-3 gap-2 space-x-3 p-2  w-[11rem] hover:bg-muted-foreground/15 rounded capitalize text-sm items-center",
                  isActive &&
                    "bg-blue-800 hover:bg-blue-800 rounded text-white font-semibold w-[11rem]"
                )}
              >
                <div>{dc.icon} </div> {dc.name}
              </Link>
            );
          })}
        </div>
      </div>
    
      <div className="h-full cursor-pointer gap-1 mt-auto flex -bottom-[20rem] px-2 text-sm items-center absolute font-semibold">
       {imagee && (
        <img src={imagee} alt="image" className="w-8 h-8 flex rounded-full"/>
        )}
       {name.email?.length === 10 ? (
        name.email
       ):(
        <>{name.email?.slice(0, 10)}....</>
)}
      </div>
      
    </div>
  );
};                  

export default Sidebar;
