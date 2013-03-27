'use strict';

var properties = require('../lib/properties.js');
var props;

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['properties'] = {
  setUp: function(done) {
    props = properties.of('test/fixtures/example.properties');
    done();
  },
  'basic read from a file': function(test) {
    test.expect(2);
    test.equal('2.5', props.get('ricola.version.major'));
    test.equal('7', props.get('ricola.version.minor'));
    test.done();
  },
  'nested values': function(test) {
    test.expect(1);
    test.equal('2.5', props.get('ricola.version.symlink'));
    test.done();
  },
  'complicated nest': function(test) {
    test.expect(2);
    test.equal('ricola-2.5', props.get('ricola.version.prefixed'));
    test.equal('ricola-2.5-tothemax', props.get('ricola.version.postfixed'));
    test.done();
  },
  'recursive nest': function(test) {
    test.expect(1);
    test.equal('ricola-2.5-recursive', props.get('ricola.recursive'));
    test.done();
  },
  'double nest': function(test) {
    test.expect(1);
    test.equal('2.5.7', props.get('ricola.version'));
    test.done();
  },
  'with spaces' : function(test) {
    test.expect(1);
    test.equal('hello', props.get('ricola.withSpaces'));
    test.done();
  },
  'second file': function(test) {
    test.expect(3);
    props = properties.of('test/fixtures/example.properties', 'test/fixtures/example2.properties');
    test.equal('14.47', props.get('extra.property'));
    test.equal('444', props.get('another.property'));
    test.equal('7', props.get('referenced.property'));
    test.done();
  },
  'not found property': function(test) {
    test.expect(1);
    test.equal(undefined, props.get('undefinedValue'));
    test.done();
  }
};
