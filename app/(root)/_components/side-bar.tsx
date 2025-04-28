"use client"

import Link from "next/link";
import { FcGlobe } from "react-icons/fc";

const Sidebar = () => {
    const refreash =(url: string)=>{
        window.location.href = url
    }
    return (  
        <div className="shadow-md h-full w-[16rem] sticky pt-2">
            <div >
            <Link onClick={()=>refreash("/")} href={"/"} className="w-full  shadow-sm cursor-pointer  flex space-x-3 items-center justify-center p-3"> <FcGlobe className="size-8 " /> <h1 className="text-black">Lets<span className="font-bold">TOUR</span></h1> </Link>

            </div>
            </div>
    );
}
 
export default Sidebar;