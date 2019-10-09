# dexter.time
### UDXS Dexter API Reference

## Introduction

Dexter provides helper functions for accessing time information.

**For most uses, such as actually getting the current time and date, the native JavaScript `Date` object is available.**
More information is available [here on the MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).


## Reference

- [dexter.time](#dextertime)
    - [getTimezone()](#gettimezone)    
    - [isDaylightSavings()](#isdaylightsavings)
    - [onChange(specifier, callback)](#onchangespecifiercallback)
    - [removeChange(callback)](#removechangecallback)

## Functions

---

### getTimezone()

Returns the current timezone as offset and name (following *tz database* standards).

#### Returns
A custom timezone object that looks like this:
```js
{
    city: "tz_database_city",
    region: "tz_database_region",
    humanReadable: "Human Readable City",
    offset: 3 //indicating UTC+3
}
```

---

### isDaylightSavings()

Returns whether it is currently daylight savings.

**Note:** Even if it is daylight savings, this will return false if the user has not enabled it.

#### Returns
A boolean determining whether it is currently daylight savings time.

---

### isDaylightSavings()

Returns whether it is currently daylight savings.

**Note:** Even if it is daylight savings, this will return false if the user has not enabled it.

#### Returns
A boolean determining whether it is currently daylight savings time.

---

### onChange(specifier, callback)

Registers event handler that triggers when the specified unit of time changes.

#### Parameters

**specifier** - A string specifying on which unit's change to trigger the callback on. 

Example: `"Mdmh"` - triggers on month change, day change, hour change, or on minute change. These do not need to be in any order.

Available specifiers are based on [this list](https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings).

**callback** - A function accepting the parameters `(specifier, time)` where `specifier` is a single-lettered string containing the largest time unit that changed and `time` is the current time as a JavaScript `Date` object.

---

### removeChange(callback)

Removes a specified callback from pool of events triggered when a unit of time changes.

#### Parameters

**callback** - The event function to remove from the pool of triggerable time events.

#### Returns

A boolean that is `true` if the event could be found and removed and `false` otherwise.