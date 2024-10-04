# keyman-vancouver

A playground for a possible future Keyman Developer application.

## Getting started

Please install all necessary [prerequisites](https://github.com/eclipse-theia/theia/blob/master/doc/Developing.md#prerequisites).

## Running the browser example

    yarn build:browser
    yarn start:browser

*or:*

    yarn build:browser
    cd browser-app
    yarn start

*or:* launch `Start Browser Backend` configuration from VS code.

Open http://localhost:3000 in the browser.

## Running the Electron example

    yarn build:electron
    yarn start:electron

*or:*

    yarn build:electron
    cd electron-app
    yarn start

*or:* launch `Start Electron Backend` configuration from VS code.

## Developing with the browser example

Start watching all packages, including `browser-app`, of your application with

    yarn watch:browser

*or* watch only specific packages with

    cd keyman-vancouver
    yarn watch

and the browser example.

    cd browser-app
    yarn watch

Run the example as [described above](#Running-the-browser-example)
## Developing with the Electron example

Start watching all packages, including `electron-app`, of your application with

    yarn watch:electron

*or* watch only specific packages with

    cd keyman-vancouver
    yarn watch

and the Electron example.

    cd electron-app
    yarn watch

Run the example as [described above](#Running-the-Electron-example)

## License

Copyright (c) SIL Global.

Keyman is an open source project distributed under the [MIT license](LICENSE.md).
