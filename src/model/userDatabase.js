import Rest from './driver/rest'
const resource = 'userdatabase'

export default class UserDatabase {
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
      resource: `${resource}/${params.type}/${params.id}`
    }).then(r => r)
  }
  post (params) {
    switch (params.type) {
      case 'connect':
        return this.rest.post({
          resource: `${resource}/dbtables`,
          params: params.data
        }).then(r => r)
      case 'newFolder':
        return this.rest.post({
          resource: `${resource}/dict`,
          params: params.data
        }).then(r => r)
      case 'moveTable':
        return this.rest.post({
          resource: `${resource}/table/move`,
          params: params.data
        }).then(r => r)
      case 'addField':
        return this.rest.post({
          resource: `${resource}/table/column/${params.id}`,
          params: params.data
        }).then(r => r)
    }
  }
  put (params) {
    return this.rest.put({
      resource: `${resource}/dict/${params.id}`,
      params: params.data
    }).then(r => r)
  }
  delete ({ id }) {
    return this.rest.delete({
      resource: `${resource}/dict/${id}`
    })
  }
}
