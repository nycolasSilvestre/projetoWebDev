const { authenticateToken, autheticateAdmin } = require("../Auth/authentication");
const { QueryTypes } = require('sequelize');
const db = require("../sequelize")

const Movie = db.Movie

module.exports = (app) => {
    app.get("/movie", async (req, res, next) => {
        const records = await db.sequelize.query(`select m.id, m.portuguese_title,
        m."year",m.genre,m."pictureUrl", m."cost" ,m."totalRecordingDays",string_agg(d."name",', ') as directors
        ,string_agg(a."name",', ') as actors
        from movies m 
        left join "DirectorMovies" dm on dm."movieId" = m.id 
        left join "ActorMovies" am on am."movieId" =m.id 
        left join directors d on d.id =dm."directorId" 
        left join actors a on a.id = am."actorId" 
        group by m.id, m.portuguese_title ,m."year",m.genre,m."pictureUrl", m."cost" ,m."totalRecordingDays"
        order by m.portuguese_title asc`,
        {type: QueryTypes.SELECT})
        res.status(200).send(JSON.stringify(records,null, 2))
        });
    app.get("/movie/:movieId", authenticateToken,autheticateAdmin ,(req, res, next) => {
        Movie.findByPk(req.params.movieId)
            .then((movie) => {
                let response = movie != null ? movie : 'Filme não encontrado'
                res.status(200).send(JSON.stringify(response,null, 2));
            });
        });
    app.get("/search/movie/:name", async (req, res, next) => {
            const records = await db.sequelize.
            query(`select * from movies m 
            where m.portuguese_title ilike '%${req.params.name}%' or m.title ilike '%${req.params.name}%'
            order by m.portuguese_title`,
            {type: QueryTypes.SELECT})
             res.status(200).send(JSON.stringify(records,null, 2))
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
    app.put("/movie/update/:movieId",authenticateToken,autheticateAdmin ,async (req, res, next) => {
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

                addActorsToMovie(req.params.movieId,movieActors)
                addDirectorsToMovie(req.params.movieId,movieDirectors)
                addProducersToMovie(req.params.movieId,movieProducers)
                res.status(200).send(JSON.stringify('Movie successfully updated!',null,2))
            } catch (error) {
                res.status(400).send(JSON.stringify(error,null,2))
            }
            });
    app.delete("/movie/:movieId",authenticateToken,autheticateAdmin, async (req, res, next) => {
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