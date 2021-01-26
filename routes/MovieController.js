const { authenticateToken } = require("../Auth/authentication");
const db = require("../sequelize")

const Movie = db.Movie

module.exports = (app) => {
    app.get("/movie", (req, res, next) => {
        Movie.findAll()
          .then((movie) => {
              res.status(200).send(JSON.stringify(movie,null, 2));
          });
        });
    app.get("/movie/:movieId", (req, res, next) => {
        Movie.findByPk(req.params.movieId)
            .then((movie) => {
                let response = movie != null ? movie : 'Ator não encontrado'
                res.status(200).send(JSON.stringify(response,null, 2));
            });
        });
    app.post("/movie/create", async (req, res, next) => {
        try {
           const movie = await Movie.create({
            title: req.body.title,
            portuguese_title: req.body.portuguese_title,
            year: req.body.year,
            duration: req.body.duration,
            totalRecordingDays: req.body.totalRecordingDays,
            cost: req.body.cost,
            synopsis: req.body.synopsis,
            genre: req.body.genre,
            pictureUrl: req.body.pictureUrl,
            studioId: parseInt(req.body.studioId)
            })
            let movieActors = req.body.actors
            let movieDirectors = req.body.directors
            let movieProducers = req.body.producers
            addActorsToMovie(movie.id,movieActors)
            addDirectorsToMovie(movie.id,movieDirectors)
            addProducersToMovie(movie.id,movieProducers)

            res.status(200).send(JSON.stringify(movie,null,2))
        } catch (error) {
            res.status(400).send(JSON.stringify(error,null,2))
        }
        });
    app.put("/movie/update/:movieId", async (req, res, next) => {
            try {
               let movie= await Movie.update({
                    title: req.body.title,
                    portuguese_title: req.body.portuguese_title,
                    year: req.body.year,
                    duration: req.body.duration,
                    totalRecordingDays: req.body.totalRecordingDays,
                    cost: req.body.cost,
                    synopsis: req.body.synopsis,
                    genre: req.body.genre,
                    pictureUrl: req.body.pictureUrl,
                    studioId: req.body.studioId
                },{where:{id:req.params.movieId}})
                let movieActors = req.body.actors
                let movieDirectors = req.body.directors
                let movieProducers = req.body.producers

                addActorsToMovie(movie.id,movieActors)
                addDirectorsToMovie(movie.id,movieDirectors)
                addProducersToMovie(movie.id,movieProducers)
                res.status(200).send(JSON.stringify('Movie successfully updated!',null,2))
            } catch (error) {
                res.status(400).send(JSON.stringify(error,null,2))
            }
            });
    app.delete("/movie/:movieId", async (req, res, next) => {
        try {
            Movie.destroy({where:{id:req.params.movieId}})
            res.status(200).send(JSON.stringify('Movie successfully deleted!',null,2))
        } catch (error) {
            res.status(400).send(JSON.stringify(error,null,2))
        }
        });
};

async function addActorsToMovie(movieId,actors){
    try{
        let movie = await Movie.findByPk(movieId)
        let movieActors = await db.Actor.findAll({
            where:{id:actors}
        })
        await movie.setActors(movieActors)
    }catch(err){
        console.log(err)
    }
   
}

async function addDirectorsToMovie(movieId,directors){
 try {
    let movie = await Movie.findByPk(movieId)
    let movieDirectors = await db.Director.findAll({
        where:{id:directors}
    })
    await movie.setDirectors(movieDirectors)
 } catch (error) {
     console.log(error)
 }
}

async function addProducersToMovie(movieId,producer){
    try {
        let movie = await Movie.findByPk(movieId)
        let movieProducers = await db.Producer.findAll({
            where:{id:producer}
        })
        await movie.setProducers(movieProducers)
    } catch (error) {
        console.log(error)
    }
}