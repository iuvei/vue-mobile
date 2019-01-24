const auxiliary = require('./auxiliary')
// const obj = {};
// Object.assign(obj, auxiliary);
const test = {
  install: Vue => {
    Vue.prototype.$auxiliary = auxiliary
  }
}
// export default test;
module.exports = test
