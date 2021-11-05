import React, { useState } from "react";
import CollapseWrapper from "../common/collapse";
import { PropTypes } from "prop-types";
import CardWrapper from "../common/Card";

const withAuth = (Component) => (props) => {
    return <CardWrapper><Component {...props}/></CardWrapper>;
};

function SimpleComponent({ onLogin, onLogOut, isAuth }) {
    return isAuth ? <button className="btn btn-primary mx-auto" onClick={onLogOut}>Выйти из системы</button> : <button className="btn btn-primary mx-auto" onClick={onLogin}>Войти</button>;
}

SimpleComponent.propTypes = {
    onLogin: PropTypes.func,
    onLogOut: PropTypes.func,
    isAuth: PropTypes.bool
};

const HocExercise = () => {
    const HOCAuthComponent = withAuth(SimpleComponent);

    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("user")));

    function onLogin() {
        localStorage.setItem("user", JSON.stringify(true));
        setAuth(true);
    }

    function onLogOut() {
        localStorage.removeItem("user");
        setAuth(false);
    }

    return (
        <CollapseWrapper title="Упражнение">
            <p className="mt-3">
                Вам необходимо реализовать компонент{" "}
                <code>SimpleComponent</code>, который:
            </p>
            <ul>
                <li>
                    Имеет параметры:<code>onLogin</code>, <code>onLogOut</code>,{" "}
                    <code>isAuth</code>
                </li>
                <li>
                    Отображайте кнопку <code>Войти</code>, если пользователь НЕ
                    авторизован.
                </li>
                <li>
                    Отображает кнопку с содержанием{" "}
                    <code>Выйти из системы</code>, если пользователь
                    авторизован.
                </li>
                <li>
                    При нажатии на кнопки вызываются методы <code>onLogin</code>{" "}
                    и <code>onLogOut</code>
                </li>
            </ul>
            <p className="mt-3">
                Вам необходимо <code>HOC</code>, который модицифицует компонент{" "}
                <code>SimpleComponent</code> следующим образом:
            </p>
            <ul>
                <li>
                    Добавляет обертку в виде карточки boostrap (использовать
                    существующий HOC)
                </li>
                <li>
                    Передает параметр <code>isAuth</code>, который является
                    результатом проверки наличия записи с названием{" "}
                    <code>user</code> в <code>localStorage</code>
                </li>
                <li>
                    Передает параметр <code>onLogin</code> и{" "}
                    <code>onLogOut</code> для управления записью с названием{" "}
                    <code>user</code> в <code>localStorage</code>
                </li>
            </ul>
            <HOCAuthComponent isAuth={auth} onLogin={onLogin} onLogOut={onLogOut}/>
        </CollapseWrapper>
    );
};

export default HocExercise;
