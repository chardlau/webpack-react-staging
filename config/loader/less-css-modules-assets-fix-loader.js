module.exports = function (content) {
  return content.replace(/url\(('|")*(\.\/)*(.+?)('|")*\)/g, 'url(./$3)').replace(/\.\/((https?|ftp):\/\/)/, '$1');
};
