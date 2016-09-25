# time-ago-pipe
[![Build Status](https://travis-ci.org/AndrewPoyntz/time-ago-pipe.svg?branch=master)](https://travis-ci.org/AndrewPoyntz/time-ago-pipe) [![npm](https://img.shields.io/npm/v/time-ago-pipe.svg)]() [![npm](https://img.shields.io/npm/dt/time-ago-pipe.svg?maxAge=2592000)]() [![GitHub issues](https://img.shields.io/github/issues/AndrewPoyntz/time-ago-pipe.svg?maxAge=2592000?style=plastic)]() [![npm](https://img.shields.io/npm/l/time-ago-pipe.svg?maxAge=2592000?style=plastic)]()


A really simple, lightweight Angular 2 pipe to convert a date/time into a string saying how long ago from now it was.

|Time Range|Output|
|---|---|
|0 - 45 seconds             | a few seconds ago      |
|45 - 90 seconds            | a minute ago           |
|90 seconds - 45 minutes    | X minutes ago          |
|45 - 90 minutes            | an hour ago            |
|90 minutes - 22 hours      | X hours ago            |
|22 - 36 hours              | a day ago              |
|36 hours - 25 days         | X days ago             |
|25 - 45 days               | a month ago            |
|45 - 345 days              | X months ago           |
|345 - 545 days (1.5 years) | a year ago             |
|546 days+                  | X years ago            |
##Installation
```npm install time-ago-pipe --save```

## Usage
In your component templates you can just do:
```
<span>{{your_date | timeAgo}}</span>
```
where "your_date" is something, which could be parsed by the standard Js Date()

---
It can be imported into your angular project, as you would for any other library. 

The d.ts files are included, so typings should be picked up automatically  :+1:

#### SystemJS
in your system config file:
```
map: {
    'time-ago-pipe':'node_modules/time-ago-pipe',
    etc
}
```
```
packages: {
    'time-ago-pipe': {main: 'time-ago-pipe.js'},
    etc
}
```

Then in the @NgModule you want to use it in
```
import {TimeAgoPipe} from 'time-ago-pipe
```
& add "TimeAgoPipe" to your declarations
```
@NgModule({
	imports: [... etc ...],
	declarations: [AppComponent, ...etc..., TimeAgoPipe],
	bootstrap: [AppComponent]
})
```

