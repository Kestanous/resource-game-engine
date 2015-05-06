Package.describe({
	name: "private:game-engine",
	summary: "game engine",
	version: "0.0.2"
});

Package.onUse(function (api) {
	api.use([
    "coffeescript",
    "reactive-var",
    "reactive-dict",
    'underscore'
  ], ["client", "server"]);


  var files = ['module.coffee'], 
  _files = [
    'assignment',
    'cost',
    'modifier',
    'tick',
    'value',
    'unlock'
  ]

  for (var i = _files.length - 1; i >= 0; i--) {
    files.push('modules/' + _files[i] + '.coffee')
  };
  
  api.addFiles(files, ['client', 'server']);

  api.export(['Module', 'Modules', 'Unlock']);
});

Package.onTest(function (api) {
  api.use('sanjo:jasmine@0.12.7');
  api.use("coffeescript", ["client", "server"]);
  api.use('private:game-engine');
  var both = []
  api.addFiles(both, ["client", "server"]);
})