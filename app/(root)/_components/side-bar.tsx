"use client";

import Link from "next/link";
import { FcGlobe } from "react-icons/fc";
import { MdDashboardCustomize } from "react-icons/md";
import { CiMap } from "react-icons/ci";
import { LuUsersRound } from "react-icons/lu";
import {  usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";

//add sidebar items

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

const Sidebar =  () => {
    const router = useRouter()
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

  const logout = async ()=>{
    const supabase = await createClient()
    await supabase.auth.signOut()
   router.push("/login")
  }
  
  return (
    <div className="shadow-md h-full w-[16rem]  pt-2  sticky">
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
        <Dialog  >
            <DialogTrigger asChild>
         <div className="h-full cursor-pointer gap-1 mt-auto hover:scale-95 flex -bottom-[20rem] px-2 text-sm items-center absolute font-semibold">
       {imagee && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imagee} alt="image" className="w-8 h-8 flex rounded-full"/>
        )}
     <LogOut className="text-red-800"/>
      </div> 
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Logout</DialogTitle>
          <DialogDescription>
            Are you sure you want to logout?
          </DialogDescription>
        </DialogHeader>
        
            <div className="justify-end flex items-end w-full">
          <Button onClick={logout} variant="destructive" className="cursor-pointer">Logout</Button>

            </div>
      </DialogContent>
        </Dialog>
     
      
    </div>
  );
};                  

export default Sidebar;
