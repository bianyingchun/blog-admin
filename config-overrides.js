// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// const smp = new SpeedMeasurePlugin();
var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const {
    override,
    fixBabelImports,
    addLessLoader,
    addWebpackModuleRule,
    addWebpackExternals,
} = require("customize-cra");

// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

process.env.GENERATE_SOURCEMAP = false

const addHardSource = () => (config) => {
    config.plugins.push(new HardSourceWebpackPlugin())
    return config
}
const addCompression = () => config => {

    config.plugins.push(
        // gzip压缩
        new CompressionWebpackPlugin({
            test: /\.(css|js)$/,
            // 只处理比1kb大的资源
            threshold: 1024,
            // 只处理压缩率低于90%的文件
            minRatio: 0.9
        })
    );

    return config;
};
// 查看打包后各包大小
// const addAnalyzer = () => config => {
//     if (process.env.ANALYZER) {
//         config.plugins.push(new BundleAnalyzerPlugin());
//     }

//     return config;
// };
// 速度测量
// const addSpeedMesure = () => config => {
//     return smp.wrap(config)
// }
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addWebpackModuleRule({
        test: "/\.(jsx|tsx)?$/",
        use: ['cache-loader', 'babel-loader']
    }),
    addWebpackExternals({
        // 'react': 'react',
        'axios': 'axios',
        'moment': 'moment'
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#1DA57A' },
    }),
    addCompression(),
    addHardSource(),
    // addAnalyzer(),

    config => {
        config.optimization.splitChunks = {
            chunks: 'all',
            name: "vender",
            cacheGroups: {
                vender: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    priority: 10,
                    enforce: true
                },
                react: {
                    name: "react",
                    test: (module) => /react|redux/.test(module.context),
                    chunks: "initial",
                    priority: 11,
                    enforce: true
                },
                antd: {
                    name: "antd",
                    test: (module) => {
                        return /ant/.test(module.context);
                    },
                    chunks: "initial",
                    priority: 11,
                    enforce: true
                },
                moment: {
                    name: "moment",
                    test: (module) => {
                        return /moment/.test(module.context);
                    },
                    chunks: "initial",
                    priority: 13,
                    enforce: true
                },
                common: {
                    //公共模块
                    chunks: 'initial',
                    name: 'common',
                    test: /[\\/]common[\\/]/,
                    priority: 12,
                    minSize: 100, //大小超过100个字节
                    minChunks: 3 //最少引入了3次
                }
            }
        }
        return config
    },
    // addSpeedMesure(),
);
