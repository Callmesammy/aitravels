"use client"

import { Button } from "@/components/ui/button"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FcGlobe } from "react-icons/fc"
import { GoSidebarExpand } from "react-icons/go";
import { MdDashboardCustomize } from "react-icons/md"
import { LuUsersRound } from "react-icons/lu"
import { CiMap } from "react-icons/ci"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"
import { useState } from "react"


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
export function SheetBar() {
    const [onClose, setOnClose] = useState(false)
    const pathname = usePathname()

    const refreash = (url: string) => {
        window.location.href = url;
      };
    
  return (
    <div className="lg:hidden flex justify-between w-full px-3 bg-white items-center shadow">
 <Link
          onClick={() => refreash("/")}
          href={"/"}
          className="w-   cursor-pointer  flex space-x-3 items-center justify-center p-3"
        >
          {" "}
          <FcGlobe className="size-8 " />{" "}
          <h1 className="text-black">
            Lets<span className="font-bold">TOUR</span>
          </h1>{" "}
        </Link>

    <Sheet open={onClose} onOpenChange={setOnClose}>
      <SheetTrigger asChild>
        <Button variant="outline" className="cursor-pointer"><GoSidebarExpand />        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle> </SheetTitle>
          <SheetDescription className="pt-6 justify-center w-full">
          </SheetDescription>
        </SheetHeader>
        <div className="pt-4 px-2 space-y-3 justify-center ">
          {additems.map((dc) => {
            const isActive = pathname == dc.url || pathname.startsWith(`${dc.url}/`);
            return (
                
              <Link
                href={dc.url}
                key={dc.id}
                onClick={()=> setOnClose(false)}
                className={cn(
                  "flex px-3 gap-2 space-x-3 p-2  w-full hover:bg-muted-foreground/15 rounded capitalize text-sm items-center",
                  isActive &&
                    "bg-blue-800 hover:bg-blue-800 w-full rounded text-white font-semibold "
                )}
              >
                <div>{dc.icon} </div> {dc.name}
              </Link>
            );
          })}
        </div>
        <SheetFooter className="w-full">
          <SheetClose asChild>
          <Link href={"/trips"}>  <Button variant="link" className=" bg-sky-800 text-white cursor-pointer w-full"><Plus/> Create a trip</Button> </Link> 

          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
    </div>
  )
}
