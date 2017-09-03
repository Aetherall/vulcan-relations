import { addCallbacksManyToMany, addCallbacksManyToOne, addCallbacksOneToMany, addCallbacksOneToOne } from './callbacks';
import { addFieldMany, addFieldOne } from './fields';

export function addRelationManyToMany(sourceCollection, targetCollection, options) {
	const sourceOptions = options.source;
	const targetOptions = options.target;
	if (sourceOptions.addField !== false) {
		addFieldMany(sourceCollection, targetCollection, sourceOptions.fieldName, sourceOptions.fieldOptions);
	}
	if (sourceOptions.addCallbacks !== false) {
		addCallbacksManyToMany(sourceOptions.permissionName, targetCollection, sourceOptions.fieldName, sourceOptions.fieldOptions);
	}
	if (targetOptions.addField !== false) {
		addFieldMany(targetCollection, sourceCollection, targetOptions.fieldName, targetOptions.fieldOptions);
	}
	if (targetOptions.addCallbacks !== false) {
		addCallbacksManyToMany(targetOptions.permissionName, sourceCollection, targetOptions.fieldName, targetOptions.fieldOptions);
	}
}

export function addRelationOneToMany(sourceCollection, targetCollection, options) {
	const sourceOptions = options.source;
	const targetOptions = options.target;
	if (sourceOptions.addField !== false) {
		addFieldOne(sourceCollection, targetCollection, sourceOptions.fieldName, sourceOptions.fieldOptions);
	}
	if (sourceOptions.addCallbacks !== false) {
		addCallbacksOneToMany(sourceOptions.permissionName, targetCollection, sourceOptions.fieldName, sourceOptions.fieldOptions);
	}
	if (targetOptions.addField !== false) {
		addFieldMany(targetCollection, sourceCollection, targetOptions.fieldName, targetOptions.fieldOptions);
	}
	if (targetOptions.addCallbacks !== false) {
		addCallbacksManyToOne(targetOptions.permissionName, sourceCollection, targetOptions.fieldName, targetOptions.fieldOptions);
	}
}

export function addRelationManyToOne(sourceCollection, targetCollection, options) {
	const sourceOptions = options.source;
	const targetOptions = options.target;
	if (sourceOptions.addField !== false) {
		addFieldMany(sourceCollection, targetCollection, sourceOptions.fieldName, sourceOptions.fieldOptions);
	}
	if (sourceOptions.addCallbacks !== false) {
		addCallbacksManyToOne(sourceOptions.permissionName, targetCollection, sourceOptions.fieldName, sourceOptions.fieldOptions);
	}
	if (targetOptions.addField !== false) {
		addFieldOne(targetCollection, sourceCollection, targetOptions.fieldName, targetOptions.fieldOptions);
	}
	if (targetOptions.addCallbacks !== false) {
		addCallbacksOneToMany(targetOptions.permissionName, sourceCollection, targetOptions.fieldName, targetOptions.fieldOptions);
	}
}

export function addRelationOneToOne(sourceCollection, targetCollection, options) {
	const sourceOptions = options.source;
	const targetOptions = options.target;
	if (sourceOptions.addField !== false) {
		addFieldOne(sourceCollection, targetCollection, sourceOptions.fieldName, sourceOptions.fieldOptions);
	}
	if (sourceOptions.addCallbacks !== false) {
		addCallbacksOneToOne(sourceOptions.permissionName, targetCollection, sourceOptions.fieldName, sourceOptions.fieldOptions);
	}
	if (targetOptions.addField !== false) {
		addFieldOne(targetCollection, sourceCollection, targetOptions.fieldName, targetOptions.fieldOptions);
	}
	if (targetOptions.addCallbacks !== false) {
		addCallbacksOneToOne(targetOptions.permissionName, sourceCollection, targetOptions.fieldName, targetOptions.fieldOptions);
	}
}
