# Open Equation Connect

[![Tests](https://github.com/AndreMiras/equation-connect/workflows/Tests/badge.svg?branch=develop)](https://github.com/AndreMiras/equation-connect/actions?query=workflow%3ATests)
[![Deploy](https://github.com/AndreMiras/equation-connect/workflows/Deploy/badge.svg?branch=develop)](https://github.com/AndreMiras/equation-connect/actions?query=workflow%3ADeploy)


<https://andremiras.github.io/equation-connect/>

This is an open alternative to the
[Equation Connect](https://play.google.com/store/apps/details?id=com.equation.connect) application
used for controlling wifi radiators, like the
[Emisor fluido EQUATION Adagio 1250w](https://www.leroymerlin.es/fp/83406849/emisor-fluido-equation-adagio-1250w)
from Leroy Merlin.

This is built on top of the [equation-connect.js](https://github.com/AndreMiras/equation-connect.js) library.

## Features / Roadmap
- [x] Firebase login
- [ ] Firebase register
- [ ] Demo account
- [x] Weather widget
- [x] Zones overview / listing
- [ ] Zones update
- [ ] Devices pairing
- [x] Devices overview / listing
- [x] Devices details
- [x] Devices update
- [x] Extra features
  - [x] Temperature sensors read
  - [x] Screen backlight control

## Run
```sh
yarn start
```
Note you need a valid Open Weather API key, see `.env.example` file for details.

## Test
```sh
yarn lint
yarn test
```
