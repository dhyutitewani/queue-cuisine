import About from "./About";
import Link from 'next/link';

export default function Dashboard() {
    return (
        <div>
            <h1 className="text-3xl mb-10">Dashbaord</h1>

            <h1 className="mb-10">
                This is the main Dashboard page
            </h1>
            <h3 className="mb-10">
                Here the content including about and footer will be present 
                It will also contain links to the menu

            </h3>
            <Link href="/Menu" type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none
                    font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-10 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 
                    dark:border-gray-700"
            >
                Menu
            </Link>
            <About />
        </div>
    )
}