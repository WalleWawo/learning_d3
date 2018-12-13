import Rest from './driver/rest'
const resource = 'origin'

export default class Origin {
  constructor () {
    this.rest = new Rest({})
  }
  fetch (params) {
    return this.rest.fetch({
      resource,
      params
    }).then(r => r)
  }
}
