import { createClient } from "@/utils/supabase/server";
import Sidebar from "./_components/side-bar";
import { redirect } from "next/navigation";

interface mainProps {
  children: React.ReactNode;
}
const DashLaout = async ({ children }: mainProps) => {
    const supabase = await createClient()
    const  {data: {user} }= await supabase.auth.getUser() 
    if(!user){
        redirect("/login")
    }
  return (
    <div className="flex w-full h-full space-x-2">
      <Sidebar name={user} />      
      <main className="flex  w-full h-full">{children}</main>
    </div>
  );
};

export default DashLaout;
