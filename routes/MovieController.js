const { authenticateToken } = require("../config/jwt");
const db = require("../sequelize")

const Movie = db.Movie

module.exports = (app) => {
    app.get("/movie", authenticateToken ,(req, res, next) => {
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
            year: req.body.year,
            duration: req.body.duration,
            totalRecordingDays: req.body.totalRecordingDays,
            cost: req.body.cost,
            synopsis: req.body.synopsis,
            genre: req.body.genre,
            pictureUrl: req.body.pictureUrl,
            StudioId: req.body.StudioId
            })
            let movieActors = req.body.actors
            let movieDirectors = req.body.directors
            let movieProducers = req.body.producers

            addActorsToMovie(movie.id,movieActors)
            addDirectorsToMovie(movie,movieDirectors)
            addProducersToMovie(movie,movieProducers)

            res.status(200).send(JSON.stringify(movie,null,2))
        } catch (error) {
            res.status(400).send(JSON.stringify(error,null,2))
        }
        });
    app.put("/movie/update/:movieId", async (req, res, next) => {
            try {
                Movie.update({
                    title: req.body.title,
                    year: req.body.year,
                    duration: req.body.duration,
                    totalRecordingDays: req.body.totalRecordingDays,
                    cost: req.body.cost,
                    synopsis: req.body.synopsis,
                    genre: req.body.genre,
                    pictureUrl: req.body.pictureUrl,
                    StudioId: req.body.StudioId
                },{where:{id:req.params.movieId}})
                let movieActors = req.body.actors
                let movieDirectors = req.body.directors
                let movieProducers = req.body.producers
    
                addActorsToMovie(movie.id,movieActors)
                addDirectorsToMovie(movie,movieDirectors)
                addProducersToMovie(movie,movieProducers)
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
    let movie = await Movie.findByPk(movieId)
    let movieActors = await db.Actor.findAll({
        where:{id:actors}
    })
    await movie.setActors(movieActors)
}

async function addDirectorsToMovie(movieId,directors){
    let movie = await Movie.findByPk(movieId)
    let movieDirectors = await db.Director.findAll({
        where:{id:directors}
    })
    await movie.setDirectors(movieDirectors)
}

async function addProducersToMovie(movieId,producer){
    let movie = await Movie.findByPk(movieId)
    let movieProducers = await db.Producer.findAll({
        where:{id:producer}
    })
    await movie.setProducers(movieProducers)
}