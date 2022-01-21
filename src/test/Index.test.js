var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var resolveOrigin = require.resolve
var requireOrigin = require

const DatabaseStarter = require("../main/Index.js");

describe('DatabaseStarter: autoConfigure', function() {
  it('not configured nodeboot.database.client in application.json', function() {
    var databaseStarter = new DatabaseStarter();
    var databaseCriteria = databaseStarter.autoConfigure();
    expect(undefined).to.equal(databaseCriteria);
  });
  it('configured nodeboot.database.client in application.json with empty', function() {

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
  it('configured nodeboot.database.client in application.json but unknown npm db client', function() {

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
  it('configured nodeboot.database.client in application.json but resolve returns null', function() {

    require.resolve = function(moduleName){
      if(moduleName == "bar"){
         return undefined
      }
    }
    require = function(moduleName){
      if(moduleName == "knex"){
        return function(options){}
      }else{
        return requireOrigin(moduleName)
      }
    }

    var dbConfig = {
      "nodeboot": {
        "database": {
          "client": "bar"
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
  it('well configured nodeboot.database.client in application.json', function() {

    require.resolve = function(moduleName){
      if(moduleName == "mysql"){
        return "/foo"
      }else{
        return resolveOrigin(moduleName)
      }
    }
    require = function(moduleName){
      if(moduleName == "knex"){
        return function(options){}
      }else{
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
