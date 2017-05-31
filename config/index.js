var path = require('path');
/**
 * 服务器server以及项目的公共配置
 */
module.exports = {
    publicPath: '/',    // 服务器部署路径

    staticPath: path.resolve(__dirname, '..', 'dist'),    // 导出地址

    rootPath: path.resolve(__dirname, '..'), // 项目根目录
    srcPath: path.resolve(__dirname, '..', 'src'),
    libPath: path.resolve(__dirname, '..', 'node_modules'),
};