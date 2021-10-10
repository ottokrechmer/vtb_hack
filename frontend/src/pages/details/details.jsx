import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { Collapse, Table, Input, Select, Modal } from 'antd';
import Avatar from './../../assets/icons/avatar.svg';
import Error from './../../assets/icons/error.svg';
import  styles from './details.module.scss';
import { fetchDataset, purchaseDataset, createDataset, fetchDataTypes } from '../../services/dataset';
import useAsyncEffect from 'use-async-effect';
import { useHistory } from 'react-router-dom';
import { reverse } from 'named-urls';
import paths from '../paths';
// import Delete from '../../assets/icons/delete.svg'
import Loader from '../loader';
import './antd.css';

const { Panel } = Collapse;
const { Option } = Select;

const defaultData = {
	description: '',
	price: 0,
	fields : [],
}

const columns = [
	{
		title: 'Название поля',
		dataIndex: 'name',
		key: 'name',
		width: '240px'
	},
	{
		title: 'Тип данных',
		dataIndex: 'dataType',
		key: 'dataType',
		width: '200px',
		render: (item) => (
			<span>{item?.split('_')[0] || ''}</span>
		),
	},
	{
		title: 'Описание',
		dataIndex: 'desc',
		key: 'desc',
		width: '840px'
	},
	// {
	// 	title: '',
	// 	dataIndex: 'id',
	// 	className: styles.tdAction,
	// 	key: 'action',
	// 	render: (id) =>
	// 	  (<div className={styles.detailBtn}><img alt="delete" src={Delete} /></div>
	// 	  ),
	//   },
];

const DetailsPage = () => {
	const { id } = useParams();
	const history = useHistory();
	const [data, setData] = useState(defaultData);
	const [types, setTypes] = useState([]);
	const [newData, setNewData] = useState(defaultData.fields);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);

	useAsyncEffect(async () => {
		setLoading(true);
		if (id !== 'new') {
			const res = await fetchDataset(id);
			if (res) {
				setData(res || {});
				setNewData(res?.fields || []);
			} else {
				history.push(paths.main);
			}
		} else {
			const res = await fetchDataTypes(id);
			setTypes(res);
		}
		setLoading(false);
	  }, [id]);

	const addNew = () => {
		const tmp = data?.fields?.slice() || [];
		tmp.push(newData);
		setData({...data, fields: tmp });
		setNewData([]);
	};

	const purchase = async () => {
		const res = await purchaseDataset(id);
		setData({...data, isPurchased: res === 'Done!'});
		setIsModalVisible(res === 'Not enough money!');
	}

	const create = async () => {
		if (! data.name)
			setError('Пожалуйста, заполните название датасета');
		else if (isNaN(data.price))
			setError('Поле "Стоимость" должно быть числом.');
		else {
			const res = await createDataset(data);
			setError('');
			const id = res?.id;
			history.push(reverse(paths.details, { id }));
		}
	}
	return (
		<div className={styles.container}>
			<div className={styles.main}>
				<h1>{id === 'new' ? 'Создание датасета' : 'Детализация'}</h1>
				{! loading && <>
				<div className={styles.descriptionBlock}>
					<img src={Avatar}/>
					{id === 'new' ?
						<div className={styles.addNew}>
							<Input placeholder='Введите название датасета' value={data.fields.name} onChange={(e) => setData({...data, name: e.target.value})}/>
							<Input placeholder='Введите стоимость' onChange={(e) => setData({...data, price: e.target.value})}/>
							<div className={styles.description}>
								<Input placeholder='Введите описание' value={data.fields.description} onChange={(e) => setData({...data, description: e.target.value})}/>
							</div>
						</div>
						:
						<>
							<p className={styles.title}>{data.name}</p>
							<div className={styles.owner}>
								<p>Владелец</p>
								<p>{data.owner}</p>
							</div>
							<div>
								<p>Стоимость</p>
								<p>{data.price ? data.price : "free"}</p>
							</div>
							<div className={styles.description}>
								<p>Описание</p>
								<p>{data.description}</p>
							</div>
						</>
					}
					{loading && <Loader/>}
				</div>
				<div className={styles.error}>{error}</div>
				{id !== 'new' && !data.isPurchased && !data.isMine && <>
					{!! data.price && <button className={styles.firstBtn} onClick={purchase}>Купить</button>}
					<button className={styles.defaultBtn} onClick={() => history.push(`/constructor/${id}/new`)}>Перейти в конструктор</button>
				</>}
				{(data.isPurchased || data.isMine) && <>
					<button className={styles.defaultBtn} onClick={() => history.push(`/constructor/${id}/new`)}>Перейти в конструктор</button>
					<button className={styles.secondBtn} onClick={() => history.goBack()}>Вернуться назад</button>
				</>}
			</>}
			</div>
			<div className={styles.main}>
				{id === 'new' &&
					<div className={styles.addNewBlock}>
						<Input placeholder='Введите название поля' value={newData.name} onChange={(e) => setNewData({...newData, name: e.target.value})}/>
						<Select className={styles.select} size='small' value={newData.dataType} onSelect={(value) => setNewData({...newData, dataType: value})}>
							{types.map((item) => {
								return (
									<Option key={item} value={item}>{item.split('_')[0]}</Option>
								)
							})}
						</Select>
						<Input placeholder='Введите описание поля' value={newData.desc} onChange={(e) => setNewData({...newData, desc: e.target.value})}/>
						<button className={styles.addBtn} onClick={addNew}>Добавить</button>
					</div>
				}
				<Collapse defaultActiveKey="1">
					<Panel header="Показать данные" key="1">
						<div className={styles.mainSearchResults}>
							<Table
								rowKey={data?.fields?.name}
								pagination={false}
								locale={{ emptyText: 'Нет данных' }}
								dataSource={data.fields}
								columns={columns}/>
						</div>
					</Panel>
				</Collapse>
			</div>
			{id === 'new' && <button className={styles.saveBtn} onClick={create} okText="Пополнить счёт" cancelText="Отказаться">Сохранить</button>}
			<Modal visible={isModalVisible} onCancel={() => setIsModalVisible(false)}>
				<div className={styles.modalTitle}>
					<img src={Error}/>
					<h2>У вас недостаточно средств для оплаты</h2>
				</div>
				<div className={styles.modalBtn}>
					<button className={styles.firstBtn} onClick={() => setIsModalVisible(false)}>Пополнить счёт</button>
					<button className={styles.defaultBtn} onClick={() => setIsModalVisible(false)}>Отказаться</button>
				</div>
			</Modal>
		</div>
	);
};

export default DetailsPage;
