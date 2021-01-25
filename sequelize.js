const Sequelize  = require('sequelize');
const MovieModel = require('./models/movies');
const ActorModel = require('./models/actors');
const DirectorModel = require('./models/directors');
const ProducerModel = require('./models/producers');
const StudioModel = require('./models/studios');
const UserModel = require('./models/users');
const ClaimsModel = require('./models/claims');

const sequelize = new Sequelize('hollywood', process.env.PGUSER,process.env.PGPASS, {
    host: 'localhost',
    dialect: 'postgres'
});


const Movie = MovieModel(sequelize,Sequelize)
const Actor = ActorModel(sequelize,Sequelize)
const Director = DirectorModel(sequelize,Sequelize)
const Producer = ProducerModel(sequelize,Sequelize)
const Studio = StudioModel(sequelize,Sequelize)
const User = UserModel(sequelize,Sequelize)
const Claim = ClaimsModel(sequelize,Sequelize)

Movie.belongsToMany(Actor, { through: 'ActorMovies' })
Actor.belongsToMany(Movie, { through: 'ActorMovies' })

Movie.belongsToMany(Director, { through: 'DirectorMovies' })
Director.belongsToMany(Movie, { through: 'DirectorMovies' })

Movie.belongsToMany(Producer, { through: 'ProducerMovies' })
Producer.belongsToMany(Movie, { through: 'ProducerMovies' })

Studio.hasMany(Movie,{ foreignKey: 'StudioId'})
Movie.belongsTo(Studio)

User.belongsToMany(Claim,{through: 'UserClaims'})
Claim.belongsToMany(User,{through: 'UserClaims'})


User.belongsToMany(Actor,{through: 'UserFavoriteActors'})
Actor.belongsToMany(User,{through: 'UserFavoriteActors'})

User.belongsToMany(Director,{through: 'UserFavoriteDirectors'})
Director.belongsToMany(User,{through: 'UserFavoriteDirectors'})

User.belongsToMany(Producer,{through: 'UserFavoriteProducers'})
Producer.belongsToMany(User,{through: 'UserFavoriteProducers'})

User.belongsToMany(Movie,{through: 'UserFavoriteMovies'})
Movie.belongsToMany(User,{through: 'UserFavoriteMovies'})

User.belongsToMany(Studio,{through: 'UserFavoriteStudios'})
Studio.belongsToMany(User,{through: 'UserFavoriteStudios'})

async function testSq(){
    console.log("Trying to connect to db. User:"+process.env.PGUSER+" Pass: "+process.env.PGPASS)
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}



async function sync(){
  await sequelize.sync({ force: false });
  console.log("sinc")
}


module.exports.testSq = testSq;
module.exports.sync = sync;
module.exports.Movie = Movie;
module.exports.Actor = Actor;
module.exports.Director = Director;
module.exports.Producer = Producer;
module.exports.Studio = Studio;
module.exports.User = User;