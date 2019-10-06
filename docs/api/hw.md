# dexter.hw
### UDXS Dexter API Reference

## Introduction

Dexter enables you to access hardware data through a simple API.


**Note:** Currently, Dexter has no permissions system for applications. This may change in the future and it may mean apps need to be updated to properly request permissions before being able to use certain hardware features.

## Reference

- [dexter.hw](#dexterhw)
    - [capabilities]()
        - [hasHeartRate]()
        - [hasAccel]()
        - [hasCompass]()
        - [hasGyro]()
        - [hasVibration]()
        - [hasColor]()
        - [hasTouch]()
    - [vibrate(ms)]()
    - [vibrate(pattern)]()
    - [stopVibrate()]()
    - [onBackButton(single, callback)]()

**Note:** This API is incomplete