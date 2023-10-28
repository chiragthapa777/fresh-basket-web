import React, { useState } from "react";

interface OrderItemProps {
	id: number;
	name: string;
	price: number;
	imageSrc: string;
}

const OrderItem = () => {
	const [quantity, setQuantity] = useState(1);

	const incrementQuantity = () => {
		setQuantity(quantity + 1);
	};

	const decrementQuantity = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};

	return (
		<div className="flex border border-gray-300bg-base-100 rounded-md">
			<div className="">
				<img
					src={`https://cdn.pixabay.com/photo/2016/08/11/08/04/vegetables-1584999_1280.jpg`}
					alt={"img"}
					className="w-24 h-24"
				/>
			</div>
			<div className="w-3/4 p-1">
				<h3 className="text-lg font-semibold">{`Product Name`}</h3>
				<p className="text-gray-600">${(100).toFixed(2)}</p>
				<div className="flex justify-between items-center">
					<div className="flex">
						<button
							className="bg-primary text-white px-2 py-1 rounded-l hover:bg-primary-dark"
							onClick={decrementQuantity}
						>
							-
						</button>
						<span className="px-4 py-1 border-t border-b border-gray-300">
							{quantity}
						</span>
						<button
							className="bg-primary text-white px-2 py-1 rounded-r hover:bg-primary-dark"
							onClick={incrementQuantity}
						>
							+
						</button>
					</div>
					<p className="text-gray-600 mr-4">Total : {100 * quantity}</p>
				</div>
			</div>
		</div>
	);
};

export default OrderItem;
