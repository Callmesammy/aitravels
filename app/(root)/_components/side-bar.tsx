"use client"

import Link from "next/link";
import { FcGlobe } from "react-icons/fc";
import { MdDashboardCustomize } from "react-icons/md";
import { CiMap } from "react-icons/ci";
import { LuUsersRound } from "react-icons/lu";
import { usePathname } from "next/navigation";
import { url } from "inspector";
import { cn } from "@/lib/utils";

//add sidebar items 

const additems=[
    {   id: 1,
        name: "dashboard", 
        icon: <MdDashboardCustomize />, 
        url: "/"

    },
    {   id: 2,
        name: "all users", 
        icon: <LuUsersRound />, 
        url: "/users"

    },
    {
        id: 3,
        name: "Ai trips", 
        icon: <CiMap />, 
        url: "/trips"

    },
]

const Sidebar = () => {
    const pathname = usePathname()
    const refreash =(url: string)=>{
        window.location.href = url
    }
    return (  
        <div className="shadow-md h-full w-[16rem] sticky pt-2">
            <div >
            <Link onClick={()=>refreash("/")} href={"/"} className="w-full  shadow-sm cursor-pointer  flex space-x-3 items-center justify-center p-3"> <FcGlobe className="size-8 " /> <h1 className="text-black">Lets<span className="font-bold">TOUR</span></h1> </Link>
                <div className="pt-4 px-2 ">
                    {additems.map((dc)=>{
                        const isActive= pathname == dc.url || pathname.startsWith(`${dc.url}/`)
                        return(
                            <Link href={dc.url} key={dc.id} className={cn("flex px-3 gap-2 space-x-3 p-2  w-[11rem] hover:bg-muted-foreground/15 rounded capitalize text-sm ", isActive && "bg-blue-800 hover:bg-blue-800 rounded text-white font-semibold w-[11rem]")}>
                             <div>{dc.icon}</div>       {dc.name}
                            </Link>
                        )
                    })}
                </div>
            </div>
            </div>
    );
}
 
export default Sidebar;