# nodeboot-database-starter

![](./coverage/lines.svg) ![](./coverage/statements.svg) ![](./coverage/branches.svg) ![](./coverage/functions.svg)

Library used in [nodeboot-rest-starter](https://github.com/nodeboot/nodeboot-rest-starter) which allows us to inject a ready to use **knex** instance

## usage

[nodeboot-rest-starter](https://github.com/nodeboot/nodeboot-rest-starter) use it in this way:

```
if (require.resolve(rootNodeModulesLocation+'/nodeboot-database-starter')) {
   console.log("nodeboot-database-starter was detected. Configuring...");
   const DatabaseStarter = require(rootNodeModulesLocation+"/nodeboot-database-starter");
   var databaseStarter = new DatabaseStarter();
   var dbSession = await databaseStarter.autoConfigure(rootNodeModulesLocation);

   if (typeof dbSession !== 'undefined') {
     console.log("dbSession is ready");
     this.instancedDependecies["dbSession"] = dbSession || {};
   }
}
```

Basically if the developer add **nodeboot-database-starter** to its package.json, **nodeboot-rest-starter** will detect it and starts the auto configuration

## Road map

- [ ] add more databases like postgress, sqlserver, oracle
- [ ] publish to npm repository: https://www.npmjs.com/package/repository

## Inspiration

- [spring-boot-starter-data-jpa](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)

## Contributors

<table>
  <tbody>
    <td style="text-align: center;" >
      <img src="https://avatars0.githubusercontent.com/u/3322836?s=460&v=4" width="100px;"/>
      <br />
      <label><a href="http://jrichardsz.github.io/">JRichardsz</a></label>
      <br />
    </td>    
  </tbody>
</table>
