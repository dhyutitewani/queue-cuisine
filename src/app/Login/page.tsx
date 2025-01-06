import Link from 'next/link'
import Login from "@/components/ui/Login/Login"

export default function Page() {
    return (
        <div className="flex min-h-screen flex-col items-center mt-10">
            <div>
                <h1 className="text-[2.5rem] text-center">Login</h1>
            </div>
            <div className="mt-10">
                <Login />
            </div>
            <Link className='mt-10 text-lg' href="/Signup"> 
                To create an account 
                <span className='text-[#ff6f61] hover:text-[#672222]'> click </span>
                here
            </Link>
        </div>
    )
}   