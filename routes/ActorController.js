const { authenticateToken, autheticateAdmin } = require("../Auth/authentication");
const { QueryTypes } = require('sequelize');
const db = require("../sequelize")
const Actor = db.Actor

module.exports = (app) => {
    app.get("/actors",(req, res, next) => {
        Actor.findAll({order:[['name','ASC']]})
          .then((actor) => {
              res.status(200).send(JSON.stringify(actor,null, 2));
          });
        });
        
    app.get("/search/actors/:actorName",async (req, res, next) => {
        try {
            const records = await db.sequelize.
            query(`select * from actors a 
            where a."name" ilike '%${req.params.actorName}%'
            order by a.name`,{type: QueryTypes.SELECT})
             res.status(200).send(JSON.stringify(records,null, 2));
        } catch (error) {
            res.status(500).send(error.message)
        }});
    app.get("/actors/:actorId", authenticateToken,autheticateAdmin,(req, res, next) => {
        Actor.findByPk(req.params.actorId)
            .then((actor) => {
                let response = actor != null ? actor : 'Ator não encontrado'
                res.status(200).send(JSON.stringify(response,null, 2));
            });
        });
    app.post("/actors/create",authenticateToken,autheticateAdmin, async (req, res, next) => {
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
    app.put("/actors/update/:actorId",authenticateToken,autheticateAdmin, async (req, res, next) => {
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
    app.delete("/actors/:actorId",authenticateToken,autheticateAdmin, async (req, res, next) => {
        try {
            Actor.destroy({where:{id:req.params.actorId}})
            res.status(200).send(JSON.stringify('Actor successfully deleted!',null,2))
        } catch (error) {
            res.status(400).send(JSON.stringify(error,null,2))
        }
        });
};
  