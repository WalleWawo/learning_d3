import Rest from './driver/rest'
const resource = 'field'

export default class Field {
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
      resource: `${resource}/value`,
      params
    }).then(r => r)
  }
  put ({ fields }) {
    return this.rest.put({
      resource: `${resource}/${fields.id}`,
      params: fields
    })
  }
}
