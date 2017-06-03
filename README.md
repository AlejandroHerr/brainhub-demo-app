# demo-app
Demo application for Brainhub.
## Building and bundling
The code is mostly written in ES6, hence it needs babel and babel-cli (to run the server).

`npm start` bundles the client in production and runs the server.

All the scripts below allow to customize the server and mongodb url. It defaults to http://localhost:3000 and mongodb://localhost:27017/brainhub-demo.
### Client
They client is bundled with webpack.
The commands to build are self explanatory:
- `npm run build:build`
- `npm run build:watch`: It actually launches the backend server with webpack's dev and hot middleware (it enables hot-loading). Requires babel-node
- `npm run build:prod`: Additionally it creates a bundle's size report.
### Server
`npm run srv:watch` runs nodemon to reload the server on changes during development.

## Tests
For testing, just execute `npm test`.
The tests use [tape](https://github.com/substack/tape), and they run with `babel-tape-runner` and `tap-summary` to prettify the output.

## Overview


The configuration of the form lays under `src/common/form/index.js`, and it contains the title of the form and the desired fields with its displayName, type, and validation to be applied. For example:
```
{
  title: 'Newslettter',
  fields: [
    {
      name: 'email',
      displayName: 'E-Mail',
      type: 'email',
      validators: ['isRequired', 'isEmail'],
    },
  ],
};
```
Validation is an array of strings representing the validators used. There's a common validator function under `src/common/validator` that allows to configure the validators used. Validation is applied both in the client and in the server side (in case someone acces the api directly) via middlewares.
### Client
The `Form` container takes the form configuration directly from the former file, and dynamically inits the field in the redux store.
#### fetcher
The `fetcher` middleware takes to arguments. The endpoint counfiguration (`{ scheme = 'http', domain = 'localhost', port = '80', route = '' }`) and a function to determine if the action is a fetching request or no.

The fetch request action must have the following shape:
```
{
 action: string,
 payload: ?any
 meta: {
  endpoint: string,
  body: ?object,
  method: 'GET|POST|PUT|DELETE',
  onFail: actionCreator,
  onSuccess: actionCreator
  }
}
```
### Server
To acces to the app just browse the root directory. The server exposes a simple api, with only one endpoint under /api/attendant.
