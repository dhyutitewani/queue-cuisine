import Signup from '@/components/ui/Signup/Signup';

export default function Page() {
    return (
        <div className="flex min-h-screen flex-col items-center mt-10">
            <div>
                <h1 className="text-[2.5rem] text-center">Sign up</h1>
            </div>
            <div className="mt-10">
                <Signup />
            </div>
        </div>
    )
}