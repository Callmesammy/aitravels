import { SheetBar } from "./_components/SheetBar";
import Sidebar from "./_components/side-bar";


interface mainProps {
  children: React.ReactNode;
}
const DashLaout =  ({ children }: mainProps) => {
  
  return (
    <div className="flex w-full h-full space-x-2 fixed">
           <Sidebar />      

      <section className=" w-full flex flex-col pt-3">
      <SheetBar/>

      <main className="flex  w-full h-full "> {children}</main>   
      </section>

    </div>
  );
};

export default DashLaout;
