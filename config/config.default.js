module.exports = {
  key: 'vuepress',
  title: 'Express NodeJS application server boilerplate with VueJS',
  route: {
    prefix: '',
    port: 8001,
  },
  server: {
    baseUrl: 'http://demo.gapper.in/sgodiva',
    login: '/oauth/client/gettoken',
    refreshToken: '/oauth/client/refreshtoken'
  },
  url: {
    dashboard: 'http://demo.gapper.in/dashboard',
    appCenter: 'http://demo.gapper.in/app-center',
    godivaServer: 'http://demo.gapper.in/sgodiva',
    logout: '/gateway/logout'
  }
}
