const DatasetModel = {
	sourceFromApi: (rawData, id) => {
		const result = {};
		result.id = id;
		result.name = rawData.name;
		result.owner = rawData.owner && `${rawData.owner.first_name} ${rawData.owner.last_name}`;
		result.price = rawData.price;
		result.description = rawData.description;
		result.isPurchased = rawData.is_purchased;
		result.isMine = rawData.is_mine;
		result.fields = [];
		if (rawData.meta_data && rawData.meta_data.length) {
			result.fields = rawData.meta_data.map((item) => {
				return {
					id: item.id,
					dataType: item.data_type,
					name: item.field_name,
					desc: item.description,
					isFiltered: false
				}
			})
		}
		return result;
	},
	featureToApi: (rawData) => {
		const result = {};
		result.name = rawData.steps[rawData.steps.length - 1].name || rawData.source.name;
		result.source = rawData.source.id;
		result.steps = rawData.steps.map((item) => {
			const newItem = {
				type: item.type,
				name: item.name,
				fields: item.fields.map((field) => {
					return {
						name: field.name,
						source_id: rawData.source.id,
						operations: field.operation,
						constant: field.value,
						delimiter: field.delimiter,
						fields: field.refs
					};
				})
			};
			if (item.type === 'filter') {
				newItem.fields = item.fields.filter((pos) => {
					return pos.isFiltered;
				}).map((pos) => {
					return {
						id: pos.id,
						type: pos.operation,
						refType: 'value',
						ref: pos.value
					};
				});
			}
			return newItem;
		});
		return {
			name: result.name,
			description: result.source,
			json_field: result
		};
	},
	metadataToApi: (rawData) => {
		return {
			field_name: rawData.name,
			description: rawData.desc,
			data_type: rawData.dataType,
			data_set: rawData.data_set,
		};
	},
};

export default DatasetModel;