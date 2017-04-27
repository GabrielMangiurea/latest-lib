# latest-lib [![Build Status](https://travis-ci.org/GabrielMangiurea/latest-lib.svg?branch=master)](https://travis-ci.org/GabrielMangiurea/latest-lib)

> Get the latest version of a CSS or JavaScript library hosted on CDNJS


## Install

```
$ npm install --save latest-lib
```


## Usage

```javascript
const latestLib = require('latest-lib');

// search for bootstrap
latestLib('bootstrap')
.then(library => console.log(library))
//=> {name: 'twitter-bootstrap', version: '4.0.0-alpha.6', files: [...]}
.catch(err => console.log(err));
```


## API

### latestLib(name[, opts])

#### name

Type: `String`

The name of the library

#### opts

Type: `Array`

##### only

Type: `String`

Possible choices:

- `css`
  - return only the `.css` files of the library in the response
- `js`
  - return only the `.js` files of the library in the response


## License

MIT &copy; [Gabriel Mangiurea](https://gabrielmangiurea.github.io)
