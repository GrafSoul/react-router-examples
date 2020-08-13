// Подключаем React и функционал React Router
import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

// Компонент Child, служит для рендера контента
const Child = ({ match }) => {

    { console.log('Child - match: ', match) }

    return (
        <div>
            <h1>{ match.params.idCompany.toUpperCase() } </h1>
            <p>{ match.params.idCompany.toUpperCase() } это компания ...</p>
        </div>
    )
};

// Комопнент ParamsExample, является главным компонентом в котором формируются ссылки для меню
// и в звасисмости от того по какой ссылке был произведен клик, происходит отображение соотвествуещего
// контента в комопненте Child
const ParamsExample = () => (
    <Router>
        <div>

            <h2>Компании</h2>

            <ul>
                <li><Link to="/netflix"> Netflix </Link></li>
                <li><Link to="/zillow-group"> Zillow Group </Link></li>
                <li><Link to="/yahoo"> Yahoo </Link></li>
                <li><Link to="/modus-create"> Modus Create </Link></li>
            </ul>

            <hr/>

            <Route path="/:idCompany" component={ Child }/>

        </div>
    </Router>
);

// Экспортируем компонент ParamsExample
export default ParamsExample;