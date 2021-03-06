const merge = require('webpack-merge');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const common = require('./webpack.common.js');
const basePath = 'src/components';
const fs = require('fs');
var srcDir = path.resolve(process.cwd(), 'src');
const resolve = dir => path.resolve(__dirname, dir);
var glob = require('glob');
var entries= function () {
    var jsDir = path.resolve(srcDir, 'components')
    var entryFiles = glob.sync(jsDir + '/*.{js,jsx}')
    var map = {};

    for (var i = 0; i < entryFiles.length; i++) {
        var filePath = entryFiles[i];
        var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        map[filename] = filePath;
    }
    return map;
}
//  获取入口
const getEntry = (componentsPath) => {
  const componentsDir = fs.readdirSync(resolve(componentsPath));
  const files = {};
  // 递归遍历
  const getFiles = (dirs, currentPath, currentDir) => {
    dirs.forEach((item) => {
      const statPath = resolve(`${currentPath}/${item}`);
      const fsStat = fs.statSync(statPath);
      if (fsStat.isDirectory(item)) {
        const newDirs = fs.readdirSync(statPath);
        getFiles(newDirs, statPath, currentDir ? `${currentDir}\\${item}` : item);
      } else if (item.match(/\.js[x]?$/g)) {
        const newItem = item.replace(/\.js[x]?$/, '');
        if (currentDir) {
          files[`${currentDir}\\${newItem}`] = resolve(`${currentPath}/${item}`);
        } else {
          files[newItem] = resolve(`${currentPath}/${item}`);
        }
      }
    });
  };
  getFiles(componentsDir, componentsPath);
  return files;
};
console.log(entries, getEntry);
module.exports = merge(common, {
  mode: 'production',
   entry: {...getEntry(basePath)},
  // entry: entries(),
  output: {
    path: path.join(__dirname, 'lib'),
    filename: '[name].js',
    libraryTarget: 'umd', //发布组件专用
    library: 'componentLibrary',
  },
  devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
    }),
    new CleanWebpackPlugin(),
  ],
});
