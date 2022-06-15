Achievement = require("../webgame/JS/Logic/Achievement.js")

var assert = require('assert');
describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            ach = new Achievement("Test", 1, "test.png");
            assert.equal(ach.name, "Test");
        });
    });
});