var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var resolveOrigin = require.resolve
var requireOrigin = require

const DatabaseStarter = require("../main/Index.js");

describe('DatabaseStarter: autoConfigure', function() {
  it('should return null if nodeboot.database.client in missing on application.json', function() {
    var databaseStarter = new DatabaseStarter();
    var databaseCriteria = databaseStarter.autoConfigure();
    expect(undefined).to.equal(databaseCriteria);
  });
  it('should return null if nodeboot.database.client in empty on application.json', function() {

    var dbConfig = {
      "nodeboot": {
        "database": {
          "client": ""
        }
      }
    }

    global["NodebootContext"] = {}
    global["NodebootContext"]["instancedDependecies"] = {}
    global["NodebootContext"]["instancedDependecies"]["configuration"] = dbConfig;

    var databaseStarter = new DatabaseStarter();
    var databaseCriteria = databaseStarter.autoConfigure();
    expect(undefined).to.equal(databaseCriteria);
  });
  it('should return null if nodeboot.database.client cannot be resolved as npm package', function() {

    var dbConfig = {
      "nodeboot": {
        "database": {
          "client": "foo"
        }
      }
    }

    global["NodebootContext"] = {}
    global["NodebootContext"]["instancedDependecies"] = {}
    global["NodebootContext"]["instancedDependecies"]["configuration"] = dbConfig;

    var databaseStarter = new DatabaseStarter();
    var databaseCriteria = databaseStarter.autoConfigure();
    expect(undefined).to.equal(databaseCriteria);
  });

  it('should return valid knex if nodeboot.database.client exist as npm package and is valid', function() {

    require.resolve = function(moduleName) {
      if (moduleName == "mysql") {
        return "/foo"
      } else {
        return resolveOrigin(moduleName)
      }
    }
    require = function(moduleName) {
      if (moduleName == "knex") {
        return function(options) {}
      } else {
        return requireOrigin(moduleName)
      }
    }

    var dbConfig = {
      "nodeboot": {
        "database": {
          "client": "mysql"
        }
      }
    }

    global["NodebootContext"] = {}
    global["NodebootContext"]["instancedDependecies"] = {}
    global["NodebootContext"]["instancedDependecies"]["configuration"] = dbConfig;

    var databaseStarter = new DatabaseStarter();
    var databaseCriteria = databaseStarter.autoConfigure();
    assert(databaseCriteria);
  });

});
