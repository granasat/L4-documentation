module.exports = function (context, options) {
    return {
      name: 'pdf-plugin',
      configureWebpack(config, isServer, utils) {
        const {getJSLoader} = utils;
        return {
          module: {
            rules: [
              {
                test: /\.(sass|less|css)$/,
                loaders: ['style-loader', 'css-loader', 'less-loader']
              },
            ],
          },
        };
      },
    };
  };