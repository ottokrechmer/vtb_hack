import React, {useCallback, useState} from "react";
import styles from "./targetView.module.scss";
import {Button, Input, Popover, Select, Radio} from "antd";
import icon from '../../../assets/icons/icon_round_plus.svg';
import settingIcon from '../../../assets/icons/filter.svg';
import closeIcon from '../../../assets/icons/close_popup_icon.svg';
import {v4 as uuidv4} from "uuid";

const { Option } = Select;

const overBoxStyle = {
	boxShadow: '4px 4px 23px 6px rgba(55, 151, 245, 0.40)'
};

const overTextStyle = {
	opacity: 0.6
};

const onDragOver = (e) => {
	e.preventDefault();
}

const operations = {
	'empty': { id: 'empty', name: '-', targetType: 'str_type' },
	'string-concat': { id: 'string-concat', name: 'сцепить', targetType: 'str_type' },
	'date-year': { id: 'date-year', name: 'вернуть год', targetType: 'int_type' },
	'date-month': { id: 'date-month', name: 'вернуть месяц', targetType: 'int_str' },
	'date-weekday': { id: 'date-weekday', name: 'вернуть день недели', targetType: 'str_type' },
	'date-day': { id: 'date-day', name: 'вернуть число', targetType: 'int_type' },
	'date-iso': { id: 'date-iso', name: 'вернуть ISO timestamp', targetType: 'str_type' },
	'datetime-year': { id: 'datetime-year', name: 'вернуть год', targetType: 'int_type' },
	'datetime-month': { id: 'datetime-month', name: 'вернуть месяц', targetType: 'int_type' },
	'datetime-weekday': { id: 'datetime-weekday', name: 'вернуть день недели', targetType: 'int_type' },
	'datetime-day': { id: 'datetime-day', name: 'вернуть число', targetType: 'int_type' },
	'datetime-iso': { id: 'datetime-iso', name: 'вернуть ISO timestamp', targetType: 'int_type' },
	'datetime-hour': { id: 'datetime-hour', name: 'вернуть часы', targetType: 'int_type' },
	'datetime-minute': { id: 'datetime-minute', name: 'вернуть минуты', targetType: 'int_type' },
	'datetime-second': { id: 'datetime-second', name: 'вернуть секунды', targetType: 'int_type' },
	'datetime-timezone': { id: 'datetime-timezone', name: 'вернуть часовой пояс', targetType: 'int_type' },
	'datetime-utc': { id: 'datetime-utc', name: 'вернуть в UTC', targetType: 'str_type' },
	'int-sum': { id: 'int-sum', name: 'сложить', targetType: 'int_type' },
	'int-subtract': { id: 'int-subtract', name: 'вычесть', targetType: 'int_type' },
	'int-multiply': { id: 'int-multiply', name: 'умножить', targetType: 'int_type' },
	'int-divide': { id: 'int-divide', name: 'разделить', targetType: 'int_type' },
	'int-to-string': { id: 'int-to-string', name: 'преобразовать в строку', targetType: 'str_type' },
	'float-sum': { id: 'float-sum', name: 'сложить', targetType: 'float_type' },
	'float-subtract': { id: 'float-subtract', name: 'вычесть', targetType: 'float_type' },
	'float-multiply': { id: 'float-multiply', name: 'умножить', targetType: 'float_type' },
	'float-divide': { id: 'float-divide', name: 'разделить', targetType: 'float_type' },
	'float-to-string': { id: 'float-to-string', name: 'преобразовать в строку', targetType: 'str_type' }
}

const filterOptions = {
	'int_type': [
		{ id: 'empty', name: '-'},
		{ id: 'int-equal', name: 'равно'},
		{ id: 'int-greater-or-equal', name: 'больше или равно'},
		{ id: 'int-smaller-or-equal', name: 'меньше или равно'},
		{ id: 'int-greater', name: 'больше'},
		{ id: 'int-smaller', name: 'меньше'},
	],
	'float_type': [
		{ id: 'empty', name: '-'},
		{ id: 'float-equal', name: 'равно'},
		{ id: 'float-greater-or-equal', name: 'больше или равно'},
		{ id: 'float-smaller-or-equal', name: 'меньше или равно'},
		{ id: 'float-greater', name: 'больше'},
		{ id: 'float-smaller', name: 'меньше'},
	],
	'date_type': [
		{ id: 'empty', name: '-'},
		{ id: 'date-equal', name: 'равно'},
		{ id: 'date-greater-or-equal', name: 'больше или равно'},
		{ id: 'date-smaller-or-equal', name: 'меньше или равно'},
		{ id: 'date-greater', name: 'больше'},
		{ id: 'date-smaller', name: 'меньше'},
	],
	'datetime_type': [
		{ id: 'empty', name: '-'},
		{ id: 'datetime-equal', name: 'равно'},
		{ id: 'datetime-greater-or-equal', name: 'больше или равно'},
		{ id: 'datetime-smaller-or-equal', name: 'меньше или равно'},
		{ id: 'datetime-greater', name: 'больше'},
		{ id: 'datetime-smaller', name: 'меньше'},
	],
	'str_type': [
		{ id: 'empty', name: '-'},
		{ id: 'string-equal', name: 'равно'},
		{ id: 'string-contains', name: 'содержит'},
		{ id: 'string-not-contains', name: 'не содержит'},
	],
	'bool_type': [
		{ id: 'empty', name: '-'},
		{ id: 'boolean-equal', name: 'равно'},
	]
}

const getSelectOptions = (type) => {
	switch (type) {
		case 'str_type':
			return [
				operations['string-concat'],
				operations['empty']
			];
		case 'date_type':
			return [
				operations['date-year'],
				operations['date-month'],
				operations['date-weekday'],
				operations['date-day'],
				operations['date-iso'],
				operations['empty']
			];
		case 'datetime_type':
			return [
				operations['datetime-year'],
				operations['datetime-month'],
				operations['datetime-weekday'],
				operations['datetime-day'],
				operations['datetime-iso'],
				operations['datetime-hour'],
				operations['datetime-minute'],
				operations['datetime-second'],
				operations['datetime-timezone'],
				operations['datetime-utc'],
				operations['empty']
			];
		case 'int_type':
			return [
				operations['int-sum'],
				operations['int-subtract'],
				operations['int-multiply'],
				operations['int-divide'],
				operations['int-to-string'],
				operations['empty']
			];
		case 'float_type':
			return [
				operations['float-sum'],
				operations['float-subtract'],
				operations['float-multiply'],
				operations['float-divide'],
				operations['float-to-string'],
				operations['empty']
			];
		default:
			return [
				operations['empty']
			];
	}
};

const TargetView = ({data, sourceData, addField, addStep, updateName, updateField}) => {
	// console.log('target is ', data);
	const [overFilter, setOverFilter] = useState(false);
	const [overFilterCou, setOverFilterCou] = useState(0);
	const [overTransform, setOverTransform] = useState(false);
	const [overTransformCou, setOverTransformCou] = useState(0);
	const [overBlock, setOverBlock] = useState(false);
	const [overBlockCou, setOverBlockCou] = useState(0);

	const handleNameChange = useCallback((e) => {
		updateName(e.target.value, data.id);
	}, [data]);

	const onDragEnterFilter = (e) => {
		if (overFilterCou === 0) {
			setOverFilter(true);
		}
		setOverFilterCou(overFilterCou + 1);
	}

	const onDragLeaveFilter = (e) => {
		if (overFilterCou === 1) {
			setOverFilter(false);
		}
		setOverFilterCou(overFilterCou - 1);
	}

	const onDropFilter = (e) => {
		e.preventDefault();
		let field = null;
		try {
			field = JSON.parse(e.dataTransfer.getData("text"));
		} catch(err) {
			console.error(err);
		}
		addStep('filter', sourceData, field);
	};

	const onDragEnterTransform = (e) => {
		if (overTransformCou === 0) {
			setOverTransform(true);
		}
		setOverTransformCou(overTransformCou + 1);
	}

	const onDragLeaveTransform = (e) => {
		if (overTransformCou === 1) {
			setOverTransform(false);
		}
		setOverTransformCou(overTransformCou - 1);
	}

	const onDropTransform = (e) => {
		e.preventDefault();
		let field = null;
		try {
			field = JSON.parse(e.dataTransfer.getData("text"));
		} catch(err) {
			console.error(err);
		}
		addStep('transform', sourceData, field);
	};

	const onDragEnterBlock = (e) => {
		if (overBlockCou === 0) {
			setOverBlock(true);
		}
		setOverBlockCou(overBlockCou + 1);
	}

	const onDragLeaveBlock = (e) => {
		if (overBlockCou === 1) {
			setOverBlock(false);
		}
		setOverBlockCou(overBlockCou - 1);
	}

	const onDropBlock = (e) => {
		e.preventDefault();
		let field = null;
		try {
			field = JSON.parse(e.dataTransfer.getData("text"));
		} catch(err) {
			console.error(err);
		}
		addField({
			id: uuidv4(),
			sourceField: field.id,
			sourceType: field.dataType,
			dataType: field.dataType,
			name: field.name,
			desc: field.desc,
			isOpen: false,
			operation: 'empty',
			value: '',
			delimiter: '',
			refs: []
		});
	};

	if (! data) {
		return (
			<div className={styles.emptyContainer}>
				<div
					className={styles.addTransfrom}>
					<div className={styles.contentOutline}
						 style={overTransform ? overBoxStyle : {} }
						 onDragEnter={onDragEnterTransform}
						 onDragLeave={onDragLeaveTransform}
						 onDrop={onDropTransform}
						 onDragOver={onDragOver}>
						<div style={overTransform ? overTextStyle : {} }>Преобразование</div>
						<img src={icon}/>
					</div>
				</div>
				<div
					className={styles.addFilter}>
					<div className={styles.contentOutline}
						 style={overFilter ? overBoxStyle : {} }
						 onDragEnter={onDragEnterFilter}
						 onDragLeave={onDragLeaveFilter}
						 onDrop={onDropFilter}
						 onDragOver={onDragOver}>
						<div style={overFilter ? overTextStyle : {} }>Фильтрация</div>
						<img src={icon}/>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div
			className={styles.container}
			style={overBlock ? overBoxStyle : {} }
			onDragEnter={onDragEnterBlock}
			onDragLeave={onDragLeaveBlock}
			onDrop={onDropBlock}
			onDragOver={onDragOver}>
			<div className={styles.title}>Блок нового датасета
				<span>({data.type === 'filter' ? 'Фильтрация' : 'Преобразование'})</span>
			</div>
			<div className={styles.info}>
				<Input
					value={data.name}
					onChange={handleNameChange}
					size='default'
					type='text'
					placeholder={'укажите название нового датасета'}/>
			</div>
			<div>
				{data.type === 'filter' && (
					<table className={styles.table}>
						<thead>
						<tr>
							<th>
								<span>Название</span>
							</th>
							<th>
								<span>Тип данных</span>
							</th>
						</tr>
						</thead>
						<tbody>
						{data && data.fields.map((item, i) => {

							const getFilterContent = () => {
								return (
									<div className={styles.popup}>
										<label>
											Название поля
											<Input value={item.name} onChange={(e) => {
												updateField({
													...item,
													name: e.target.value
												});
											}}/>
										</label>
										{item.dataType !== 'bool_type' && (
											<label className={styles.operation}>
												Операция сравнения
												<Select className={styles.selectFilterOp} value={item.operation} size='small' onSelect={(value) => {
													updateField({
														...item,
														operation: value
													});
												}}>
													{filterOptions[item.dataType].map((item) => {
														return (
															<Option key={item.id} value={item.id}>{item.name}</Option>
														)
													})}
												</Select>
											</label>
										)}
										{item.dataType !== 'bool_type' && (
											<label className={styles.operation}>
												Значение
												<Input value={item.value} onChange={(e) => {
													updateField({
														...item,
														value: e.target.value
													});
												}}/>
											</label>
										)}
										{item.dataType === 'bool_type' && (
											<label className={styles.bool}>
												<span>Значение</span>
												<Radio.Group
													onChange={(e) => {
														updateField({
															...item,
															value: e.target.value
														});
													}}>
													<Radio value={true}>Да</Radio>
													<Radio value={false}>Нет</Radio>
												</Radio.Group>
											</label>
										)}
										<img
											src={closeIcon}
											className={styles.closePopup}
											onClick={() => {
												updateField({
													...item,
													isOpen: false
												})
											}}/>
									</div>
								);
							}

							return (
								<tr key={i} style={item.isFiltered ? {} : { display: 'none' }}>
									<td>
										<div className={styles.targetControls}>
											<span>{item.name}</span>
											<div className={styles.rightPartBlock}>
												<Popover
													visible={item.isOpen}
													placement='left'
													content={getFilterContent()}>
													<img
														className={styles.img}
														src={settingIcon}
														onClick={() => {
															updateField({
																...item,
																isOpen: true
															})
														}}/>
												</Popover>
											</div>
										</div>
									</td>
									<td>
										<span>{item.dataType}</span>
									</td>
								</tr>
							);
						})}
						</tbody>
					</table>
				)}
				{data.type === 'transform' && (
					<table className={styles.table}>
						<thead>
						<tr>
							<th>
								<span>Название</span>
							</th>
							<th>
								<span>Тип данных</span>
							</th>
						</tr>
						</thead>
						<tbody>
						{data && data.fields.map((item, i) => {

							const getPopupContent = () => {
								if (data.type === 'filter') {

								} else {
									if (item.operation === 'empty') {
										return (
											<div className={styles.popup}>
												<label>Выберите операцию преобразования</label>
												<img
													src={closeIcon}
													className={styles.closePopup}
													onClick={() => {
														updateField({
															...item,
															isOpen: false
														})
													}}/>
											</div>
										);
									}

									return (
										<div className={styles.popup}>
											<label>
												Название поля
												<Input value={item.name} onChange={(e) => {
													updateField({
														...item,
														name: e.target.value
													});
												}}/>
											</label>
											{['string-concat'].indexOf(item.operation) >= 0 && (
												<label>
													Разделитель
													<Input value={item.delimiter} onChange={(e) => {
														updateField({
															...item,
															delimiter: e.target.value
														});
													}}/>
												</label>
											)}
											{['int-sum', 'int-subtract', 'int-multiply', 'int-divide',
												'float-sum', 'float-subtract', 'float-multiply', 'float-divide'].indexOf(item.operation) >= 0 && (
												<label>
													Константа
													<Input value={item.value} onChange={(e) => {
														updateField({
															...item,
															value: e.target.value
														});
													}}/>
												</label>
											)}
											{['string-concat', 'int-sum', 'int-subtract', 'int-multiply', 'int-divide',
												'float-sum', 'float-subtract', 'float-multiply', 'float-divide'].indexOf(item.operation) >= 0 && item.refs.map((ref, i) => {
												return (
													<Select
														className={styles.marginTop}
														key={i}
														value={ref}
														onChange={(newValue) => {
															const refs = item.refs;
															if (item.refs.indexOf(newValue) >= 0) {
																updateField({
																	...item
																});
															}
															refs[i] = newValue;
															updateField({
																...item,
																refs: refs
															});
														}}>
														{data.prevTarget.fields.map((opt, j) => {
															if(opt.dataType !== item.dataType ){
																return;
															}
															if (item.sourceField === opt.id || (item.refs.indexOf(opt.id) >= 0) && opt.id !== ref) {
																return;
															}
															return (
																<Option key={j} value={opt.id}>{opt.name}</Option>
															)
														})}
													</Select>
												)
											})}
											{['string-concat', 'int-sum', 'int-subtract', 'int-multiply', 'int-divide',
												'float-sum', 'float-subtract', 'float-multiply', 'float-divide'].indexOf(item.operation) >= 0 && (
												<Button
													className={styles.marginTop}
													size='small'
													onClick={() => {
														item.refs.push('');
														updateField({
															...item,
															refs: item.refs
														});
													}}>Добавить поле</Button>
											)}
											<img
												src={closeIcon}
												className={styles.closePopup}
												onClick={() => {
													updateField({
														...item,
														isOpen: false
													})
												}}/>
										</div>
									);
								}
							}

							return (
								<tr key={i}>
									<td>
										<div className={styles.targetControls}>
											<span>{item.name}</span>
											<div className={styles.rightPartBlock}>
												<Select className={styles.select} value={item.operation} size='small' onSelect={(value) => {
													updateField({
														...item,
														operation: value,
														dataType: value === 'empty' ? item.sourceType : operations[value]['targetType']
													});
												}}>
													{getSelectOptions(item.sourceType).map((item) => {
														return (
															<Option key={item.id} value={item.id}>{item.name}</Option>
														)
													})}
												</Select>
												<Popover
													visible={item.isOpen}
													placement='left'
													content={getPopupContent()}>
													<img
														className={styles.img}
														src={settingIcon}
														onClick={() => {
															updateField({
																...item,
																isOpen: true
															})
														}}/>
												</Popover>
											</div>
										</div>
									</td>
									<td>
										<span>{item.dataType}</span>
									</td>
								</tr>
							);
						})}
						</tbody>
					</table>
				)}
			</div>
		</div>
	)
};

export default TargetView;