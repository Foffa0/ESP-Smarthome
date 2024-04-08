import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="w-100 h-16 sticky top-0 content-center bg-black px-10 lg:px-80 sm:px-12 border-b-2 border-slate-950 z-50">
            <Link href="/"><Image className="absolute" src="/assets/img/logo.png" width={60} height={60} alt="logo" /></Link>
            <h1 className="h-100 font-bold text-2xl text-slate-100 text-center self-center py-5">Smarthome</h1>
        </nav>
    )
}

export default Navbar;