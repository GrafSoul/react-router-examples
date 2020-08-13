// Подключаем React и React Router
import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

// Компонент Main
const Main= () => <h2>Главная</h2>;

// Компонент Sandwiches
const Sandwiches = () => <h2>Сендвичи</h2>;

// Компонент Tacos
const Tacos = ({ routes }) => (
	<div>
		<h2>Тако</h2>

		<ul>
			<li><Link to="/tacos/bus">Автобус</Link></li>
			<li><Link to="/tacos/cart">Тележка</Link></li>
		</ul>

		<hr/>

		{/* Набор необходимых <Route> для второго уровня вложености создается перебором
		объектов в массиве route и передачей их в компонет RouteWithSubRoutes */}
		{ routes.map((route, i) => (
			<RouteWithSubRoutes key={i} {...route}/>
		))}

	</div>
);

// Компонент Bus
const Bus = () => <h3>Автобус</h3>;

// Компонент Cart
const Cart = () => <h3>Тележка</h3>;

// Компонент RouteWithSubRoutes
const RouteWithSubRoutes = (route) => (
	/* Значение свойства объектов в массиве route передаются в <Route> через его атрибуты
	 * Через передачу routes={route.routes} создается второй уровень вложености */
	<Route exact={route.exact} path={route.path} render={ props => (
		<route.component {...props} routes={route.routes}/>
	)}/>

);

// Массив с конфигурацией для роутера
const routes = [
	{ path: '/',
		component: Main,
		exact: {}
	},
	{ path: '/sandwiches',
		component: Sandwiches
	},
	{ path: '/tacos',
		component: Tacos,
		routes: [
			{ path: '/tacos/bus',
				component: Bus
			},
			{ path: '/tacos/cart',
				component: Cart
			}
		]
	}
];

// Комопнент RouteConfigExample
const RouteConfigExample = () => (
	<Router>
		<div>

			<ul>
				<li><Link to="/">Главная</Link></li>
				<li><Link to="/tacos">Тако</Link></li>
				<li><Link to="/sandwiches">Сандвичи</Link></li>
			</ul>

			<hr/>

			{/* Набор необходимых <Route> создается перебором объектов в массиве route
			 и передачей их в компонет RouteWithSubRoutes */}
			{routes.map((route, i) => (
				<RouteWithSubRoutes key={i} {...route}/>
			))}

		</div>
	</Router>
);

// Экспортируем компонент RouteConfigExample
export default RouteConfigExample