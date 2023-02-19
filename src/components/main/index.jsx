import React, { useCallback, useEffect, useReducer } from 'react';
import { API_KEY, API_URL } from '../../config';
import { reducer } from '../../reducer';
import Basket from '../basket';
import Cart from '../cart';
import Product from '../product';

const getLocaleStorage = () => {
	const data = localStorage.getItem('react-shop');
	return data ? JSON.parse(data) : [];
}

const initialState = {
	goods: [],
	order: getLocaleStorage(),
	loading: 'loading',
	isBasketShow: false
}


const Main = () => {
	const [{ goods, order, loading, isBasketShow }, dispatch] = useReducer(reducer, initialState);
	useEffect(() => {
		fetch(`${API_URL}`, {
			headers: {
				'Authorization': API_KEY
			}
		}).then(res => res.json()
		).then((data) => {
			dispatch({ type: 'GET_GOODS', payload: data.featured });
			dispatch({ type: 'LOADING', payload: 'successful' });
		}).catch(e => {
			dispatch({ type: 'LOADING', payloadL: 'error' });
			dispatch({ type: 'GET_GOODS', payload: [] });
		})
	}, []);

	useEffect(() => {
		const json = JSON.stringify(order)
		localStorage.setItem('react-shop', json)
	}, [order]);

	const handleAddInBasket = useCallback(
		(item) => {
			dispatch({ type: 'SET_ORDER', payload: item })
		}, []
	)

	const handleBasketShow = () => {
		dispatch({ type: 'BASKET_SHOW' })
	}

	const removeFromOrder = (id) => {
		dispatch({ type: 'ORDER_REMOVE', payload: { id: id } })
	}

	const handleOrderItemIncrement = (id) => {
		dispatch({ type: 'ORDER_INCREMENT', payload: { id: id, status: 'increment' } })
	}

	const handleOrderItemDecrement = (id) => {
		dispatch({ type: 'ORDER_INCREMENT', payload: { id: id, status: 'decrement' } })
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

export default Main;