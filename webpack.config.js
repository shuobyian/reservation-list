const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAsset = require('add-asset-html-webpack-plugin');

module.exports = {
    entry: [
        "./src/index.js",
        "./src/bottom_sheet/index.js"
    ],

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new AddAsset({ filepath: './src/style.css' })
    ],

    devServer: {
        contentBase: __dirname + "/src", //브라우저에 제공할 정적파일들이 담긴 경로
        inline: true,
        hot: true,
        host: 'localhost',
        compress: true, //모든 항목에 대해 gzip을 사용할 것인가.
        port: 9000
    },

}
