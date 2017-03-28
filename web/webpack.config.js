const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const aotLoader = require('@ultimate/aot-loader');

const {
  ContextReplacementPlugin,
  NoEmitOnErrorsPlugin,
  LoaderOptionsPlugin,
  DefinePlugin,
  optimize,
} = require('webpack');

const {
  AggressiveMergingPlugin,
  CommonsChunkPlugin,
  UglifyJsPlugin,
} = optimize;

const { join } = require('path');
const pathTo = rel => join(process.cwd(), rel);
const isProd = env => env === 'production' || env === 'ghpages';
const publicPath = env => env === 'ghpages' ? '/angular2/' : '/';

const { version } = require('./package.json');
const staticDir = pathTo('./dist');

const babelConfig = {
  presets: [
    [ 'env', {
      'targets': {
        'browsers': [
          'last 4 versions',
          'ie >= 7'
        ],
        'node': [
          6,
          7,
          'current'
        ]
      }
    } ],
    'stage-0',
  ],
  plugins: [
    'add-module-exports',
    'syntax-dynamic-import',
    'transform-class-properties',
    'transform-decorators-legacy',
  ],
};

const springBoot = pathTo('../spring-boot');
const include = pathTo('./src');
const includes = [
  include,
  pathTo('./node_modules/normalize.css/'),
  pathTo('./node_modules/font-awesome/'),
  pathTo('./node_modules/primeng/resources/'),
  pathTo('./node_modules/angular/'),
  pathTo('./node_modules/bootstrap/'),
  pathTo('./node_modules/bootswatch/'),
  pathTo('./node_modules/semantic-ui-css/'),
];

const resources = pathTo('./src/resources');
const exclude = /\/(node_modules|bower_components)\//i;
const fonts = /\.(otf|eot|woff2?|ttf)$/i;
const images = /\.(raw|gif|png|jpe?g|svg|ico)$/i;

const vendorsFileLoader = {
  loader: 'file-loader',
  options: {
    name: 'vendors/[1]?v=' + version,
    regExp: /\/node_modules\/(.*)/,
  },
};

const assetsFileLoader = {
  loader: 'file-loader',
  options: {
    name: '[path]/[name].[hash].[ext]?v=' + version,
    hash: 'sha512',
    digest: 'hex',
  },
};

const imageWebpackLoader = {
  loader: 'image-webpack-loader',
  options: {
    bypassOnDebug: true,
    optimizationLevel: 7,
    interlaced: false,
  },
};

const use = env => [
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      minimize: isProd(env),
      sourceMap: !isProd(env),
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: isProd(env) ? false : 'inline',
      plugins: () => [
        require('precss'),
        require('rucksack-css')({
          fallbacks: true,
          autoprefixer: {
            browsers: [
              'last 4 versions',
            ],
          },
        }),
      ],
    },
  },
];

const styleLoader = (id, env, options = {}) => ExtractTextWebpackPlugin.extract({
  publicPath: publicPath(env),
  fallback: 'style-loader',
  use: id === 'css' ? use(env) : [
    ...use(env),
    {
      loader: id + '-loader',
      options,
    },
  ],
});

module.exports = env => ({

  context: pathTo('.'),

  entry: {
    polyfills: './src/polyfills.ts',
    vendors: './src/vendors.ts',
    app: './src/main.ts',
  },

  output: {
    path: staticDir,
    jsonpFunction: 'w',
    publicPath: publicPath(env),
    filename: '[name].js?v=' + version,
    chunkFilename: '[id].chunk.js?v=' + version,
  },

  module: {
    rules: [

      isProd(env) ? undefined : {
        enforce: 'pre',
        test: /\.ts$/i,
        include,
        loader: 'source-map-loader',
      },

      {
        test: /\.ts$/i,
        include,
        loaders: isProd(env) ? [
            '@ultimate/aot-loader',
          ] : [
            'awesome-typescript-loader',
            'angular2-template-loader',
            'angular2-router-loader',
          ],
      },
      {
        test: /\.js$/i,
        include,
        loader: 'babel-loader',
        options: babelConfig,
      },

      {
        test: /\.html$/i,
        include,
        loader: 'raw-loader',
      },
      {
        test: /\.(java|scala|groovy|kt)$/i,
        include: springBoot,
        loader: 'raw-loader',
      },

      {
        test: /\.css$/i,
        // include: includes,
        use: styleLoader('css', env),
      },
      /*// I don;t know why, but less not works: `Module not found: Error: Can't resolve 'less-loader'`
      {
        test: /\.less$/i,
        include: includes,
        use: styleLoader('less', env, {
          strictMath: true,
          noIeCompat: true,
        }),
      },
      */
      {
        test: /\.s(a|c)ss$/i,
        include: includes,
        use: styleLoader('sass', env),
      },
      {
        test: /\.styl$/i,
        include: includes,
        use: styleLoader('stylus', env),
      },

      {
        test: fonts,
        include: exclude,
        use: vendorsFileLoader,
      },
      {
        test: fonts,
        exclude,
        use: assetsFileLoader,
      },
      {
        test: images,
        include: exclude,
        loaders: [
          vendorsFileLoader,
          imageWebpackLoader,
        ],
      },
      {
        test: images,
        include,
        loaders: [
          assetsFileLoader,
          imageWebpackLoader,
        ],
      },

    ].filter(rule => !!rule),

    noParse: [
      /.+zone\.js\/dist\/.+/,
      /.+angular2\/bundles\/.+/,
    ],
  },

  resolve: {
    modules: [
      './src',
      'node_modules',
    ],
    extensions: [
      '.ts',
      '.js',
      '.css',
      '.less',
      '.sass',
      '.scss',
      '.styl',
      '.java',
      '.scala',
      '.groovy',
      '.kt',
    ],
  },

  plugins: [

    new ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      pathTo('./src'), // base location of code sources
      {} // a map of your routes
    ),

    new NoEmitOnErrorsPlugin(),

    new DefinePlugin({
      IS_PRODUCTION: isProd(env),
      'process.env': {
        NODE_ENV: JSON.stringify(isProd(env) ? 'production' : 'development'),
      },
    }),

    new CommonsChunkPlugin({
      // order does matters!
      names: [
        'app',
        'vendors',
        'polyfills',
        'manifest',
      ],
    }),

    new ExtractTextWebpackPlugin({
      filename: '[name].css?v=' + version,
      disable: false,
      allChunks: true,
      publicPath: publicPath(env),
    }),

    new BaseHrefWebpackPlugin({ baseHref: publicPath(env), }),

    new HtmlWebpackPlugin({
      chunks: 'all',
      favicon: './src/favicon.ico',
      template: './src/index.html',
      minify: isProd(env) ? {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
      } : false,
    }),

    new LoaderOptionsPlugin({
      minimize: isProd(env),
      debug: !isProd(env),
    }),

    isProd(env) ? new AggressiveMergingPlugin() : undefined,

    isProd(env) ? new aotLoader.AotPlugin({
      tsConfig: './src/tsconfig.app.json',
      entryModule: './app/app.module#AppModule',
    }) : undefined,

    isProd(env) ? new UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true,
      },
      compress: {
        warnings: false,
        screw_ie8: true,
      },
      comments: false,
    }) : undefined,

    isProd(env) ? new CompressionWebpackPlugin({
      asset: '[path].gz?[query]',
      algorithm: 'gzip', // zlib, zopfli, function(buf, callback)
    }) : undefined,

    isProd(env) ? new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }) : undefined,

  ].filter(plugin => !!plugin),

  devtool: isProd(env) ? 'cheap-module-source-map' : 'inline',

  devServer: {
    port: 8000,
    stats: 'minimal',
    contentBase: './src',
    inline: !isProd(env),
    compress: isProd(env),
    historyApiFallback: {
      index: publicPath(env),
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        secure: false,
      },
    },
  },

  watchOptions: {
    ignored: [
      exclude,
      '**/*.js',
    ],
    poll: 1000,
    aggregateTimeout: 300,
  },

  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    global: true,
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false,
  },

  profile: 'web',
  bail: true,
});
