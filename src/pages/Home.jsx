import React from 'react';

import Sort from '../components/Sort';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sceleton from '../components/PizzaBlock/Sceleton'
import Pagination from '../components/Pagination';

const Home = ({ searchValue }) => {
	const [items, setItems] = React.useState([]);
	const [currentPage, setCurrentPage] = React.useState(1)
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
		const search = searchValue ? `&search=${searchValue}` : '';

		fetch(`https://629219decd0c91932b6d45bd.mockapi.io/items?
		page=${currentPage}&limit=4
		&${category}&sortBy=${sortBy}&order=${order}${search}`)
			.then((res) => res.json())
			.then((arr) => {
				setItems(arr)
				setIsLoading(false)
			});
		window.scrollTo(0, 0);
	}, [categoryId, sortType, searchValue, currentPage])
	const pizzas = items.map((item) => <PizzaBlock key={ item.id } { ...item } />);
	const skeletons = [...new Array(6)].map((_, i) => (<Sceleton key={ i } />));

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
					isLoading ? skeletons : pizzas
				}
			</div>
			<Pagination onChangePage={ (number) => setCurrentPage(number) } />
		</div>
	)
}

export default Home