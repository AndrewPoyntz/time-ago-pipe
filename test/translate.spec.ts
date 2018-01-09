var expect = require('chai').expect;
var sinon = require('sinon');
import {Translate} from '../translate';


describe('translate', () => {


    describe('translate function', function () {

        let translate = new Translate();

        it('should translate a message without parameters', () => {

            expect(translate.translate('fr', 'a few seconds ago')).to.equal('il y a quelques secondes');

        });

        it('should translate a message with parameters', () => {

            expect(translate.translate('fr', 'seconds ago', {seconds: 20})).to.equal('il y a 20 secondes');

        });

        it('should return the message key if translation cannot be found', () => {

            expect(translate.translate('de', 'seconds ago')).to.equal('seconds ago');

        });

    });

});