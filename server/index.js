const { db } = require('./db')
const PORT = process.env.PORT || 8080
const app = require('./app')
const seed = require('../script/seed');

try {
  require('../secrets');
}
catch(ex){
  console.log(ex);
  console.log('if running locally add secrets.js file which sets environment variables for GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET');

}

const init = async () => {
  try {
    if(process.env.SEED === 'true'){
      await seed();
    }
    else {
      await db.sync()
    }
    // start listening (and create a 'server' object representing our server)
    app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))
  } catch (ex) {
    console.log(ex)
  }
}

init()
