

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.CqY4Xw8B.js","_app/immutable/chunks/DjsGvKS-.js","_app/immutable/chunks/Bavb-k3x.js"];
export const stylesheets = ["_app/immutable/assets/0.ZJyceiLY.css"];
export const fonts = [];
