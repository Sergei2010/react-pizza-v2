import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// useSelector == useContext
// useDispatch -> ВЫПОЛНИТЬ
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { selectFilter, setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';
import Sort, { sortList } from '../components/Sort';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sceleton from '../components/PizzaBlock/Sceleton'
import Pagination from '../components/Pagination';

const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false);

	const { items, status } = useSelector(selectPizzaData);
	const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id))
	}
	const onChangePage = (number) => {
		dispatch(setCurrentPage(number));
	}

	const getPizzas = async () => {

		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const sortBy = sort.sortProperty.replace('-', '');
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
		const search = searchValue ? `&search=${searchValue}` : '';

		dispatch(fetchPizzas({
			category,
			sortBy,
			order,
			search,
			currentPage,
		})
		);
		window.scrollTo(0, 0);
	}

	// если был первый рендер и изменили параметры
	React.useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			});
			navigate(`?${queryString}`);
		}
		isMounted.current = true;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categoryId, sort.sortProperty, currentPage]);

	// если был первый рендер, то проверяю URL-параметры и передаю данные в Redux
	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));
			// console.log('params:', params)
			const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty)
			dispatch(setFilters({
				...params,
				sort,
			}));
			isSearch.current = true;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// усли был первый рендер, то запрашиваем пиццы
	React.useEffect(() => {
		getPizzas();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categoryId, sort.sortProperty, searchValue, currentPage]);

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
				{ status === 'loading' ? skeletons : pizzas }
			</div>
			<Pagination currentPage={ currentPage } onChangePage={ onChangePage } />
		</div>
	)
}

export default Home