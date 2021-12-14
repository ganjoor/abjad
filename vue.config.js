// module for create dinamically head tags like title & meta tags
module.exports = {
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        args[0].title = process.env.APP_TITLE;
        args[0].meta = {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'};
        return args
      })
  }
}