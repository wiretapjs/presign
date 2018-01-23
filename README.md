![Build Status](https://forge.lmig.com/builds/plugins/servlet/wittified/build-status/USCMIJBAP-IP)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). Please refer to the [user guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) for extended documentation on usage.

## Contributing to this project
- Contributions are welcome!
- Please create a fork and submit a pull request for your changes
    * Note that this project is meant to be a lightweight starter
    * New features, additions, or changes will be merged once reviewed

## Cloning this project
  - `git clone <url> [destination]`
  - URL
    * HTTPS: `https://$N_NUMBER@git.forge.lmig.com/scm/uscmijbap/ijbap-template.git`
    * SSH: `ssh://git@git.forge.lmig.com:7999/uscmijbap/ijbap-template.git`
  - Destination
    * `.`, the current working directory
    * A relative or absolute path
    * Nothing specified, create directory based on the name of the remote repository
  - After cloning you'll want to update the package.json properties like name, description, and author
  - Follow the instructions below to get the app set up and running

## Pushing to a new Git repository
- `git remote set-url origin <url>`
- Verify your new remote URL with `git remote -v`

## Setting up your CI pipeline
- See instructions in [myConnections](https://myconnections.lmig.com/groups/angularjs/blog/2017/02/17/react-redux-from-code-to-cloud-in-10-minutes)


## Installation
- In the project directory run `npm install`
- On windows you might also need to install node-sass globally:
    * `npm install -g node-sass`
- (optional) Install the ESLint plugin for your IDE if you prefer the lint results to appear right in your editor (also shows in terminal and browser console)
    * For IDEA/Webstorm: File > Settings > Languages & Frameworks > JavaScript > Code Quality Tools > ESLint > Enable
    * Also check [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#displaying-lint-output-in-the-editor) to see if you have to install anything else
- If you are using IntelliJ you will want to turn off safe writes (saves write to a temp file first) because it prevents the file watchers from noticing your code changes sometimes. You can turn this off  Settings ▶ System Settings ▶ Synchronization ▶ disable safe write


## Storybook
This application uses [Storybook](https://storybook.js.org/) as a development tool for UI components.  Storybook allows developers to create
[stories](https://storybook.js.org/basics/writing-stories/) that describe the various states of their components.  Each story can be thought of as a
visual snapshot of a given state.  The Storybook interface then allows users to view each of these state individually, providing a simple environment
in which both developers and designers can collaborate on UI design.

## Client Middleware
The `src/configureRedux/utils` folder has a `clientMiddleware.js` file, which was borrowed from [Eric Rasmussen](https://github.com/erikras/react-redux-universal-hot-example).  This middleware provides a way to create asynchronous actions in a consistent 
way, while avoiding the complexities of `redux-thunk` and `redux-saga`.  The following snippet is an example of an action creator that uses this middleware:

```
const asyncIncrementCount = function asyncIncrementCount() {
    return {
        types: [
            types.ASYNC_INCREMENT_REQUEST,
            types.ASYNC_INCREMENT_SUCCESS,
            types.ASYNC_INCREMENT_FAILURE,
        ],
        promise: client => client.postExample(),
    };
};
```

Instead of the standard `type` field, we set a `types` field in the returned object.  This field takes a list of three action types: one to dispatch when the request is sent, one to dispatch when (if) the request returns successfully, and one to dispatch when (if) the request fails.  The response bodies for the success and failure actions will be dispatched in a `result` and an `error` field, respectively.  For example, if a request returns successfully with the body "OK", then the following action would be dispatched:

```
{
    type: types.ASYNC_INCREMENT_SUCCESS,
    result: "OK",
}
```

You'll also notice that there is a `promise` field in the object returned by the action creator.  This field should contain a function that takes a client 
object and returns a promise representing the asynchronous request.  The client object is configured when the middleware is initialized (`src/configureRedux/configureStore.js` in this repo), and represents the server API being called.

Of course, this middleware only works for side effects that follow a certain lifecycle.  For more complex effects, it may be necessary to also use
`redux-thunk` or `redux-saga`.  However, this repo is of the opinion that those packages should only be brought in when necessary, and that the client middleware
is cleaner/safer for straightfoward asynchronous behavior.


## Testing
This application uses [Jest](https://facebook.github.io/jest/) for unit and non-end-to-end integration testing.  In addition, this application
makes use of Storybook's [StoryShots addon](https://github.com/storybooks/storybook/tree/master/addons/storyshots) to quickly generate snapshot
tests from UI stories.  See the [StoryShots documentation](https://github.com/storybooks/storybook/tree/master/addons/storyshots) for more info, 
but the TL;DR; summary is: **_you don't have to write explicit structural tests for your UI components.  StoryShots will do this for you!_**


## Running the Application
Use the following commands on the terminal at the project directory to get started:

#### `npm start`
- This will start the application and will auto reload both JS and Sass/CSS changes

#### `npm run dev`
- Use this instead of `npm start` to run the app using a local mock API.
- To switch back to the regular API, just restart the app in a different terminal with `npm start`

#### `npm test`
- This will start the unit tests and will rerun on file changes, use this for TDD
- If you just want to run specific tests, try `npm test <filename/matcher>` or use the `p` key on the interactive CLI
- Snapshots will also be created for any stories which don't yet have a snapshot

#### `npm run test:process-results`
- This is a more verbose version of `npm test` and will also generate test coverage and a json output of the test results

#### `npm run update-snapshots`
- Use this command when your components change and new snapshots are needed for testing.
- New snapshots will be generated, and the unit tests will be re-run

#### `npm run lint`
- This will run ESLint

#### `npm run storybook`
- This will run the Storybook interface on your local machine

#### `npm run sass-watcher`
- This will auto compile any .scss files under /src to .css on change, use when editing styles
- This will run automatically in parallel to starting the app when you use `npm start`
- Make sure to import the compiled css file into your component instead of the .scss, [see here for an example](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-stylesheet)
- If you don't really need features from sass, you can also just make regular css files or do [inline styles with React](https://facebook.github.io/react/tips/inline-styles.html), the app will still hot reload the css when changed

#### `npm run build` or `npm run test-and-build`
- Use these commands if you want to see the optimized and compiled build (see build folder in the root directory after running). You can also utilize this command for CI environments like Bamboo


## Updating the Build Configuration
- Make sure to occasionally check for updates on react-scripts and update if possible, [see here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#updating-to-new-releases)
- You can also easily add your own npm scripts in package.json if you need additional build processes
- If really need to edit the build/webpack config manually, you can run `npm run eject`.
    * **Note: this is a one-way operation. Once you eject, you can’t go back!** For most small and middle deployments you will probably never need to eject


## Links

| Tool | Link |
| ---- | ---- |
| Git | <https://git.forge.lmig.com/projects/USCMIJBAP/repos/ijbap-template/> |
| Build Plan  | <https://forge.lmig.com/builds/browse/USCMIJBAP-IT> |


<!--| Environment | Status | Plan | App Url |
| ----------- | ------ | ---- | ------- |
| DEV US-EAST-1 | ![CF NP US-East-1 Internal DEV Deployment](https://forge.lmig.com/builds/plugins/servlet/wittified/deploy-status/304153113) | <https://forge.lmig.com/builds/deploy/viewEnvironment.action?id=304153113> | <https://react-redux-starter-development.us-east-1.np.paas.lmig.com/> |
| DEV PDC | ![CF NP PDC Internal DEV Deployment](https://forge.lmig.com/builds/plugins/servlet/wittified/deploy-status/304153112) | <https://forge.lmig.com/builds/deploy/viewEnvironment.action?id=304153112> | <https://react-redux-starter-development.pdc.np.paas.lmig.com/> |-->

