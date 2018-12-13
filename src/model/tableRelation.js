import Rest from './driver/rest'
const resource = 'tablerelation'

export default class TableRelation {
  constructor () {
    this.rest = new Rest({})
  }
  fetch (params) {
    return this.rest.fetch({
      resource,
      params
    }).then(r => r)
  }
  get (params) {
    return this.rest.get({
      resource: `${resource}/${params.id}`
    }).then(r => r)
  }
  post (params) {
    return this.rest.post({
      resource,
      params
    }).then(r => r)
  }
}
