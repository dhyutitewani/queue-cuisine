import Link from 'next/link';

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-slate-100 px-8 pt-0 text-black">
            {/* Header Section */}
            <header className="text-center mb-12">
                <h1 className="text-5xl font-extrabold tracking-tight mb-4">Queue & Cuisine</h1>
                <p className="text-xl font-light max-w-3xl mx-auto">
                    Your one-stop solution for on-campus eats. Order from your favorite restaurants, delivered fast and fresh, or ready for pickup!
                </p>
            </header>

            {/* Intro Text */}
            <section className="text-center mb-12">
                <p className="text-lg max-w-2xl mx-auto">
                    Hungry between classes? Craving a late-night snack? We’ve got you covered! Explore a wide variety of options from all your favorite eateries on campus—delivered fresh and fast, or ready for pickup.
                </p>
            </section>

            {/* Why Choose Us Section */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
                <div className="flex items-center justify-center bg-white bg-opacity-20 p-6 rounded-xl shadow-lg transform hover:scale-105 transition duration-300">
                    <div className="text-center">
                        <h3 className="text-2xl font-semibold mb-4">Convenience</h3>
                        <p className="text-lg">Skip the line! Order from anywhere on campus and save precious time.</p>
                    </div>
                </div>
                <div className="flex items-center justify-center bg-white bg-opacity-20 p-6 rounded-xl shadow-lg transform hover:scale-105 transition duration-300">
                    <div className="text-center">
                        <h3 className="text-2xl font-semibold mb-4">Variety</h3>
                        <p className="text-lg">From comfort food to healthy bites, we've got it all.</p>
                    </div>
                </div>
                <div className="flex items-center justify-center bg-white bg-opacity-20 p-6 rounded-xl shadow-lg transform hover:scale-105 transition duration-300">
                    <div className="text-center">
                        <h3 className="text-2xl font-semibold mb-4">Exclusive Deals</h3>
                        <p className="text-lg">Get access to student-only discounts and combo offers.</p>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="bg-white bg-opacity-10 p-8 rounded-xl mb-12 text-center">
                <h3 className="text-3xl font-semibold mb-8">How It Works</h3>
                <ol className="space-y-6 text-lg text-gray-700">
                    <li><strong className="font-semibold">Browse Menus:</strong> Explore dishes from all the best campus restaurants.</li>
                    <li><strong className="font-semibold">Customize Your Order:</strong> Add your favorite toppings, sides, and drinks.</li>
                    <li><strong className="font-semibold">Choose Delivery or Pickup:</strong> Get it brought to your dorm, or grab it on the go.</li>
                    <li><strong className="font-semibold">Enjoy:</strong> Savor your meal and keep your focus on what matters—university life!</li>
                </ol>
            </section>

            {/* Popular Restaurants Section */}
            <section className="bg-gradient-to-r from-white-500 to-grey-200 p-8 rounded-xl mb-12">
                <h3 className="text-3xl font-semibold text-black mb-8">Popular Restaurants on Campus</h3>
                <ul className="space-y-4 text-lg text-black">
                    <li><strong>🌯 Roll Me</strong> – Juicy chicken rolls.</li>
                    <li><strong>🥗 Siddhi Vinayak</strong> – Healthy veg meals.</li>
                    <li><strong>🍰 Crave</strong> – Sweet treats to fuel your study sessions.</li>
                    <li><strong>🧃 Joos</strong> – A stop for fruit juice to keep up the stamina.</li>
                </ul>
            </section>

            {/* Student Reviews Section */}
            <section className="bg-white bg-opacity-10 p-8 rounded-xl mb-12 text-center">
                <h3 className="text-3xl font-semibold text-gray-800 mb-8">Student Reviews</h3>
                <div className="space-y-6 text-lg text-gray-700">
                    <blockquote className="italic">"So convenient! Ordering to avoid the lunch crowd has never been easier." – Vaishnavi, Senior</blockquote>
                    <blockquote className="italic">"So many options to choose from!" – Darsh, Sophomore</blockquote>
                </div>
            </section>

            {/* Menu Button */}
            <div className="text-center mb-12">
                <Link
                    href="/Menu"
                    className="border-2 border-[#ff6f61] text-black text-xl font-semibold py-4 px-8 rounded-xl transform transition duration-300 ease-in-out hover:border-[#ff6f61] hover:bg-[#ff6f61] hover:text-white hover:scale-105 hover:shadow-xl"
                    >
                    Explore the Menu
                </Link>
            </div>
        </div>
    );
}
