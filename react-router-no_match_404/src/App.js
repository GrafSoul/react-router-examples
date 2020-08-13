// Подключаем React и функционал React Router
import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';

// Компонент Home передает в рендер текст с описанием концепции данной реализации.
const Home = () => (
    <p>
        Используя <code>&lt;Switch></code> можно создать внутри него <code>&lt;Route></code> без path.
        <code>&lt;Route></code> будет работать как отображение Ошибки 404.
    </p>
);

// Компонент WillMatch передает в рендер текст страницы.
const WillMatch = () => <h3>Страница найдена!</h3>;

// Компонент NoMatch передает в рендер сообщение, о том, что по данному пути нет страницы.
const NoMatch = ({ location }) => (
    <div>
        <h3> <code>{location.pathname}</code> - Не соответсвует значениям в <code>&lt;Switch></code> Ошибка 404! </h3>
    </div>
);

// Компонент NoMatch
const NoMatchExample = () => (
    <Router>
        <div>
            {/* Формируем меню с ссылками на разные страницы */}
            <ul>
                <li><Link to="/">Главная</Link></li>
                <li><Link to="/will-match">Правильно указаный путь</Link></li>
                <li><Link to="/old-match">Перенаправление при указании старого пути</Link></li>
                <li><Link to="/will-not-match">Не правильно указаный путь</Link></li>
                <li><Link to="/also/will/not/match">Также не правильно указаный путь</Link></li>
            </ul>

            <hr/>
            {/* Используя <Switch> создаем группу <Route> с правильными отображениями,
            а так же перенаправление на правильную ссылку при получении значения /old-match
             и универсальный <Route> вызываемый при получени неправильно указаных ссылок */}
            <Switch>
                <Route path="/" exact component={ Home }/>
                <Redirect from="/old-match" to="/will-match"/>
                <Route path="/will-match" component={ WillMatch }/>
                <Route component={ NoMatch }/>
            </Switch>

        </div>
    </Router>
);

// Экспортируем NoMatchExample
export default NoMatchExample;