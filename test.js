var read = require('./')
var test = require('tape')
var expected = require('./package.json')

test('reads the closest package.json file', function (t) {
  t.plan(1)
  read(function (err, data) {
    if (err) t.fail(err)
    t.deepEqual(data, expected, 'matches this package.json')
  })
})

test('handles error', function (t) {
  read({ cwd: '/' }, function (err, data) {
    t.notEqual(err, null, 'should receive error')
  })
  t.plan(1)
})

test('handles sync', function (t) {
  var pkg = read.sync()
  t.deepEqual(pkg, expected, 'should match package.json')
  t.end()
})

test('handles sync error', function (t) {
  var pkg = read.sync({ cwd: '/' })
  t.equal(pkg, null, 'should be null')
  t.end()
})
