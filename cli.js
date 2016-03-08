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
     $ open-github-notifications ifps/go-ipfs
     Now opening 30 notifications from ipfs/go-ipfs...

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
  if (cli.input.length >= 1) {
    return openGithubNotifications(cli.input, cli.flags, authData.token)
  } else {
    console.log('Error: You must specify an organization and repository.')
  }
}).then((result) => {
  console.log(result)
})
