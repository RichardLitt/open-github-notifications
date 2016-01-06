var Octokat = require('octokat')
var octo = new Octokat({
  token: process.env.GITHUB_OGN_TOKEN
})
var open = require('open')
var Promise = require('bluebird')

module.exports = function openNotifications (org, repository, amount) {
  return Promise.resolve().then(function () {
    return octo.repos(org, repository, 'notifications').fetch()
  }).some(parseInt(amount, 10)).map(function (repo) {
    var res = repo.subject.url
			.replace(/(https\:\/\/)api\./, '$1')
			.replace(/\/repos\//, '/')
			.replace(/\/pulls\//, '/pull/')
    open(res)
  }).then(function () {
    console.log('Now opening %d notifications from %s/%s...', amount, org, repository)
  }).catch(function (err) {
    console.err(err)
  })
}
