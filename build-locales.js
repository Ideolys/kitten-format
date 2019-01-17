const fs   = require('fs');
const path = require('path');

/**
 * Scan a directory and all sub-directory
 * It does not return files and directories which start by a point. Example: .trash, .cache, .svn, ...
 * This function is synchrone
 *
 * @param {string} dir : path to the directory we want to scan
 * @param {string} extension (optional) : filter on file extension. Example: 'js' (without the point)
 * @return {array} Array of files name with their path : ['/path/to/file1.js', '/path/to/file2.js']
 */
function walkDirSync (dir, extension) {
  var _files = [];

  //if the path does not exist, return an empty table
  if (!fs.existsSync(dir)) {
    return _files;
  }

  //eliminate all files which start by a point.
  var _regExp = /^[^\.]/;

  if (extension instanceof RegExp) {
    _regExp = extension;
  }
  else if (extension) {
    //we must use new RegExp because extension is variable
    _regExp = new RegExp('^[^\.].+\.'+extension+'$');
  }

  walkDirRecursive(dir);
  //recursively called by himself until all sub-directories
  function walkDirRecursive(dir) {
    //read the directory
    var _list = fs.readdirSync(dir);

    for (var i = 0; i < _list.length; i++) {
      var _filename = path.join(dir, _list[i]);
      var _stat     = fs.statSync(_filename);
      var _baseName = path.basename(_filename); //get the base name in order to eliminate folder which starts by a point.

      if (_stat.isFile() && _regExp.test(_baseName)) {
        //if this is a file, push it in the table
        _files.push(_filename);
      }
      else if (_stat.isDirectory()) {
        //if this is a directory, call the function recursively
        walkDirRecursive(_filename);
      }
    }
  }
  return _files;
}


/**
 * Merge two objects
 * @param {Object} parent
 * @param {Object} child
 */
function merge (parent, child) {
  if (typeof parent !== 'object' || typeof child !== 'object') {
    return;
  }

  var _keys = Object.keys(child);
  for (var i = 0; i < _keys.length; i++) {
    var _key = _keys[i];
    if (parent[_key] && typeof child[_key] === 'object') {
      parent[_key] = merge(parent[_key], child[_key]);
    }
    else {
      parent[_key] = child[_key];
    }
  }

  return parent;
};

/**
 * Clone a value
 * @param {*} value
 */
function clone (value) {
  return JSON.parse(JSON.stringify(value));
}


const builtLocalesPath = path.join(__dirname, 'build', 'locales');
const localesPath      = path.join(__dirname, 'locales');
const locales          = walkDirSync(localesPath, 'json');
const builtLocales     = {};
const localesToExtend  = [];

for (var i = 0; i < locales.length; i++) {
  var _locale          = require(locales[i]);
  var _builtLocalePath = path.join(builtLocalesPath, _locale.locale + '.json');
  if (!_locale.extends) {
    fs.writeFileSync(_builtLocalePath, JSON.stringify(_locale));

    builtLocales[_locale.locale] = _locale;
    continue;
  }

  localesToExtend.push(_locale);
}

while (localesToExtend.length) {
  var _locale             = localesToExtend.shift();
  var _localeExtendedName = _locale.extends;

  if (!builtLocales[_localeExtendedName] && (!_locale.nbTries || _locale.nbTries < 10)) {
    if (!_locale.nbTries) {
      _locale.nbTries = 0;
    }
    _locale.nbTries++;
    localesToExtend.push(_locale);
    continue;
  }

  if (!builtLocales[_localeExtendedName] && _locale.nbTries >= 10) {
    console.log(`Error: Cannot extend locale "${ _localeExtendedName }" because it does not exist!`);
  }

  delete _locale.nbTries;
  var _builtLocale             = clone(builtLocales[_localeExtendedName]);
  var _extendedLocale          = merge(_builtLocale, _locale);
  var _builtLocalePath         = path.join(builtLocalesPath, _locale.locale + '.json');
  builtLocales[_locale.locale] = _extendedLocale;
  fs.writeFileSync(_builtLocalePath, JSON.stringify(_extendedLocale));
}
