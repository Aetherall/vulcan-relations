import { addCallback } from 'meteor/vulcan:core';

// =============================================================
// -------------------- Relations Callbacks --------------------

// -------------------- Many ==> Many

// Adds Reference
export function addRefManyToMany(insertedItemRelationField, linkedItemRelationField, linkedCollection) {
	return function addRefManyToMany(item, currentUser) {
		if (!item[insertedItemRelationField]) {
			return;
		}
		linkedCollection._collection.update(
			{ _id: { $in: item[insertedItemRelationField] }, [linkedItemRelationField]: { $ne: item._id } },
			{ $push: { [linkedItemRelationField]: item._id } },
			{ multi: true },
		);
	};
}

// Removes Reference
export function removeRefManyToMany(removedItemRelationField, linkedItemRelationField, linkedCollection) {
	return function removeRefManyToMany(item, currentUser) {
		linkedCollection._collection.update(
			{ _id: { $nin: item[removedItemRelationField] }, [linkedItemRelationField]: item._id },
			{ $pull: { [linkedItemRelationField]: item._id } },
			{ multi: true },
		);
	};
}

// -------------------- One ==> Many

// Adds Reference
export function addRefOneToMany(insertedItemRelationField, linkedItemRelationField, linkedCollection) {
	return function addRefOneToMany(item, currentUser) {
		if (!item[insertedItemRelationField]) {
			return;
		}
		linkedCollection._collection.update(
			{ _id: item[insertedItemRelationField], [linkedItemRelationField]: { $ne: item._id } },
			{ $push: { [linkedItemRelationField]: item._id } },
			{ multi: true },
		);
	};
}

// Removes Reference
export function removeRefOneToMany(removedItemRelationField, linkedItemRelationField, linkedCollection) {
	return function removeRefOneToMany(item, currentUser) {
		if (!item[removedItemRelationField]) {
			return;
		}
		linkedCollection._collection.update(
			{ _id: item[removedItemRelationField], [linkedItemRelationField]: item._id },
			{ $pull: { [linkedItemRelationField]: item._id } },
			{ multi: true },
		);
	};
}

// -------------------- Many ==> One

// Adds Reference
export function addRefManyToOne(insertedItemRelationField, linkedItemRelationField, linkedCollection) {
	return function addRefManyToOne(item, currentUser) {
		if (!item[insertedItemRelationField]) {
			return;
		}
		linkedCollection._collection.update(
			{ _id: { $in: item[insertedItemRelationField] }, [linkedItemRelationField]: { $ne: item._id } },
			{ $set: { [linkedItemRelationField]: item._id } },
			{ multi: true },
		);
	};
}

// Removes Reference
export function removeRefManyToOne(removedItemRelationField, linkedItemRelationField, linkedCollection) {
	return function removeRefManyToOne(item, currentUser) {
		if (!item[removedItemRelationField]) {
			return;
		}
		linkedCollection._collection.update(
			{ _id: { $in: item[removedItemRelationField] }, [linkedItemRelationField]: item._id },
			{ $unset: { [linkedItemRelationField]: item._id } },
			{ multi: true },
		);
	};
}

// -------------------- One ==> One

// Adds Reference
export function addRefOneToOne(insertedItemRelationField, linkedItemRelationField, linkedCollection) {
	return function addRefOneToOne(item, currentUser) {
		if (!item[insertedItemRelationField]) {
			return;
		}
		linkedCollection._collection.update(
			{ _id: item[insertedItemRelationField], [linkedItemRelationField]: { $ne: item._id } },
			{ $set: { [linkedItemRelationField]: item._id } },
			{ multi: true },
		);
	};
}

// Removes Reference
export function removeRefOneToOne(insertedItemRelationField, linkedItemRelationField, linkedCollection) {
	return function removeRefOneToOne(item, currentUser) {
		if (!item[insertedItemRelationField]) {
			return;
		}
		linkedCollection._collection.update(
			{ _id: item[insertedItemRelationField], [linkedItemRelationField]: item._id },
			{ $unset: { [linkedItemRelationField]: item._id } },
			{ multi: true },
		);
	};
}

// =============================================================
// =============================================================

// =============================================================
// -------------------- Relations Callbacks --------------------

export function addCallbacksManyToMany(collectionPermissionName, linkedCollection, sourceRelationField, linkedRelationField) {
	addCallback(`${collectionPermissionName}.new.async`, addRefManyToMany(sourceRelationField, linkedRelationField, linkedCollection));
	addCallback(`${collectionPermissionName}.remove.async`, removeRefManyToMany(sourceRelationField, linkedRelationField, linkedCollection));
	addCallback(`${collectionPermissionName}.edit.async`, addRefManyToMany(sourceRelationField, linkedRelationField, linkedCollection));
	addCallback(`${collectionPermissionName}.edit.async`, removeRefManyToMany(sourceRelationField, linkedRelationField, linkedCollection));
}

export function addCallbacksOneToMany(collectionPermissionName, linkedCollection, sourceRelationField, linkedRelationField) {
	addCallback(`${collectionPermissionName}.new.async`, addRefOneToMany(sourceRelationField, linkedRelationField, linkedCollection));
	addCallback(`${collectionPermissionName}.remove.async`, removeRefOneToMany(sourceRelationField, linkedRelationField, linkedCollection));
	addCallback(`${collectionPermissionName}.edit.async`, addRefOneToMany(sourceRelationField, linkedRelationField, linkedCollection));
	addCallback(`${collectionPermissionName}.edit.async`, removeRefOneToMany(sourceRelationField, linkedRelationField, linkedCollection));
}

export function addCallbacksManyToOne(collectionPermissionName, linkedCollection, sourceRelationField, linkedRelationField) {
	addCallback(`${collectionPermissionName}.new.async`, addRefManyToOne(sourceRelationField, linkedRelationField, linkedCollection));
	addCallback(`${collectionPermissionName}.remove.async`, removeRefManyToOne(sourceRelationField, linkedRelationField, linkedCollection));
	addCallback(`${collectionPermissionName}.edit.async`, addRefManyToOne(sourceRelationField, linkedRelationField, linkedCollection));
	addCallback(`${collectionPermissionName}.edit.async`, removeRefManyToOne(sourceRelationField, linkedRelationField, linkedCollection));
}

export function addCallbacksOneToOne(collectionPermissionName, linkedCollection, sourceRelationField, linkedRelationField) {
	addCallback(`${collectionPermissionName}.new.async`, addRefOneToOne(sourceRelationField, linkedRelationField, linkedCollection));
	addCallback(`${collectionPermissionName}.remove.async`, removeRefOneToOne(sourceRelationField, linkedRelationField, linkedCollection));
	addCallback(`${collectionPermissionName}.edit.async`, addRefOneToOne(sourceRelationField, linkedRelationField, linkedCollection));
	addCallback(`${collectionPermissionName}.edit.async`, removeRefOneToOne(sourceRelationField, linkedRelationField, linkedCollection));
}
