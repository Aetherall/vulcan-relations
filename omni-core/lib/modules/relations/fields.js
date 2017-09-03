export function addFieldMany(collection, targetCollection, fieldName, fieldoptions) {
	collection.addField({
		fieldName: `${fieldName}Ids`,
		fieldSchema: {
			type: Array,
			...fieldoptions,
			resolveAs: {
				fieldName,
				type: `[${targetCollection.options.typeName}]`,
				resolver: (item, args, context) => {
					return context[targetCollection].loader.loadMany(item[`${fieldName}Ids`]);
				},
				addOriginalField: true,
			},
		},
	});
	collection.addField({
		fieldName: `${fieldName}Ids.$`,
		fieldSchema: {
			type: String,
		},
	});
}

export function addFieldOne(collection, targetCollection, fieldName, fieldoptions) {
	collection.addField({
		fieldName: `${fieldName}Id`,
		fieldSchema: {
			type: String,
			...fieldoptions,
			resolveAs: {
				fieldName,
				type: targetCollection.options.typeName,
				resolver: (item, args, context) => {
					return context[targetCollection].loader.load(item[`${fieldName}Id`]);
				},
				addOriginalField: true,
			},
		},
	});
}
