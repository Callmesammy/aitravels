import Sidebar from "./_components/side-bar";


interface mainProps{
    children: React.ReactNode
}
const DashLaout = ({
    children
}:mainProps) => {
    return (
        <div className="flex flex-col w-full h-full">
            <Sidebar/>
            <main className="flex w-full h-full">{children}</main>
            </div>
      );
}
 
export default DashLaout;