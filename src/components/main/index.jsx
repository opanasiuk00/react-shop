import React, { useEffect, useState } from 'react';
import { API_KEY, API_URL } from '../../config';
import Basket from '../basket';
import Cart from '../cart';
import Product from '../product';

const getLocaleStorage = () => {
	const data = localStorage.getItem('react-shop'),
		items = data ? JSON.parse(data) : [];
	return items;
}


const Main = () => {
	const [goods, setGoods] = useState([]);
	const [order, setOrder] = useState(getLocaleStorage());
	const [isBasketShow, setBasketShow] = useState(false);
	const [loading, setLoading] = useState('loading');
	useEffect(() => {
		fetch(`${API_URL}`, {
			headers: {
				'Authorization': API_KEY
			}
		}).then(res => res.json()
		).then((data) => {
			setGoods(data.featured);
			setLoading('successful');
		}).catch(e => {
			setLoading('error')
			setGoods([]);
		})
	}, []);

	useEffect(() => {
		const json = JSON.stringify(order)
		localStorage.setItem('react-shop', json)
	}, [order])

	const handleAddInBasket = (item) => {
		const itemIndex = order.find(orderItem => orderItem.id === item.id);

		if (!itemIndex) {
			const newItem = { ...item, quanity: 1 }
			setOrder([...order, newItem]);
		} else {
			const newOrder = order.map(orderItem => {
				if (orderItem.id === itemIndex.id) {
					return {
						...orderItem,
						quanity: orderItem.quanity + 1
					}
				} else {
					return orderItem
				}
			})
			setOrder(newOrder);
		}
	}

	const handleBasketShow = () => {
		setBasketShow(prev => !prev)
	}

	const removeFromOrder = (id) => {
		setOrder(prev => prev.filter(elem => elem.id !== id));
	}

	const handleOrderItemIncrement = (id) => {
		const newOrder = order.map((item) => {
			if (item.id === id) {
				return {
					...item,
					quanity: item.quanity + 1
				}
			} else {
				return item
			}
		})
		setOrder(newOrder);
	}

	const handleOrderItemDecrement = (id) => {
		const newOrder = order.map((item) => {
			if (item.id === id) {
				return {
					...item,
					quanity: item.quanity - 1
				}
			} else {
				return item
			}
		})
		setOrder(newOrder);
	}

	return (
		<main className='main'>
			<Cart order={order} handleBasketShow={handleBasketShow} />
			{isBasketShow && <Basket
				order={order}
				handleBasketShow={handleBasketShow}
				removeFromOrder={removeFromOrder}
				handleOrderItemIncrement={handleOrderItemIncrement}
				handleOrderItemDecrement={handleOrderItemDecrement}
			/>}
			<div className='container'>
				<div className='main__inner'>
					{
						(loading === 'loading' &&
							<div>loading</div>) ||
						(loading === 'successful' &&
							goods.map(item => <Product key={item.id} {...item} handleAddInBasket={handleAddInBasket} />)) ||
						(loading === 'error' && <div>error</div>)

					}
				</div>
			</div>
		</main>
	)
}

export default Main