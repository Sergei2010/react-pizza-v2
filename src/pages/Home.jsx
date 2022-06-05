import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// useSelector == useContext
// useDispatch -> ВЫПОЛНИТЬ
import axios from 'axios';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import Sort from '../components/Sort';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sceleton from '../components/PizzaBlock/Sceleton'
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
	const dispatch = useDispatch();
	const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
	const { searchValue } = React.useContext(SearchContext);
	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id))
	}
	const onChangePage = (number) => {
		dispatch(setCurrentPage(number));
	}
	// const [categoryId, setCategoryId] = React.useState(0);
	/* const [sortType, setSortType] = React.useState(
		{ name: 'популярности', sortProperty: 'raiting' }
	); */

	React.useEffect(() => {
		setIsLoading(true);

		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const sortBy = sort.sortProperty.replace('-', '');
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
		const search = searchValue ? `&search=${searchValue}` : '';

		axios.get(`https://629219decd0c91932b6d45bd.mockapi.io/items?
				page=${currentPage}&limit=4
				&${category}&sortBy=${sortBy}&order=${order}${search}`)
			.then(res => {
				setItems(res.data)
				setIsLoading(false)
			})
		window.scrollTo(0, 0);
	}, [categoryId, sort.sortProperty, searchValue, currentPage])
	const pizzas = items.map((item) => <PizzaBlock key={ item.id } { ...item } />);
	const skeletons = [...new Array(6)].map((_, i) => (<Sceleton key={ i } />));

	return (
		<div className="container">
			<div className="content__top">
				<Categories
					value={ categoryId }
					onChangeCategory={ onChangeCategory }
				/>
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{
					isLoading ? skeletons : pizzas
				}
			</div>
			<Pagination currentPage={ currentPage } onChangePage={ onChangePage } />
		</div>
	)
}

export default Home