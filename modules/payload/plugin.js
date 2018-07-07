import axios from 'axios'

export default (ctx, inject) => {
  const payload = function payload() {
    let {res, route} = ctx
    if (process.server) {
      return Promise.resolve(res.payload)
    } else {
      return axios.get(route.fullPath).then(({data}) => data)
    }
  }
  inject('payload', payload)
}
