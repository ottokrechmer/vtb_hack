import React from "react";
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.scss';
import GoogleIcon from '../../assets/icons/google.svg';
import { Modal } from 'antd';
import './antd.css';

const LoginPage = (props) => {
	const goToTheGoogle = () => {
		const uuid = uuidv4();
		localStorage.setItem('token', uuid);
		window.location.href = `http://ec2-18-219-12-230.us-east-2.compute.amazonaws.com/back/core/login?token=${uuid}`;
		props.setIsModalAuthOpen(false);
		props.setIsToken(true);
	}
	return (
		<Modal visible={props.isModalAuthOpen} onCancel={() => props.setIsModalAuthOpen(false)}>
			<div className={styles.auth}>
				<p>Вход</p>
				<button  className={styles.authBtn} onClick={goToTheGoogle}><img  className={styles.icon} src={GoogleIcon} alt='icon'/><span>Войти через Google</span></button>
			</div>
		</Modal>
	);
};

export default LoginPage;
