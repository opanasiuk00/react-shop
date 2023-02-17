import React from 'react';

const Product = ({ id, name, description, price, full_background, handleAddInBasket }) => {

	return (
		<div className='product'>
			<div className='product__picture'>
				<img className='product__img' src={full_background} alt={name} />
			</div>
			<div className='product__content'>
				<h2 className='product__title'>{name}</h2>
				<p className='product__description'>{description}</p>
			</div>
			<hr className='product__line' />
			<div className='product__action'>
				<button
					className='product__button'
					onClick={() =>
						handleAddInBasket({
							id,
							name,
							price
						})}>Купить</button>
				<h3 className='product__price'>{price}$</h3>
			</div>
		</div>
	)
}

export default Product;