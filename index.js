const Octokat = require('octokat')
const open = require('open')
const Promise = require('bluebird')
var octo, organization, repository

module.exports = function openNotifications (input, opts, token) {
  octo = new Octokat({
    token: token || process.env.GITHUB_OGN_TOKEN
  })
  var amount = opts.amount || 30

  if (input[0].split('/').length === 2) {
    organization = input[0].split('/')[0]
    repository = input[0].split('/')[1]
    if (Number.isInteger(input[1])) {
      amount = input[1]
    }
  } else {
    organization = input[0]
    repository = input[1]
    amount = input[2] || amount
  }

  console.log('Organization:', organization)
  console.log('Repository:', repository)
  console.log('Amount:', amount)

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
      return result.some(amount).map((repo) => {
        var res = repo.subject.url
          .replace(/(https\:\/\/)api\./, '$1')
          .replace(/\/repos\//, '/')
          .replace(/\/pulls\//, '/pull/')
        open(res)
        return `Opened notifications.`
      })
    } else {
      return `No notifications.`
    }
  }).catch((err) => {
    console.log(err)
  })
}
