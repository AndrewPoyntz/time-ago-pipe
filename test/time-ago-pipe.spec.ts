var expect = require('chai').expect;
var reflect = require('reflect-metadata');
import {TimeAgoPipe} from "../time-ago-pipe";
describe('time-ago-pipe', () => {
	// This pipe is a pure function so no need for BeforeEach
	let pipe = new TimeAgoPipe();
	it('has a test', () => {
		expect(true).to.equal(true);
	});
});