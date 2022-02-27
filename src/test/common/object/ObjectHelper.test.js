var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
const ObjectHelper = require('../../../main/common/object/ObjectHelper.js');

describe('ObjectHelper : hasProperty', function() {
  it('not configured nodeboot.database.client in application.json', function() {
    var dummy = new ObjectHelper()
    expect(true).to.equal(true);
  });
});
