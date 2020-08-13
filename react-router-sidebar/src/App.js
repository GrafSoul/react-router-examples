// Подключаем React и функционал React Router
import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

// В примере реализована возможность роутера одновременно выводить представления
// в разных местах, по одному клику в меню, обрабатывая входящие данные
// и выбирая в них разные данные

// Массив оббъектов с данными для формировани примера реализации
const routes = [
	{ path: '/',
		exact: true,
		sidebar: () => <div> Открыта главная страница </div>,
		main: () => <h2> Главная </h2>
	},
	{ path: '/about',
		sidebar: () => <div> Открыта страница "О компании" </div>,
		main: () => <h2> О компании </h2>
	},
	{ path: '/contacts',
		sidebar: () => <div> Открыта страница "Контакты" </div>,
		main: () => <h2> Контакты </h2>
	}
];

// Компонент SidebarExample
const SidebarExample = () => (

	<Router>

		<div style={{ display: 'flex' }}>

			<div style={{
				padding: '10px',
				width: '15%',
				background: '#f0f0f0'
			}}>
				{/* Формируем меню в левой колонке */}
				<ul style={{listStyleType: 'none', padding: 0 }}>
					<li><Link to="/"> Главная </Link></li>
					<li><Link to="/about"> О компании </Link></li>
					<li><Link to="/contacts"> Контакты </Link></li>
				</ul>

				{/* выбираем необходимый контент по значению пути
				и вызываем рендер для сайдбара route.sidebar */}
				{ routes.map((route, index) => (

					<Route
						key={index}
						path={route.path}
						exact={route.exact}
						component={route.sidebar}
					/>

				))}

			</div>

			<div style={{ flex: 1, padding: '10px' }}>

				{/* выбираем необходимый контент по значению пути
				и вызываем рендер для главной области route.main */}
				{routes.map((route, index) => (

					<Route
						key={index}
						path={route.path}
						exact={route.exact}
						component={route.main}
					/>

				))}

			</div>

		</div>

	</Router>
);

// Экспортируем компонент SidebarExample
export default SidebarExample