const fs     = require('fs');
const path   = require('path');
const rollup = require('rollup');
const terser = require('rollup-plugin-terser');

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


const builtLocalesPath = path.join(__dirname, 'build', 'locales');
const localesPath      = path.join(__dirname, 'locales');
const locales          = walkDirSync(localesPath, 'js');

/**
 * Build
 * @param {String} input file to process
 * @param {String} outputFile where to write ouput
 * @param {String} locale  file name
 */
async function build(input, outputFile, locale) {
  // create a bundle
  const bundle = await rollup.rollup({
    input,
    plugins : [
      terser.terser()
    ],
    external : 'kitten-format'
  });

  const outputOptions = {
    file    : outputFile,
    format  : 'umd',
    name    : 'kittenFormat_' + locale.toLowerCase(),
    globals : {
      'kitten-format' : 'kittenFormat'
    }
  }
  // generate code
  await bundle.generate(outputOptions);

  // or write the bundle to disk
  await bundle.write(outputOptions);
}

for (var i = 0; i < locales.length; i++) {
  if (/_default/.test(locales[i])) {
    continue;
  }

  var _locale = path.basename(locales[i], '.js');
  build(locales[i], path.join(builtLocalesPath, _locale + '.js'), _locale.replace('-', '_'));
}
