const { authenticateToken, autheticateAdmin } = require("../Auth/authentication");
const { QueryTypes } = require('sequelize');
const db = require("../sequelize")
const Producer = db.Producer

module.exports = (app) => {
    app.get("/producer", (req, res, next) => {
        Producer.findAll()
          .then((producer) => {
              res.status(200).send(JSON.stringify(producer,null, 2));
          });
        });
    app.get("/producer/:producerId",authenticateToken,autheticateAdmin, (req, res, next) => {
        Producer.findByPk(req.params.producerId)
            .then((producer) => {
                let response = producer != null ? producer : 'Ator não encontrado'
                res.status(200).send(JSON.stringify(response,null, 2));
            });
        });
    app.get("/search/producer/:producerName",async (req, res, next) => {
            try {
                const records = await db.sequelize.
                query(`select * from producers d 
                where d."name" ilike '%${req.params.producerName}%'
                order by d.name`,{type: QueryTypes.SELECT})
                 res.status(200).send(JSON.stringify(records,null, 2));
            } catch (error) {
                res.status(500).send(error.message)
            }});
    app.post("/producer/create",authenticateToken,autheticateAdmin, async (req, res, next) => {
        try {
           const producer = await Producer.create({
                name: req.body.name,
                nationality: req.body.nationality,
                birthday: req.body.birthday,
                age: req.body.age,
                genre: req.body.genre,
                pictureUrl: req.body.imageUrl
            })
            res.status(200).send(JSON.stringify(producer,null,2))
        } catch (error) {
            res.status(400).send(JSON.stringify(error,null,2))
        }
        });
    app.put("/producer/update/:producerId",authenticateToken,autheticateAdmin, async (req, res, next) => {
            try {
                Producer.update({
                    name: req.body.name,
                    nationality: req.body.nationality,
                    birthday: req.body.birthday,
                    age: req.body.age,
                    genre: req.body.genre,
                    pictureUrl: req.body.imageUrl
                },{where:{id:req.params.producerId}})
                res.status(200).send(JSON.stringify('Producer successfully updated!',null,2))
            } catch (error) {
                res.status(400).send(JSON.stringify(error,null,2))
            }
            });
    app.delete("/producer/:producerId",authenticateToken,autheticateAdmin, async (req, res, next) => {
        try {
            Producer.destroy({where:{id:req.params.producerId}})
            res.status(200).send(JSON.stringify('Producer successfully deleted!',null,2))
        } catch (error) {
            res.status(400).send(JSON.stringify(error,null,2))
        }
        });
};
  