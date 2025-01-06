import "@/styles/menu.css";
import Link from "next/link";
import Image from 'next/image';

const Page = () => {
    const dishes = [
        { name: 'Chicken Roll', price: 100, image: '/Screenshot 2025-01-05 215351.png' },
        { name: 'Veg Roll', price: 60, image: '/Screenshot 2025-01-05 215359.png' },
        { name: 'Panner Roll', price: 70, image: '/Screenshot 2025-01-05 215419.png' },
        { name: 'Chicken Biryani', price: 120, image: '/Screenshot 2025-01-05 215426.png' },
        { name: 'Chicken Lolipop', price: 120, image: '/Screenshot 2025-01-05 215437.png' },
        { name: 'Chicken Manchurian', price: 120, image: '/Screenshot 2025-01-05 215444.png' },
        { name: 'Shawarama', price: 70, image: '/Screenshot 2025-01-05 215454.png' },
        { name: 'Tandoori Chicken', price: 150, image: '/Screenshot 2025-01-05 215501.png' },
        { name: 'Chilli Chicken', price: 100, image: '/Screenshot 2025-01-05 215512.png' },
    ];

    return (
        <div className="siddhi-page">
			<section className="top-bar flex items-center relative">
				<div className="back-button absolute left-5">
					<Link href="/Menu">
						<span className="back-arrow text-[#ff6f61] text-[2rem]">←</span>
					</Link>
				</div>
				<div className="left-content w-full text-center">
					<h2 className="title">Roll Me</h2>
				</div>
			</section>

            <div className="current-movies">
                {dishes.map((dish, index) => (
                    <div key={index} className="current-movie">
                        <div className="cm-img-box">
                            <Image
                                src={dish.image}
                                alt={dish.name}
                                width={270}
                                height={200}
                                objectFit="cover"
                            />
                        </div>
                        <h3 className="movie-title">{dish.name}</h3>

                        <div className="booking">
                            <h2 className="price">₹{dish.price}</h2>
                            <a href="#" className="btn">Add to cart</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page;
