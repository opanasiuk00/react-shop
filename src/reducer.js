export const reducer = (state, { type, payload }) => {
	switch (type) {
		case 'GET_GOODS':
			return {
				...state,
				goods: payload
			};
		case 'LOADING':
			return {
				...state,
				loading: payload
			};
		case 'ORDER_REMOVE':
			return {
				...state,
				order: state.order.filter(elem => elem.id !== payload.id)
			};
		case 'SET_ORDER':
			const itemIndex = state.order.find(orderItem => orderItem.id === payload.id);
			if (!itemIndex) {
				const newItem = { ...payload, quanity: 1 }
				return {
					...state,
					order: [...state.order, newItem]
				}
			} else {
				return {
					...state,
					order: state.order.map(orderItem => {
						if (orderItem.id === itemIndex.id) {
							return {
								...orderItem,
								quanity: orderItem.quanity + 1
							}
						} else {
							return orderItem
						}
					})
				}
			}
		case 'ORDER_INCREMENT': {
			return {
				...state,
				order: state.order.map(item => {
					if (item.id === payload.id) {
						return {
							...item,
							quanity: item.quanity + (payload.status === 'increment' ? + 1 : -1)
						}
					} else {
						return item
					}
				})
			}
		}
		case 'BASKET_SHOW': {
			return {
				...state,
				isBasketShow: !state.isBasketShow
			}
		}


		default:
			return state;
	}
}