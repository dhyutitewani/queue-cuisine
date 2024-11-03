import Login from "@/components/ui/Login/Login"

export default function Page() {
    return (
        <div className="flex min-h-screen flex-col items-center mt-10">
            <div>
                <h1 className="text-3xl text-center">Login</h1>
            </div>
            <div className="mt-10">
                <Login />
            </div>
        </div>
    )
}   