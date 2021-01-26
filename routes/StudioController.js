const { authenticateToken } = require("../Auth/authentication");
const db = require("../sequelize")
const Studio = db.Studio

module.exports = (app) => {
    app.get("/studio" ,(req, res, next) => {
        Studio.findAll()
          .then((studio) => {
              res.status(200).send(JSON.stringify(studio,null, 2));
          });
        });
    app.get("/studio/:studioId", (req, res, next) => {
        Studio.findByPk(req.params.studioId)
            .then((studio) => {
                let response = studio != null ? studio : 'Ator não encontrado'
                res.status(200).send(JSON.stringify(response,null, 2));
            });
        });
    app.post("/studio/create", async (req, res, next) => {
        try {
           const studio = await Studio.create({
                name: req.body.name,
                creationDate: req.body.creationDate,
                founder: req.body.founder,
                nationality: req.body.nationality,
                city: req.body.city,
                numberOfMovies: req.body.numberOfMovies,
                pictureUrl: req.body.pictureUrl
            })
            res.status(200).send(JSON.stringify(studio,null,2))
        } catch (error) {
            res.status(400).send(JSON.stringify(error,null,2))
        }
        });
    app.put("/studio/update/:studioId", async (req, res, next) => {
            try {
                Studio.update({
                    name: req.body.name,
                    founder: req.body.founder,
                    creationDate: req.body.creationDate,
                    nationality: req.body.nationality,
                    city: req.body.city,
                    numberOfMovies: req.body.numberOfMovies,
                    pictureUrl: req.body.pictureUrl
                },{where:{id:req.params.studioId}})
                res.status(200).send(JSON.stringify('Studio successfully updated!',null,2))
            } catch (error) {
                res.status(400).send(JSON.stringify(error,null,2))
            }
            });
    app.delete("/studio/:studioId", async (req, res, next) => {
        try {
            Studio.destroy({where:{id:req.params.studioId}})
            res.status(200).send(JSON.stringify('Studio successfully deleted!',null,2))
        } catch (error) {
            res.status(400).send(JSON.stringify(error,null,2))
        }
        });
};
  