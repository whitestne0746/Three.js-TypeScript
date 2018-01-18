module.exports = {
  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: './src/sub.ts',
  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/build`,
    // 出力ファイル名
    filename: 'bundle_sub.js'
  },
  module: {
    rules: [{
        // 拡張子 .ts の場合
        test: /\.ts$/,
        // TypeScript をコンパイルする
        use: 'awesome-typescript-loader'
      },
      // ソースマップファイルの処理
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },
  // import 文で .ts ファイルを解決するため
  resolve: {
    extensions: [
      '.ts', '.js', '.json'
    ],
  },
  // ソースマップを有効に
  devtool: 'source-map'
};