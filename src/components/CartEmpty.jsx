import React from 'react';
import { Link } from 'react-router-dom';

import cartEmptyImg from '../assets/img/empty-cart.png'

const CartEmpty = () => {
	return (
		<div className='cart--empty'>
			<h2> Корзина пустая  <span>😕</span></h2>
			<p>
				Вероятнее всего Вы ещё не заказывали пиццу.<br />
				Для того, чтобы заказать пиццу, перейдите на главную страницу.
			</p>
			<img src={ cartEmptyImg } alt="EmptyCart" />
			<Link to='/' className='button button--black'>
				<span>Вернуться назад</span>
			</Link>
		</div>
	)
}

export default CartEmpty;
