// Подключаем React и React Router
import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

// Компонент Home
const Home = () => <h2> Главная </h2>;

// Компонент About
const About = () => <h2> О нас </h2>;

// Компонент Company
const Company = () => <h2> Компания </h2>;

// Компонент User
const User = ({ match }) => (
    <div>
        <h2>Пользователь: {match.params.user}</h2>
    </div>
);

// Компонент AmbiguousExample
const AmbiguousExample = () => (

    <Router>
        <div>
            <ul>
                <li><Link to="/"> Главная (статическая ссылка) </Link></li>
                <li><Link to="/about"> О нас (статическая ссылка) </Link></li>
                <li><Link to="/company"> Компания (статическая ссылка) </Link></li>
                <li><Link to="/Алекс"> Алекс (динамическая ссылка) </Link></li>
                <li><Link to="/Кристина"> Кристина (динамическая ссылка) </Link></li>
            </ul>

            <hr/>

            {/* Использование обертки <Switch> позволяет вызывать представления
            как с жестко прописаными ссылками так и с динамическими */}
            <Switch>
                <Route exact path="/" component={ Home }/>
                <Route path="/about" component={ About }/>
                <Route path="/company" component={ Company }/>
                <Route path="/:user" component={ User }/>
            </Switch>

        </div>
    </Router>
);

// Экспортируем компонент AmbiguousExample
export default AmbiguousExample