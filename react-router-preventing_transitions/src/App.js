// Подключаем React и функционал React Router
import React from 'react';
import { BrowserRouter as Router, Route, Link, Prompt } from 'react-router-dom';

// Компонент Form содержит весь функционал блокировки перехода на страницы,
// блокировка производится после ввода текста в поле input, при клике по ссылкам в меню 
// после ввода текста вместо перехода на соотвествующую страницу появляется prompt окно
// с вопросом - "Вы уверены, что хотите перейти", в зависимоти от ответа происходит
// показ страницы или возврат к странице с input
class Form extends React.Component {

	state = { isBlocking: false };

	render() {

		const { isBlocking } = this.state;

		/* Устанавливаем в тег form слушатель событий, после отправки формы
		 обновляющий данные в state и отключающий стандартные свойства */
		return (
			<form
				onSubmit={ event => {
					event.preventDefault();
					event.target.reset();
					this.setState({
						isBlocking: false
					})
				}}
			>
				{/* Попап окно prompt из арсенала React Router, принимаем и добавлем
				в сообщение url ссылки по которой кликнули и isBlocking заначение которого
				меняется взависимости от выбора Да или Нет */}
				<Prompt
					when={ isBlocking }
					message={ location => (
						`Вы уверены, что хотите перейти в ${ location.pathname }`
					)}
				/>

				{/* Показываем сообщения в звасимости от того что надится в isBlocking -
				 true или false */}
				<p>
					Заблокировано? - { isBlocking ? 'Да, Нажмите на одну из ссылок в меню или кнопку "Прекратить блокирову"' : 'Нет' }
				</p>

				{/* слушатель событий onChange в зависимости от того пустой input или нет
				меняет значение isBlocking в state */}
				<p>
					<input
						size="50"
						placeholder="Напишите что нибудь для блокирования"
						onChange={ event => {
							this.setState({
								isBlocking: event.target.value.length > 0  // > 0 - true, < 0 - false
							})
						}}
					/>
				</p>

				{/* Клик по кнопке снимает блокировку */}
				<p><button>Прекратить блокирову</button></p>

			</form>
		)
	}
}

// Компонент PreventingTransitionsExample служит для формирования и отображения меню
// и в зависимости от клика в меню, отображает выбраный комопнент. Вся логика блокировки
// находится в компоненте Form
const PreventingTransitionsExample = () => (
	<Router>
		<div>
			<ul>
				<li><Link to="/">Форма</Link></li>
				<li><Link to="/one">Один</Link></li>
				<li><Link to="/two">Два</Link></li>
			</ul>

			<hr/>

			<Route path="/" exact component={ Form }/>
			<Route path="/one" render={ () => <h3> Страница - Один </h3> }/>
			<Route path="/two" render={ () => <h3> Страница - Два </h3> }/>
		</div>
	</Router>
);

// Экспортируем комопнент PreventingTransitionsExample
export default PreventingTransitionsExample;