import Sidebar from "./_components/side-bar";


interface mainProps {
  children: React.ReactNode;
}
const DashLaout =  ({ children }: mainProps) => {
  
  return (
    <div className="flex w-full h-full space-x-2 fixed">
      <Sidebar />      
      <main className="flex  w-full h-full bg-secondary">{children}</main>
    </div>
  );
};

export default DashLaout;
