'use strict'
function getgroup (name, cookies) {
  const obj = JSON.parse(cookies)
  var cookie = obj.GName
  /* const cookie = {}

  cookies.split(',').forEach(function (el) {
    const [k, v] = el.split(':')
    cookie[k.trim()] = v
  })
  return cookie[name] */
  return cookie
}
exports.getgroup = getgroup
