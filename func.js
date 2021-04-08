const fdk=require('@fnproject/fdk');
const oracledb = require('oracledb');
const dbconfig = require('./dbconfig.js');

fdk.handle(async function(input){

  let name = 'World';
  console.log('\nThis is a OCI Functions APM Demo ..')
  
  if (input) {
    name = input.name;
    // This is a POST operation, Not implemented.
    return '{ Hello : ' + name + '}' 
  }else{
    return getdb()
  }
})

async function getdb(){
  let result = '';
  //console.log(process.env.CONNECT_STRING, process.env.DB_USER);
  try {
    connection =  await oracledb.getConnection(dbconfig);
    result =  await connection.execute(
    `SELECT brand, title, description
     FROM test_user.products`
    );
   
    for(let results in result.rows){
      const [brand,title,description] = result.rows[results];
      //console.log(brand,title,description);
    }
  } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
          try {
            await connection.close();
          } catch (err) {
              console.error(err);
          }
      }
    }
  return result
}

