import React, {useCallback, useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import styles from './constructor.module.scss';
import SourceView from "./sourceView";
import TargetView from "./targetView";
import {fetchDataset, fetchPostFeature, fetchSchema} from "../../services/dataset";
import {Button, Pagination} from "antd";
import { v4 as uuidv4 } from 'uuid';
import cloneDeep from 'lodash/cloneDeep';
import Loader from "../../components/loader";

const initialData = {
	source: null,
	steps: [],
	currentStep: 0,
}

const ConstructorPage = () => {
	const { urn, id } = useParams();
	const [data, setData] = useState(initialData);
	const [isSaving, setIsSaving] = useState(false);

	useEffect(() => {
		switch (id) {
			case 'new':
				break;
			default:
				fetchSchema(id).then((jsonResp) => {
					setData((currentData) => {
						const newData = cloneDeep(currentData);
						newData.steps = jsonResp.steps;
						return newData;
					});
				});
				// fetch backend
		}
	}, [id]);

	const addStep = useCallback((type) => {
		setData((currentValue) => {
			const newValue = cloneDeep(currentValue);
			const currentTarget = newValue.steps[newValue.currentStep];
			if (currentTarget.hasChild) {
				return;
			}
			currentTarget.hasChild = true;
			const newItem = {
				id: uuidv4(),
				type: type,
				name: '',
				hasChild: false,
				prevTarget: currentTarget,
				fields: []
			};
			if (type === 'filter') {
				newItem.fields = currentTarget.fields.map((pos) => {
					return {
						...pos,
						isFiltered: false
					};
				});
			}
			newValue.steps.push(newItem);
			return newValue;
		});
	}, []);

	const addStepWithField = useCallback((type, prevTarget, field) => {
		setData((currentValue) => {
			const newValue = cloneDeep(currentValue);
			const newItem = {
				id: uuidv4(),
				type: type,
				name: '',
				hasChild: false,
				prevTarget: prevTarget,
				fields: []
			};
			newItem.fields.push({
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
			if (type === 'filter') {
				newItem.fields = prevTarget.fields.map((prev) => {
					if (prev.id === field.id) {
						prev.isFiltered = true;
					}
					return prev;
				});
			}
			newValue.steps.push(newItem);
			return newValue;
		});
	}, []);

	const addField = useCallback((newField) => {
		setData((currentValue) => {
			const newValue = cloneDeep(currentValue);
			const target = newValue.steps[newValue.currentStep];
			if (! target) {
				console.error('Cant find target with id ', newValue.currentStep);
				return;
			}
			if(target.type === 'filter') {
				target.fields = target.fields.map((item) => {
					if (item.id === newField.sourceField) {
						item.isFiltered = true;
					}
					return item;
				});
				return newValue;
			}
			const exist = target.fields.find((item) => {
				return item.sourceField === newField.sourceField;
			});
			if (exist) {
				return newValue;
			}
			target.fields.push(newField);
			return newValue;
		});
	});

	const updateField = useCallback((newField) => {
		setData((currentValue) => {
			const newValue = cloneDeep(currentValue);
			const target = newValue.steps[newValue.currentStep];
			if (!target) {
				console.error('Cant find target with id ', newValue.currentStep);
				return;
			}
			target.fields = target.fields.map((item) => {
				return item.id === newField.id ? newField : item;
			});
			return newValue;
		});
	}, []);

	const updateName = useCallback((newName, targetId) => {
		setData((currentValue) => {
			const newValue = cloneDeep(currentValue);
			const target = newValue.steps[newValue.currentStep];
			if (! target) {
				console.error('Cant find target with id ', newValue.currentStep);
				return;
			}
			target.name = newName;
			return newValue;
		})
	}, [])

	useEffect(() => {
		fetchDataset(urn).then((datasetData) => {
			setData((currentData) => {
				return {
					...currentData,
					source: datasetData
				}
			})
		});
	}, [urn]);

	if (isSaving) {
		return (
			<div className={styles.wrapper}>
				<Loader statusText={'Выполняется сохранение'}/>
			</div>
		)
	}
console.log(data);
	return (
		<div className={styles.wrapper}>
			<div className={styles.sourceContainer}>
				<SourceView data={(data.steps.length > 0 && data.steps[data.currentStep].prevTarget) || data.source}/>
			</div>
			<div className={styles.targetContainer}>
				<TargetView
					data={data.steps[data.currentStep]}
					sourceData={data.source}
					addField={addField}
					addStep={addStepWithField}
					updateField={updateField}
					updateName={updateName}/>
			</div>
			{data.steps.length > 0 && (
				<div className={styles.pagination}>
					<Pagination
						current={data.currentStep + 1}
						pageSize={1}
						total={data.steps.length}
						onChange={(page) => {
							console.log('page ', page);
							setData((currentValue) => {
								const newValue = cloneDeep(currentValue);
								newValue.currentStep = page - 1;
								return newValue;
							});
						}}/>
					{! data.steps[data.currentStep].hasChild && (
						<Button
							className={styles.create}
							onClick={() => {
								addStep('transform');
							}}>
							Добавить трансформацию
						</Button>
					)}
					{! data.steps[data.currentStep].hasChild && (
						<Button
							className={styles.create}
							onClick={() => {
								addStep('filter');
							}}>
							Добавить фильтрацию
						</Button>
					)}
				</div>
			)}
			<div className={styles.saveBtn}>
				<Button className={styles.saveBtnText} onClick={() => {
					const dataToSend = cloneDeep(data);
					setIsSaving(true);
					fetchPostFeature(dataToSend).then((result) => {
						setIsSaving(false);
					});
				}}>
					Сохранить
				</Button>
			</div>
		</div>
	);
};

export default ConstructorPage;