import React, {useEffect, useState} from "react";
import {Spin} from "antd";
import styles from './loader.module.scss';

const Loader = ({ statusText }) => {
	const [status, setStatus] = useState('');

	useEffect(() => {
		const loading = setInterval(() => {
			setStatus((currentValue) => {
				if (currentValue.length < 3) {
					return currentValue + '.';
				}
				return '';
			});
		}, 300);
		return () => {
			clearInterval(loading);
		}
	}, []);

	return (
		<div className={styles.container}>
			<Spin />
			{statusText && (
				<div className={styles.textWrapper}>
					<div>{statusText}</div>
					<div>{status}</div>
				</div>
			)}
		</div>
	);
};

export default Loader;


