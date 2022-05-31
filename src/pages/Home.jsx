import React from 'react'

import Sort from '../components/Sort';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sceleton from '../components/PizzaBlock/Sceleton'

const Home = () => {
	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [categoryId, setCategoryId] = React.useState(0);
	const [sortType, setSortType] = React.useState(
		{ name: 'популярности', sortProperty: 'raiting' }
	);

	React.useEffect(() => {
		setIsLoading(true);

		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const sortBy = sortType.sortProperty.replace('-', '');
		const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';

		fetch(`https://629219decd0c91932b6d45bd.mockapi.io/items?
		${category}&sortBy=${sortBy}&order=${order}`)
			.then((res) => res.json())
			.then((arr) => {
				setItems(arr)
				setIsLoading(false)
			});
		window.scrollTo(0, 0);
	}, [categoryId, sortType])
	return (
		<div className="container">
			<div className="content__top">
				<Categories
					value={ categoryId }
					onChangeCategory={ (i) => setCategoryId(i) }
				/>
				<Sort
					value={ sortType }
					onChangeSort={ (i) => setSortType(i) }
				/>
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{
					isLoading ?
						[...new Array(6)].map((_, i) => (<Sceleton key={ i } />))
						:
						(items.map((item) => <PizzaBlock key={ item.id } { ...item } />))
				}
			</div>
		</div>
	)
}

export default Home