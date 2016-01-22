#!/usr/bin/env node

const meow = require('meow')
const openGithubNotifications = require('./')
const Promise = require('bluebird')
const ghauth = Promise.promisify(require('ghauth'))
const authOptions = {
  configName: 'openGithubNotifications',
  note: 'Open GitHub Notifications from the CLI',
  userAgent: 'openGHNotifications',
  scopes: ['notifications']
}

const cli = meow([`
  Usage
    $ open-github-notifications <organization> <repository> [options]

  Options
    -a, --amount  The amount to open. [Default: 30]
    -p, --participating Only participating notifications. [Default: false]

	Examples
     $ open-github-notifications ipfs go-ipfs -a15 -p
     Now opening 15 participating notifications from ipfs/go-ipfs...
`], {
  alias: {
    a: 'amount',
    p: 'participating'
  }
})

Promise.try(() => {
  return ghauth(authOptions)
}).then((authData) => {
  return openGithubNotifications(cli.input[0], cli.input[1], cli.flags, authData.token)
}).then((result) => {
  console.log(result)
})
