// Подключаем React и функционал React Router
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// Массив с данными о друзьях
const PEEPS = [
	{ id: 0, name: 'Михаил', friends: [ 1, 2, 3 ] },
	{ id: 1, name: 'Шон', friends: [ 0, 3 ] },
	{ id: 2, name: 'Ким', friends: [ 0, 1, 3 ], },
	{ id: 3, name: 'Давид', friends: [ 1, 2 ] }
];

// Функция для поиска друзей
const findFriends = ( id ) => PEEPS.find( p => p.id == id );

// Компонент Person
const Person = ({ match }) => {
	// Записываем в переменную объект с информацией о человеке друзей которого мы ищем
	const person = findFriends( match.params.id );

	return (

		<div>
			{/* Прописываем имя человека список друзей которого мы определяем */}
			<h3>Друзья { person.name }а</h3>

			{/* Формируем список друзей и ссылки на их отображения на основе данных в массиве person.friends */}
			<ul>
				{ person.friends.map(id => (
					<li key={id}>
						<Link to={ `${match.url}/${id}` }> { findFriends(id).name } </Link>
					</li>
				))}
			</ul>

			{/* Отображение реализовано универсальным, все зависит от того какие параметры ему переданы
			 Компонент Person рекурсивно вызывает самого себя */}
			<Route path={ `${match.url}/:id` } component={ Person } />

		</div>
	)
};

// Компонент RecursiveExample является главным компонентом и передаваемые
// в нем параметры для компонента Person необходымы для начальной инициализации
const RecursiveExample = () => (
	<Router>
		<Person match={{ params: { id: 0 }, url: '' }}/>
	</Router>
);

// Экспортируем компонент RecursiveExample
export default RecursiveExample;
