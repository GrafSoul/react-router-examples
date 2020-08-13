// Подключаем React и функционал React Router
import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

// Компонент Home
const Home = () => ( <div> <h2>Главная</h2> </div> );

// Компонент About
const About = () => ( <div><h2>О нас</h2></div> );

// Компонент CustomLinkExample, в нем формируются ссылки на основе компонета OldSchoolMenuLink,
// в зависимости от того какой путь активен на данный момент, в рендер передаются компоненты Home или About.
const CustomLinkExample = () => (

    <Router>
        <div>

            <OldSchoolMenuLink to="/" label="Главная" activeOnlyWhenExact={ true } />
            <OldSchoolMenuLink to="/about" label="О нас"/>

            <hr/>

            <Route exact path="/" component={ Home }/>
            <Route path="/about" component={ About }/>

        </div>
    </Router>

);

// Компонент OldSchoolMenuLink служит для формирования ссылок в меню с возможностью переключения
// строки (стрелки) рядом с названием и добавления класса к пункту меню активной страницы.
// Принимает три параметра label - название страницы, to - url страницы, activeOnlyWhenExact -
// служит для установки атрибута exact - true (есть), false (нет). В children прописана функция
// принимающая объект match от родителя, наличие объекта влияет на отображение стрелки ">"
// и подключение класса "active".
const OldSchoolMenuLink = ({ label, to, activeOnlyWhenExact }) => {

    return (
        <Route path={to} exact={ activeOnlyWhenExact } children={({ match }) => (

        <div className={ match ? 'active' : '' }>

           { console.log('OldSchoolMenuLink match', match) }

           { match ? ' > ' : ''} <Link to={ to }>{ label }</Link>

        </div>

        )}/>
)};

// Экспортируем CustomLinkExample
export default CustomLinkExample;