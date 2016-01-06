#!/usr/bin/env node

var meow = require('meow')
var openGithubNotifications = require('./')

var cli = meow([
	'Usage',
	'  $ open-github-notifications <org> <repo> <amount>',
	'',
	'Examples',
	'  $ open-github-notifications ipfs go-ipfs 15',
	'  Now opening 15 notifications from ipfs/go-ipfs...'
])

if (cli.input.length === 3) {
  openGithubNotifications(...cli.input)
} else {
  console.log(cli.help)
}

