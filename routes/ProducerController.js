const { authenticateToken } = require("../Auth/authentication");
const db = require("../sequelize")
const Producer = db.Producer

module.exports = (app) => {
    app.get("/producer", authenticateToken ,(req, res, next) => {
        Producer.findAll()
          .then((producer) => {
              res.status(200).send(JSON.stringify(producer,null, 2));
          });
        });
    app.get("/producer/:producerId", (req, res, next) => {
        Producer.findByPk(req.params.producerId)
            .then((producer) => {
                let response = producer != null ? producer : 'Ator não encontrado'
                res.status(200).send(JSON.stringify(response,null, 2));
            });
        });
    app.post("/producer/create", async (req, res, next) => {
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
    app.put("/producer/update/:producerId", async (req, res, next) => {
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
    app.delete("/producer/:producerId", async (req, res, next) => {
        try {
            Producer.destroy({where:{id:req.params.producerId}})
            res.status(200).send(JSON.stringify('Producer successfully deleted!',null,2))
        } catch (error) {
            res.status(400).send(JSON.stringify(error,null,2))
        }
        });
};
  