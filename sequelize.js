const Sequelize  = require('sequelize');
const MovieModel = require('./models/movies');

const sequelize = new Sequelize('hollywood', process.env.PGUSER,process.env.PGPASS, {
    host: 'localhost',
    dialect: 'postgres'
  });



const Movie = MovieModel(sequelize,Sequelize)

async function testSq(){
    console.log("Trying to connect to db. User:"+process.env.PGUSER+" Pass: "+process.env.PGPASS)
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}



async function sinc(){
  await sequelize.sync({ force: true });
  console.log("sinc")
}


module.exports.testSq = testSq;
module.exports.sinc = sinc;
