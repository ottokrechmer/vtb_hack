import React from "react";
import Loader from "../../../components/loader";
import styles from './sourceView.module.scss';

const SourceView = ({ data }) => {
	if (! data) {
		return <Loader statusText={'Выполняется загрузка'}/>;
	}

	const handleDragStart = (e, item) => {
		e.dataTransfer.setData('text', JSON.stringify(item));
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>Блок исходного датасета</div>
			<div className={styles.info}>{data.name || '-'}</div>
			<div>
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
						{data.fields.map((item, i) => {
							return (
								<tr key={i} draggable={true} onDragStart={(e) => {
									handleDragStart(e, item);
								}}>
									<td>
										<span>{item.name}</span>
									</td>
									<td>
										<span>{item.dataType}</span>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default SourceView;