const data = {
	new: {
		name: '',
		source: null,
		steps: [
			{
				type: '',
				/* transform / filter */

				target: {
					id: '',
					name: '',
					fields: [{
						id: '',
						name: '',
						source_id: '',
						operations: [
							/* transform: add, subtract, multiply, divide - numbers */
							{
								id: '',
								constant: '',
								fields: [''] /* number field id */
							},
							/* transform: dates and times */
							{
								id: ''
							},
							/* transform: concatenate, split - strings */
							{
								id: '',
								delimiter: '',
								fields: [''] /* string field id */
							},
							/* cast from - to */
							{
								id: '',
								field: ''
							},
							/* filter: numbers, dates and times */
							{
								id: '',
								type: '',
								/* greater, greater or equal, equal, smaller or equal, smaller, between */
								refType: '',
								/* field or value */
								ref: '',
								/* some value of the same type or a ref to the field of the same type*/
							},
							/* filter: strings */
							{
								id: '',
								type: '',
								/* contains, equal, not contains, not equal */
								refType: '',
								/* field or value */
								ref: '',
								/* some value of the same type or a ref to the field of the same type*/
							},
							/* filter: boolean */
							{
								id: '',
								refType: '',
								/* field or value */
								ref: '',
								/* some value of the same type or a ref to the field of the same type*/
							},
						]

					}]
				}
		}]
	}
};

export default data;