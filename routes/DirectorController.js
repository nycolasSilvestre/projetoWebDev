const { authenticateToken } = require("../config/jwt");
const db = require("../sequelize")
const Director = db.Director

module.exports = (app) => {
    app.get("/director", (req, res, next) => {
        Director.findAll()
          .then((director) => {
              res.status(200).send(JSON.stringify(director,null, 2));
          });
        });
    app.get("/director/:directorId", (req, res, next) => {
        Director.findByPk(req.params.directorId)
            .then((director) => {
                let response = director != null ? director : 'Ator não encontrado'
                res.status(200).send(JSON.stringify(response,null, 2));
            });
        });
    app.post("/director/create", async (req, res, next) => {
        try {
           const director = await Director.create({
                name: req.body.name,
                nationality: req.body.nationality,
                birthday: req.body.birthday,
                age: req.body.age,
                genre: req.body.genre,
                pictureUrl: req.body.imageUrl
            })
            res.status(200).send(JSON.stringify(director,null,2))
        } catch (error) {
            res.status(400).send(JSON.stringify(error,null,2))
        }
        });
    app.put("/director/update/:directorId", async (req, res, next) => {
            try {
                Director.update({
                    name: req.body.name,
                    nationality: req.body.nationality,
                    birthday: req.body.birthday,
                    age: req.body.age,
                    genre: req.body.genre,
                    pictureUrl: req.body.imageUrl
                },{where:{id:req.params.directorId}})
                res.status(200).send(JSON.stringify('Director successfully updated!',null,2))
            } catch (error) {
                res.status(400).send(JSON.stringify(error,null,2))
            }
            });
    app.delete("/director/:directorId", async (req, res, next) => {
        try {
            Director.destroy({where:{id:req.params.directorId}})
            res.status(200).send(JSON.stringify('Director successfully deleted!',null,2))
        } catch (error) {
            res.status(400).send(JSON.stringify(error,null,2))
        }
        });
};
  