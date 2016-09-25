var expect = require('chai').expect;
var sinon = require('sinon');
var reflect = require('reflect-metadata');
import {TimeAgoPipe} from "../time-ago-pipe";

describe('time-ago-pipe', () => {
	const now:Date = new Date();
	var clock:any;
	beforeEach(() => {
		clock = sinon.useFakeTimers(now.getTime());
	});
	afterEach(() => {
		clock.restore();
	});
	let pipe = new TimeAgoPipe();
	it('a few seconds ago', () => {
		var pastDate = new Date();
		for (let i =0; i < 50; i++){
			//run the clock forward 1 secs
			clock.tick(1000);
			if (i <=44){ // less than 45 secs
				expect(pipe.transform(pastDate.toString())).to.equal('a few seconds ago');
			} else { // more than 45 secs ago
				expect(pipe.transform(pastDate.toString())).to.equal('a minute ago');
			}
		}
	});

});