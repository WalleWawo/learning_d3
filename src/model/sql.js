import Rest from './driver/rest'
const resource = 'sql'

export default class Sql {
  constructor () {
    this.rest = new Rest({})
  }
  post (params) {
    return this.rest.post({
      resource,
      params: params.config
    }).then(r => r)
  }
}
