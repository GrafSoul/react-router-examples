// Подключаем React и функционал React Router
import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'

////////////////////////////////////////////////////////////
// 1. Кликнуть по ссылке "Общедоступная страница"
// 2. Кликнуть по ссылке "Защищеная страница"
// 3. Кликнуть по кнопке "Войти"
// 4. Кликнуть кнопке "Выйти", обратите внимание на URL-адрес

// Компонент Public
const Public = () => <h3>Общедоступная страница</h3>;

// Компонент Protected
const Protected = () => <h3>Защищенная страница</h3>;

// Объект fakeAuth содержит данные для активации и эмуляции ассинхронных запросов с сервера
const fakeAuth = {
	isAuthenticated: false,
	authenticate(cb) {
		this.isAuthenticated = true;
		setTimeout(cb, 1000) // fake async
	},
	signout(cb) {
		this.isAuthenticated = false;
		setTimeout(cb, 1000)
	}
};

// Компонент AuthButton содержит разметку показываемую авторизованному пользователю
const AuthButton = withRouter(({ history }) => (

	fakeAuth.isAuthenticated ? (
		<p>
			Добро пожаловать!
			<button onClick={() => { fakeAuth.signout(() => history.push('/')) }}>Выйти</button>
		</p>
	) : (
		<p>Вы не вошли в систему.</p>
	)
));

// Компонент PrivateRoute, в котором выполняется отображение основного контента в зависимости от статуса пользователя
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route { ...rest } render={ props => (
		fakeAuth.isAuthenticated ? (
            <Component { ...props }/>
		) : (
            <Redirect to={{
				pathname: '/login',
				state: { from: props.location }
			}}/>
		)
	)}/>
);

// Компонент Login содержит логику отображения контента если пользователь не активирован
// и перебрасывает его по ссылке если активирован
class Login extends React.Component {

	state = {
		redirectToReferrer: false
	};

	login = () => {
		fakeAuth.authenticate( () => {
			this.setState({ redirectToReferrer: true })
		})
	};

	render() {

		const { from } = this.props.location.state || { from: { pathname: '/' } };
		const { redirectToReferrer } = this.state;

		if (redirectToReferrer) {
			return (
                <Redirect to={ from }/>
			)
		}

		return (
            <div>
                <p>Вы должны войти, чтобы просмотреть страницу в { from.pathname }</p>
                <button onClick={this.login}>Войти</button>
            </div>
		)
	}
};

// Компонент AuthExample главный родительский компонент в котором собраны все остальные компоненты
const AuthExample = () => (
	<Router>
		<div>

			<AuthButton/>

			<ul>
				<li><Link to="/public">Общедоступная страница</Link></li>
				<li><Link to="/protected">Защищеная страница</Link></li>
			</ul>

			<Route path="/public" component={ Public }/>
			<Route path="/login" component={ Login }/>

			<PrivateRoute path="/protected" component={ Protected }/>

		</div>
	</Router>
);

// Экспортируем AuthExample
export default AuthExample