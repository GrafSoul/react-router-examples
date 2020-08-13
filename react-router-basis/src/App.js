// Подключаем React и React Router
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


// Компонент Home
const Home = () => (
    <div>
        <h2>Главная</h2>
        <p>Текст на главной странице</p>
    </div>
);

// Компонент About
const About = () => (
    <div>
        <h2>О нас</h2>
        <p>Информация о нас</p>
    </div>
);

// Компонент Topic получает на вход объект с параметром match.params.id
// для формирования заголовка
const Topic = ({ match }) => {
    // в консоле можно увидеть принимаемый объект
    console.log('match в Topic: ', match);
    console.log('match.params.id в Topic: ', match.params.id);

    return (
    <div>
        <h3>{ match.params.id.toUpperCase() }</h3>
        <p>Немного слов по теме...</p>
    </div>
)};

// Компонент Topics получает на вход объект с параметром match.url
// для формирования родительской ссылки
const Topics = ({ match }) => {
    // в консоле можно увидеть принимаемый объект
    console.log('match в Topics: ', match);
    console.log('match.url в Topics: ', match.url);

    return (
    <div>
        {/* Заголовок страницы */}
        <h2>Темы</h2>
        {/* Link используется для формирования ссылок для их описания указываем
        to={ `${ url.родительской.страницы }/название_страницы` } */}
        <ul>
            <li> <Link to={ `${ match.url }/rendering` }> Рендеринг в React </Link> </li>
            <li> <Link to={ `${ match.url }/components` }> Комопненты </Link> </li>
            <li> <Link to={ `${ match.url }/props-v-state` }> Props или State </Link> </li>
        </ul>
        {/* Route используется для вывода на экран вызываемого отображения
         в path={} можно передавать не только строки, но и объекты, а используя render={}
         можно передать функцию */}
        <Route path={`${ match.url }/:id`} component={ Topic }/>
        <Route exact path={ match.url } render={ () => ( <h3>Пожалуйста выберите тему.</h3> )}/>

    </div>
)};

// Компонент BasicExample
const BasicExample = () => (

    <Router>

        <div>
            {/* Link используется для формирования ссылок
                для их описания указываем to="/название_страницы" */}
            <ul>
                <li> <Link to="/">Главная</Link> </li>
                <li> <Link to="/about">О нас</Link> </li>
                <li> <Link to="/topics">Темы</Link> </li>
            </ul>

            <hr/>
	        {/* Route используется для вывода на экран вызываемого отображения
             для описания указываем path="/название_страницы" так кой же как указали в Link
             exact - указвает на страницу с более высоким приоритетом */}
            <Route exact path="/" component={ Home }/>
            <Route path="/about" component={ About }/>
            <Route path="/topics" component={ Topics }/>

        </div>

    </Router>
);

// Экспортируем BasicExample
export default BasicExample


