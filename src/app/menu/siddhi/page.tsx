'use client';

import React from "react";
import "@/styles/menu.css";
import Link from "next/link";
	
const Page = () => {
	const items = [
		{ title: "Dosa", price: "₹60", imgSrc: "/Screenshot 2025-01-05 215209.png" },
		{ title: "Idli Dip", price: "₹40", imgSrc: "/Screenshot 2025-01-05 215224.png" },
		{ title: "Fried Rice Combo", price: "₹125", imgSrc: "/Screenshot 2025-01-05 215238.png" },
		{ title: "Vada", price: "₹20", imgSrc: "/Screenshot 2025-01-05 215246.png" },
		{ title: "Gobi Manchurian", price: "₹100", imgSrc: "/Screenshot 2025-01-05 215259.png" },
		{ title: "Pulao", price: "₹60", imgSrc: "/Screenshot 2025-01-05 215309.png" },
		{ title: "Gulab Jamun", price: "₹20", imgSrc: "/Screenshot 2025-01-05 215320.png" },
		{ title: "Parota Curry", price: "₹60", imgSrc: "/Screenshot 2025-01-05 215328.png" },
		{ title: "Full Meals", price: "₹70", imgSrc: "/Screenshot 2025-01-05 215340.png" },
	];

	const handleAddToCart = async (item: { title: string; price: string }) => {
		try {
			const response = await fetch("/api/cart-func/add-to-cart", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...item, restaurant: "Siddhi Vinayak" }),
			});

			if (response.ok) {
				alert(`${item.title} added to cart!`);
			} else {
				alert("Failed to add item.");
			}
		} catch (err) {
			console.error(err);
			alert("Something went wrong.");
		}
	};

	return (
		<div className="siddhi-page">
			<section className="top-bar flex items-center relative">
				<div className="back-button absolute left-5">
					<Link href="/menu">
						<span className="back-arrow text-[#ff6f61] text-[2rem]">←</span>
					</Link>
				</div>
				<div className="left-content w-full text-center">
					<h2 className="title">Siddhi Vinayak</h2>
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
							<button className="btn" onClick={() => handleAddToCart(item)}>
								Add to cart
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Page;
