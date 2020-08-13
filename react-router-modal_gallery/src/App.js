// Подключаем React и функционал React Router
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// В примере показана реализация различных вариантом отображения контента
// в зависимости от того на какой странице находится пользователь,
// хотя при это используются одни и теже url адреса

// Кликнете по ссылкам с названием цвета и они откроются на полный экран, затем перейдите
// в галерею и кликнете по тем же цветам в виде квадратов с подписью и они откроются
// в виде модального окна. URL-адреса у ссылок из первого и второго варианта
// одинаковы, но из-за того что в первый раз ссылка вызывалась на главной странице,
// а во второй в галерее, контент отображается по разному

// Компонент Thumbnail - служит для отображения цветных квадратов в галерее
const Thumbnail = ({ color }) =>
	<div style={{
		width: 50,
		height: 50,
		background: color
	}}/>;

// Компонент Image - служит для отображения цветных прямоугольников на всю страницу
const Image = ({ color }) =>
	<div style={{
		width: '100%',
		height: 400,
		background: color
	}}/>;

// Компонент Home - содержит набор ссылок для отображеня на главной странице
const Home = () => (
	<div>
		<h1>Галерея цветов</h1>
		<Link to='/gallery'>Посетить Галерею</Link>
		<h2>Избранные Изображения</h2>
		<ul>
			<li><Link to='/img/2'>Томатный цвет</Link></li>
			<li><Link to='/img/4'>Малиновый цвет</Link></li>
		</ul>
	</div>
);

// Компонент Gallery - служит для генерации страницы галереи, состоящей из цветных квадратов с названием цвета
const Gallery = () => (

	<div>
		{/* Перебираем массив IMAGES с помощью map() */}
		{ IMAGES.map( i => (

			<Link
				key={ i.id }
				// Устанавливаем ссылки на каждый из цветов
				to={{
					pathname: `/img/${ i.id }`,
					// это главный трюк! здесь мы заставляем показывать
					// в модальном окне цвет который откроется по клику
					state: { modal: true }
				}}
			>
				{/* Выводим превью цвета */}
				<Thumbnail color={ i.color } />
				{/* Выводим название цвета */}
				<p>{ i.title }</p>

			</Link>
		))}

	</div>
);

// Компонент ImageView - служит для отображения цвета на всю страницу
const ImageView = ({ match }) => {

	// записываем объект с текущим цветом в переменную
	const image = IMAGES[ parseInt( match.params.id, 10 ) ];

	// Проверяем есть ли изображения, если нет показываем сообщение
	if (!image) {
		return <div>Нет изображений</div>
	}

	return (
		<div>
			{/* Выводим название цвета */}
			<h1>{ image.title }</h1>
			{/* Выводим отображение цвета */}
			<Image color={ image.color } />

		</div>
	)
};

// Компонент Modal
const Modal = ({ match, history }) => {

	// записываем объект с текущим цветом в переменную
	const image = IMAGES[ parseInt( match.params.id, 10 ) ];

	// Проверяем есть ли изображения, если нет возвращаем null
	if (!image) {
		return null
	}

	// Функция для отработки события по клику
	const back = (e) => {
		e.stopPropagation();
		history.goBack()
	};

	return (

		<div
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				bottom: 0,
				right: 0,
				background: 'rgba(0, 0, 0, 0.15)'
			}}
		>

			<div className='modal' style={{
				position: 'absolute',
				background: '#fff',
				top: 25,
				left: '10%',
				right: '10%',
				padding: 15,
				border: '2px solid #444'
			}}>

				{/* Выводим название цвета */}
				<h1>{ image.title }</h1>

				{/* Выводим отображение цвета */}
				<Image color={ image.color } />

				{/* Выводим кнопку для закрытия окна */}
				<button type='button' onClick={ back }> Закрыть </button>

			</div>
		</div>
	)
};

// Компонент ModalSwitch - главный комопонент, содержит основную логику обеспечивающую отображение
// модального окна или отдельной страницы.
class ModalSwitch extends React.Component {
	// Записвываем предыдущее местоположение
	previousLocation = this.props.location;

	componentWillUpdate(nextProps) {
		// Записвываем текущее местоположение
		const { location } = this.props;

		// Записвываем текущее местоположение в previousLocation в которой хранится информация для последущих действий
		if ( nextProps.history.action !== 'POP' &&	(!location.state || !location.state.modal)) {
			this.previousLocation = this.props.location
		}

	}

	render() {

		const { location } = this.props;
		// Значение isModal позволяет определиться показывать модальное окно,
		// или показыть представление на странице
		const isModal = !!(
			location.state && location.state.modal && this.previousLocation !== location
		); // получаем true или false

		return (
			<div>
				{/* используя условия определяем, что показывать,
				страницу с обычным отображением, или модальное окно */}
				<Switch location={ isModal ? this.previousLocation : location }>
					<Route exact path='/' component={ Home }/>
					<Route path='/gallery' component={ Gallery }/>
					<Route path='/img/:id' component={ ImageView }/>
				</Switch>

				{ isModal ? <Route path='/img/:id' component={ Modal } /> : null }

			</div>
		)
	}
}

// Демонстрационные данные
const IMAGES = [
	{ id: 0, title: 'Темная Орхидея', color: 'DarkOrchid' },
	{ id: 1, title: 'Зеленый Лайм', color: 'LimeGreen' },
	{ id: 2, title: 'Томатный', color: 'Tomato' },
	{ id: 3, title: 'Серый', color: '#789' },
	{ id: 4, title: 'Малиновый', color: 'Crimson' }
];

// Компонент ModalGallery
const ModalGallery = () => (
    <Router>
        <Route component={ ModalSwitch } />
    </Router>
);

// Экспортируем комопнент ModalGallery
export default ModalGallery