[![CircleCI](https://circleci.com/gh/entur/micro-frontend/tree/master.svg?style=svg&circle-token=7cc5edff6593cc724eae97388c7769b2ce7c7b48)](https://circleci.com/gh/entur/micro-frontend/tree/master)

# Generic and minimal micro-frontend library

## Usage

The library consists of two main parts:

### MicroFrontend

A React component to be used by the hosting application to render a micro-frontend at a specific location in the component tree in a React application.

You can bring your own Payload type to specify a contract between the hosting application and the micro-frontend. The payload is an object that you can use to provide context, such as a function to get an authorization token.

    <MicroFrontend<DefaultPayload>
        id="my-cool-micro-frontend"
        host="example.org"
        staticPath="/static"
        name="My Cool Micro Frontend"
        payload={{
            getToken: auth.getAccessToken
        }}
        FetchStatus={FetchStatus}
        handleError={e => console.log(e)}
    />

* `id`: The id corresponding to the `microFrontendId` argument of `registerMicroFrontend`.
* `name`: Human-readable name of micro-frontend
* `host`: The fully qualified hostname of the micro-frontend.
* `staticPath`: The path where static files are located on `host`.
* `payload`: Payload that should be delivered to the micro-frontend upon mounting.
* `FetchStatus`: A component that will be rendered over the micro-frontend, to display rendering status. This component takes `name` and `state` og micro-frontend as props.
* `handleError`: A function that will be called if there is an error during loading of micro-frontend

### registerMicroFrontend

A function to be called from a micro-frontend to register mount and unmount handlers, which will be called by the hosting application. The register function is in theory framework agnostic, but has been tested only with React.

The function takes a generic type that specifies the payload contract.

    registerMicroFrontend<DefaultPayload>({
        microFrontendId: 'my-cool-micro-frontend',
        mount: (mountPoint, payload) => {
            ReactDOM.render(<App {...payload} />, mountPoint);
        },
        unmount: (mountPoint) => {
            ReactDOM.unmountComponentAtNode(mountPoint);
        },
    });

## Requirements

The `MicroFrontend` component assumes that there is an `asset-manifest.json` file located at the path given by the `staticPath` prop at the given `host` prop. The structure of this file is  assumed to follow the standard output of `react-scripts` which uses `webpack-manifest-plugin` to generate the file.

When using TypeScript, use either the `DefaultPayload` type or provide your own, to describe the payload that is passed from the hosting application to the micro-frontend.

## Deployment

Build: 

    npm run build

Update version:

    npm version [patch, minor, major]

Publish

    npm publish

Push to github

    git push && git push --tags
