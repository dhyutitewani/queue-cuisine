import Link from 'next/link';

export default function Menu() {
    return (
        <main className="p-8 rounded-m">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {/* Restaurant 1 */}
                <div className="bg-white border rounded-lg p-4 w-[21rem] mx-auto">
                    <div className="cm-img-box mb-4">
                        <img src="Screenshot 2025-01-06 183346.png" alt="Cravings" className="w-full h-48 object-cover rounded-lg" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">Cravings</h3>
                    <Link className='text-[#ff6f61] text-lg' href="/Menu/Cravings">
                        Menu
                    </Link>
                </div>

                {/* Restaurant 2 */}
                <div className="bg-white border rounded-lg p-4 w-[21rem] mx-auto">
                    <div className="cm-img-box mb-4">
                        <img src="Screenshot 2025-01-06 183516.png" alt="Siddhi Vinayak" className="w-full h-48 object-cover rounded-lg" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">Siddhi Vinayak</h3>
                    <Link className='text-[#ff6f61] text-lg' href="/Menu/Siddhi">
                        Menu
                    </Link>
                </div>

                {/* Restaurant 3 */}
                <div className="bg-white border rounded-lg p-4 w-[21rem] mx-auto">
                    <div className="cm-img-box mb-4">
                        <img src="Screenshot 2025-01-06 183950.png" alt="Roll Me" className="w-full h-48 object-cover rounded-lg" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">Roll Me</h3>
                    <Link className='text-[#ff6f61] text-lg' href="/Menu/Roll">
                        Menu
                    </Link>
                </div>
            </div>
        </main>
    )
}
