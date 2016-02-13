Package.describe({
	name: "private:game-engine",
	summary: "game engine",
	version: "0.0.2"
});

Package.onUse(function (api) {
	api.use([
    "ecmascript",
    "coffeescript",
    "reactive-var",
    "reactive-dict",
    'underscore'
  ], ["client", "server"]);


  var files = ['mixins.js'], 
  _files = [
    // 'assignment',
    'cost',
    'buckets',
    // 'tick',
    'value',
    'modifier'
  ]

  for (var i = _files.length - 1; i >= 0; i--) {
    files.push('modules/' + _files[i] + '.js')
  };
  
  api.addFiles(files);

  api.export(['Mixins']);
});

Package.onTest(function (api) {
  api.use('sanjo:jasmine@0.12.7');
  api.use("coffeescript", ["client", "server"]);
  api.use('private:game-engine');
  var both = []
  api.addFiles(both, ["client", "server"]);
})