import Menu from '@/components/ui/Menu/Menu';

export default function Page() {
    return (
        <main className="bg-slate-100 mt-10 ml-10">
            <div>
                <h1 className="text-[2.5rem] text-center">Restaurants</h1>
            </div>
            <div className="mt-10">
                <Menu />
            </div>
        </main>
    )
}