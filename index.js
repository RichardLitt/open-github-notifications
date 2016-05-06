const Octokat = require('octokat')
const open = require('open')
const Promise = require('bluebird')
var octo, organization, repository

module.exports = function openNotifications (input, opts, token) {
  octo = new Octokat({
    token: token || process.env.GITHUB_OGN_TOKEN
  })
  var amount = opts.amount || 15

  if (input && input[0].split('/').length === 2) {
    organization = input[0].split('/')[0]
    repository = input[0].split('/')[1]
    if (Number.isInteger(input[1])) {
      amount = input[1]
    }
  } else if (input) {
    organization = input[0]
    repository = input[1]
    amount = input[2] || amount
  }

  return Promise.resolve().then(() => {
    if (!organization && !repository) {
      return octo.notifications.fetch({
        participating: opts.participating || false
      })
    } else {
      return octo.repos(organization, repository, 'notifications').fetch()
    }
  }).then((result) => {
    if (result) {
      if (result.length < amount) {
        amount = result.length
      }
      return Promise.some(result, amount).map((repo) => {
        var res = repo.subject.url
          .replace(/(https\:\/\/)api\./, '$1')
          .replace(/\/repos\//, '/')
          .replace(/\/pulls\//, '/pull/')
        open(res)
      }).then(() => `Opened ${amount} notifications.`)
    } else {
      return `No new notifications. (ᐛ)`
    }
  }).catch((err) => {
    console.log(err)
  })
}
