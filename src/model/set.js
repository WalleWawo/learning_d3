import Rest from './driver/rest'
const resource = 'set'

export default class Set {
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
  patch (params) {
    return this.rest.patch({
      resource: `${resource}/${params.id}`,
      params: {
        weight: params.weight
      }
    }).then(r => r)
  }
  post ({ set }) {
    return this.rest.post({
      resource,
      params: set
    }).then(r => r)
  }
  put ({ set }) {
    return this.rest.put({
      resource: `${resource}/${set.id}`,
      params: set
    })
  }
  delete ({ id }) {
    return this.rest.delete({
      resource: `${resource}/${id}`
    })
  }
}
