'use client';

import React from "react";
import "@/styles/menu.css";
import Link from "next/link";

const Page = () => {
	const dishes = [
		{ title: 'Chicken Roll', price: '₹100', imgSrc: '/Screenshot 2025-01-05 215351.png' },
		{ title: 'Veg Roll', price: '₹60', imgSrc: '/Screenshot 2025-01-05 215359.png' },
		{ title: 'Panner Roll', price: '₹70', imgSrc: '/Screenshot 2025-01-05 215419.png' },
		{ title: 'Chicken Biryani', price: '₹120', imgSrc: '/Screenshot 2025-01-05 215426.png' },
		{ title: 'Chicken Lolipop', price: '₹120', imgSrc: '/Screenshot 2025-01-05 215437.png' },
		{ title: 'Chicken Manchurian', price: '₹120', imgSrc: '/Screenshot 2025-01-05 215444.png' },
		{ title: 'Shawarama', price: '₹70', imgSrc: '/Screenshot 2025-01-05 215454.png' },
		{ title: 'Tandoori Chicken', price: '₹150', imgSrc: '/Screenshot 2025-01-05 215501.png' },
		{ title: 'Chilli Chicken', price: '₹100', imgSrc: '/Screenshot 2025-01-05 215512.png' }
	];

	// LocalStorage persistence logic
	const handleAddToCart = async (dish: { title: string; price: string }) => {
		try {
			const response = await fetch("/api/cart-func/add-to-cart", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...dish, restaurant: "Roll Me" }),
			});

			if (response.ok) {
				alert(`${dish.title} added to cart!`);
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
					<h2 className="title">Roll Me</h2>
				</div>
			</section>

			<div className="current-movies">
				{dishes.map((dish, index) => (
					<div key={index} className="current-movie">
						<div className="cm-img-box">
							<img src={dish.imgSrc} alt={dish.title} />
						</div>
						<h3 className="movie-title">{dish.title}</h3>
						<div className="booking">
							<h2 className="price">{dish.price}</h2>
							<button className="btn" onClick={() => handleAddToCart(dish)}>
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
