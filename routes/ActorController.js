const { authenticateToken } = require("../config/jwt");
const db = require("../sequelize")
const Actor = db.Actor

module.exports = (app) => {
    app.get("/actors", authenticateToken ,(req, res, next) => {
        Actor.findAll()
          .then((actor) => {
              res.status(200).send(JSON.stringify(actor,null, 2));
          });
        });
    app.get("/actors/:actorId", (req, res, next) => {
        Actor.findByPk(req.params.actorId)
            .then((actor) => {
                let response = actor != null ? actor : 'Ator não encontrado'
                res.status(200).send(JSON.stringify(response,null, 2));
            });
        });
    app.post("/actors/create", async (req, res, next) => {
        try {
           const actor = await Actor.create({
                name: req.body.name,
                nationality: req.body.nationality,
                birthday: req.body.birthday,
                age: req.body.age,
                genre: req.body.genre,
                pictureUrl: req.body.imageUrl
            })
            res.status(200).send(JSON.stringify(actor,null,2))
        } catch (error) {
            res.status(400).send(JSON.stringify(error,null,2))
        }
        });
    app.put("/actors/update/:actorId", async (req, res, next) => {
            try {
                Actor.update({
                    name: req.body.name,
                    nationality: req.body.nationality,
                    birthday: req.body.birthday,
                    age: req.body.age,
                    genre: req.body.genre,
                    pictureUrl: req.body.imageUrl
                },{where:{id:req.params.actorId}})
                res.status(200).send(JSON.stringify('Actor successfully updated!',null,2))
            } catch (error) {
                res.status(400).send(JSON.stringify(error,null,2))
            }
            });
    app.delete("/actors/:actorId", async (req, res, next) => {
        try {
            Actor.destroy({where:{id:req.params.actorId}})
            res.status(200).send(JSON.stringify('Actor successfully deleted!',null,2))
        } catch (error) {
            res.status(400).send(JSON.stringify(error,null,2))
        }
        });
};
  