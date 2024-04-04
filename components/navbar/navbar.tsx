import Image from "next/image";

const Navbar = () => {
    return (
        <div className="w-100 h-16 content-center bg-white px-10 border-b-2">
            <Image className="absolute" src="/assets/img/logo.jpg" width={60} height={60} alt="logo" />
            <h1 className="h-100 font-bold text-2xl text-black text-center self-center py-5">Smarthome</h1>
        </div>
    )
}

export default Navbar;