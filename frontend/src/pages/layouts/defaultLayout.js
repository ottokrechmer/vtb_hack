import React, { useState } from 'react';
import styles from './styles.module.scss';
import { NavLink, useHistory } from 'react-router-dom';
import paths from '../paths';
import Logo from '../../assets/icons/logo.svg';
import LoginPage from '../login';

const DefaultLayout = (props) => {
  const [isToken, setIsToken] = useState(!! localStorage.getItem('token'));
  const [isModalAuthOpen, setIsModalAuthOpen] = useState(false);
  const history = useHistory();
  const actionAuth = () => {
if (!isToken) {
  setIsModalAuthOpen(true);
}
  else {
    localStorage.removeItem('token');
    setIsToken(false);
  }
}
  return (
    <div className={styles.appContainer}>
      <div className={styles.header}>
        <div className={styles.leftNav}>
          <img onClick={() => history.push(paths.index)} src={Logo} alt='logo-vtb' />
          <nav className={styles.nav}>
            <NavLink activeClassName={styles.active} to={paths.main}>Главная</NavLink>
            {isToken && <NavLink activeClassName={styles.active} to={paths.feature}>Мои расчеты</NavLink>}
            {isToken && <NavLink activeClassName={styles.active} to={paths.myDatasets}>Мои датасеты</NavLink>}
          </nav>
        </div>
        <div  className={styles.rightNav} onClick={actionAuth}>{isToken ? 'Выйти' : 'Войти'}</div>
      </div>
      <div className={styles.contentContainer}>
        {isModalAuthOpen && <LoginPage setIsToken={setIsToken} setIsModalAuthOpen={setIsModalAuthOpen} isModalAuthOpen={isModalAuthOpen}/>}
        {props.children}
      </div>
    </div>
  );
}

export default DefaultLayout;
