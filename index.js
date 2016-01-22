const Octokat = require('octokat')
const open = require('open')
const Promise = require('bluebird')
var octo

module.exports = function openNotifications (organization, repository, opts, token) {
  octo = new Octokat({
    token: token || process.env.GITHUB_OGN_TOKEN
  })

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
      return result.some(opts.amount || 30).map((repo) => {
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
