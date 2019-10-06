# Dexter Modern Map Example

**Note:** This example and its associated documentation is incomplete and has not been tested.

## Description
This stylish watchface shows a simple road map behind the time. It is minimalistic and represent the sort of smart features we'd like to see in watchfaces.

## About

This watchface demonstrates Dexter's basic rendering and compositing capabilites as well as its ability to retrieve data from the host device (normally a phone). This example is well detailed and commented and takes advantage of some modern ES6 features.

The watchface makes heavy use of `dexter.ui.vectorCanvas` and functions within `dexter.host`. It relies on `dexter.ui.absoluteLayout` to place elements with pixel positions and makes use of alignment features (`element.aligment`) to center them (`dexter.ui.center`).

## Images

### Visualization
![alt text](map.png "Visualization made in illustration software.")


## Source Code
- [map.js](map.js) - Watchface code