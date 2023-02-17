import React from 'react';

const Basket = ({ order, handleBasketShow, removeFromOrder, handleOrderItemIncrement, handleOrderItemDecrement }) => {

	const total = order.reduce((sum, elem) => {
		return sum + elem.price * elem.quanity
	}, 0);

	return (
		<ul className='basket'>
			<li className='basket__general'>
				<h3 className='basket__title'>Basket</h3>
				<button
					className='basket__close'
					onClick={handleBasketShow}
				>
					X
				</button>
			</li>
			{
				order.length === 0
					? <li>Basket clear</li>
					: order.map(item => (
						<li className='basket__item' key={item.id}>
							<div className='basket__item-content'>
								<h4 className='basket__item-title'>{item.name}</h4>
								<button
									className='basket__item-decrement'
									onClick={() => handleOrderItemDecrement(item.id)}
									disabled={item.quanity === 1 ? true : false}
								>
									-
								</button>
								<p className='basket__item-quanity'>{item.quanity}</p>
								<button
									className='basket__item-increment'
									onClick={() => handleOrderItemIncrement(item.id)}
								>
									+
								</button>
								<p className='basket__item-price'>{item.quanity * item.price}</p>
							</div>
							<button
								className='basket__item-remove'
								onClick={() => removeFromOrder(item.id)}
							>
								X
							</button>
						</li>
					))
			}
			<li className='basket__general'>
				<h3 className='basket__title'>Total price : {total}.</h3>
			</li>
		</ul>
	)
}

export default Basket;