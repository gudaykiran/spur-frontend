export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.BfUohq5X.js",app:"_app/immutable/entry/app.BIVeKbMR.js",imports:["_app/immutable/entry/start.BfUohq5X.js","_app/immutable/chunks/Bok4DRZk.js","_app/immutable/chunks/DjsGvKS-.js","_app/immutable/entry/app.BIVeKbMR.js","_app/immutable/chunks/DjsGvKS-.js","_app/immutable/chunks/Bavb-k3x.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
