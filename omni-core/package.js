Package.describe({
	name: 'omni:core',
});

Package.onUse(function(api) {
	api.use(['vulcan:core', 'vulcan:accounts']);

	api.mainModule('lib/server/main.js', 'server');
	api.mainModule('lib/client/main.js', 'client');
});
