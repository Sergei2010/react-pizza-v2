import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FullPizza = () => {
	const [pizza, setPizza] = React.useState();
	const { id } = useParams();
	const navigate = useNavigate();


	React.useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get(`https://629219decd0c91932b6d45bd.mockapi.io/items/${id}`);
				setPizza(data);
			} catch (error) {
				alert('Ошибка при получении пиццы!');
				navigate('/');
			}
		}
		fetchPizza();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (!pizza) {
		return (<div className="container">Загрузка ...</div>);
	}
	return (
		<div className='container'>
			<img src={ pizza.imageUrl } alt="Pizza" />
			<h2>{ pizza.title }</h2>
			<h4>{ pizza.price } &#8381;</h4>
		</div>
	)
}

export default FullPizza;