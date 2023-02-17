import React from 'react';
import cartImage from './header-cart.svg';

const Cart = ({ order, handleBasketShow }) => {

	const total = order.reduce((sum, elem) => {
		return sum + elem.quanity
	}, 0);

	return (
		<button
			className='cart'
			onClick={handleBasketShow}>
			<img
				className='cart__img'
				src={cartImage}
				alt='cart'
			/>
			<span className='cart__count'>{order.length > 0 ? total : '0'}</span>
		</button>
	)
}

export default Cart;