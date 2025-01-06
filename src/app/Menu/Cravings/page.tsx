import React from "react";
import "@/styles/menu.css";
import Link from "next/link";

const Page = () => {
	const items = [
		{ title: "Blueberry Cheesecake", price: "₹79", imgSrc: "/Screenshot 2025-01-05 215519.png" },
		{ title: "Kitkat Cake", price: "₹79", imgSrc: "/Screenshot 2025-01-05 215525.png" },
		{ title: "Chocolate Donut", price: "₹50", imgSrc: "/Screenshot 2025-01-05 215533.png" },
		{ title: "New York Cheese Cake", price: "₹79", imgSrc: "/Screenshot 2025-01-05 215539.png" },
		{ title: "Tres Leches", price: "₹85", imgSrc: "/Screenshot 2025-01-05 215548.png" },
		{ title: "DBC", price: "₹120", imgSrc: "/Screenshot 2025-01-05 215555.png" },
		{ title: "Chocolate Cake", price: "₹79", imgSrc: "/Screenshot 2025-01-05 215604.png" },
		{ title: "Creme Brulee", price: "₹60", imgSrc: "/Screenshot 2025-01-05 215612.png" },
		{ title: "Charlotte Cake", price: "₹79", imgSrc: "/Screenshot 2025-01-05 215619.png" },
	];

	return (
		<div className="cravings-page">
			<section className="top-bar flex items-center relative">
				<div className="back-button absolute left-5">
					<Link href="/menu">
						<span className="back-arrow text-[#ff6f61] text-[2rem]">←</span>
					</Link>
				</div>
				<div className="left-content w-full text-center">
					<h2 className="title">Cravings</h2>
				</div>
			</section>
			<div className="current-movies">
				{items.map((item, index) => (
					<div className="current-movie" key={index}>
						<div className="cm-img-box">
							<img src={item.imgSrc} alt={item.title} />
						</div>
						<h3 className="movie-title">{item.title}</h3>
						<div className="booking">
							<h2 className="price">{item.price}</h2>
							<a href="#" className="btn">
								Add to cart
							</a>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Page;
