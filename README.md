# time-ago-pipe
[![Build Status](https://travis-ci.org/AndrewPoyntz/time-ago-pipe.svg?branch=master)](https://travis-ci.org/AndrewPoyntz/time-ago-pipe) [![npm](https://img.shields.io/npm/v/time-ago-pipe.svg)]() [![npm](https://img.shields.io/npm/dt/time-ago-pipe.svg?maxAge=2592000)]() [![GitHub issues](https://img.shields.io/github/issues/AndrewPoyntz/time-ago-pipe.svg?maxAge=2592000?style=plastic)]() [![npm](https://img.shields.io/npm/l/time-ago-pipe.svg?maxAge=2592000?style=plastic)]()


A really simple, lightweight Angular 2 pipe to convert a date/time into a string saying how long ago from now it was.

## Usage

Import into your angular project, as you would for any other library.

Add "TimeAgoPipe" to your declarations in an @NgModule

Then in your component templates:
```<span>{{your_date | timeAgo}}</span>```