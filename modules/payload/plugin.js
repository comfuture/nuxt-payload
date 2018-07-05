import axios from 'axios'

export default ({res}, inject) => {
  const payload = function payload(path = null) {
    // XXX: can not get current route within this scope
    if (process.server) {
      return Promise.resolve(res.payload)
    } else {
      return axios.get(path).then(({data}) => data)
    }
  }
  inject('payload', payload)
}
