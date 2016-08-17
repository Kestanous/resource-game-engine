Package.describe({
	name: "private:game-engine",
	summary: "game engine",
	version: "0.0.2"
});

Package.onUse(function (api) {
	api.use([
    "ecmascript",
    "modules",
    "reactive-var",
    "reactive-dict",
    'underscore'
  ], ["client", "server"]);
  
  api.mainModule("load.js");
});
