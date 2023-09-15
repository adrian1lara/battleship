const greeting = require('../src/testing');

test('greeting', () => {
    expect(greeting()).toBe('Hello World');
})