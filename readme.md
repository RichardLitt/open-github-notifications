# open-github-notifications [![Build Status](https://travis-ci.org/RichardLitt/open-github-notifications.svg?branch=master)](https://travis-ci.org/RichardLitt/open-github-notifications)

[![Greenkeeper badge](https://badges.greenkeeper.io/RichardLitt/open-github-notifications.svg)](https://greenkeeper.io/)

> Open GitHub notifications from your command line


## Install

```
$ npm install --global open-github-notifications
```

Make sure to [create a token off of GitHub](https://github.com/settings/tokens) and set it in your `.bash_profile` as `$GITHUB_OGN_TOKEN`.

## Usage

```js
const openGithubNotifications = require('open-github-notifications');

openGithubNotifications('ipfs', 'go-ipfs', 15);
//=> 'Now opening 15 notifications from ipfs/go-ipfs...''
```

## API

### openGithubNotifications(organization, repository, amount)

#### organization

Type: `string`

The organization to open.

#### repository

Type: `string`

The repository to get notifications for. This can also be included with the organization, with the syntax:

    organization/repository

#### -a, amount

Type: `int`
Default: 15.

The amount to open (cannot be more than 50 at once). This can also be provided as the last argument.

#### -p, participating

Type: `flag`
Default: false.

## CLI

```sh
$ npm install --global open-github-notifications
```

```sh
  Open GitHub notifications in your browser

  Usage
    $ open-github-notifications
    $ open-github-notifications <org> <repo> <amount>
    $ open-github-notifications <org>/<repo> <amount>

  Examples
    $ open-github-notifications
    Opened 15 notifications.
    $ open-github-notifications ipfs go-ipfs 15
    Opened 15 notifications.
```


## License

MIT © [Richard Littauer](http://burntfen.com)
