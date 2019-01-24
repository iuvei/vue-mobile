/* eslint-disable */
import pako from 'pako'

export function getCompressData (data) {
  let binaryString
  let forIn = function (obj, handler) {
    for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
        handler(i, obj[i])
      }
    }
  }
  let each = function (arr, handler) {
    let len = arr.length
    for (let i = 0; i < len; i += 1) {
      handler(i, arr[i])
    }
  }
  if (!JSON) {
    JSON = {}
  }
  if (!JSON.parse) {
    JSON.parse = function (json) {
      return eval('1,' + json)
    }
  }
  if (!JSON.stringify) {
    (function (JSON) {
      let arr = '[object Array]',
          obj = '[object Object]'

      JSON.stringify = function(json) {
        let t = ''
        let m = Object.prototype.toString.call(json)
        if (m == arr) {
          t = ArrPartten(json)
        } else if (m == obj) {
          t = ObjectJson(json)
        } else {
          t = json
        }
        return t
      }

      function ObjectParse() {
        let t = '{'
        forIn(json, function(i, ele) {
          let m = Object.prototype.toString.call(ele)
          if (m == arr) {
            t += i + ':' + ArrPartten(ele) + ','
          } else if (m == obj) {
            t += i + ':' + ObjectJson(ele) + ','
          } else {
            t += i + ':' + ele + ','
          }
        })
        if (t.length != 1) {
          t = t.substring(0, t.length - 1)
        }
        return t + '}'
    }

    function ArrayParse() {
        let t = '['
        each(json, function(i, ele) {
          let m = Object.prototype.toString.call(ele)
            if (m == arr) {
                t += ArrPartten(ele) + ','
            } else if (m == obj) {
                t += ObjectJson(ele) + ','
            } else {
                t += ele + ','
            }
        })
        if (json.length > 0) {
            t = t.substring(0, t.length - 1)
        }
        return t + ']'
    }
  }(JSON))
  }
  //压缩动作 3次
  // alert(JSON.stringify(data))
  binaryString = pako.deflate(JSON.stringify(data), {
    to: 'string'
  })
  binaryString = window.btoa(binaryString)

  binaryString = pako.deflate(JSON.stringify(binaryString), {
    to: 'string'
  })
  binaryString = window.btoa(binaryString)

  binaryString = pako.deflate(JSON.stringify(binaryString), {
    to: 'string'
  })
  binaryString = window.btoa(binaryString)
  return encodeURIComponent(binaryString)
  // return binaryString
}
