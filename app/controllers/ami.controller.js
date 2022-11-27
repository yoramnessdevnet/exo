const Ami = require("../models/ami.model.js");
const Animal = require("../models/animal.model.js");
const Human = require("../models/human.model.js");

// *******************************************************
// Create a new friendship
// *******************************************************
exports.create = (req, res) => {    
  if (!Object.keys(req.body).length)                  
    res.status(400).send({ message: "Content can not be empty!" });
  else if (isNaN(req.body.animal_id))
    res.status(400).send({ message: "animal_id value not valid !" });  
  else if (isNaN(req.body.human_id))
    res.status(400).send({ message: "human_id value not valid !" });  
  else {
    const ami = new Ami({     
      animal_id  : req.body.animal_id,
      human_id   : req.body.human_id
    });

    // animal exist ?
    Animal.findById(req.body.animal_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") 
          res.status(404).send({ message: `Not found Animal with id ${req.body.animal_id}.` });
        else 
          res.status(500).send({ message: "Error retrieving Animal with id " + parseInt(req.body.animal_id) });
      } 
      else {
        // human exist ?
        Human.findById(req.body.human_id, (err2, data) => {
          if (err2) {
            if (err2.kind === "not_found") 
              res.status(404).send({ message: `Not found Human with id ${req.body.human_id}.` });
            else 
              res.status(500).send({ message: "Error retrieving Human with id " + parseInt(req.body.human_id) });
          } 
          else {
            Ami.create(ami, (err3, data) => {    
              if (err3)
                res.status(500).send({ message: err3.message || "Some error occurred while creating the friendship." });
              else 
                res.send(data);
            });
          }
        });
      }
    });
  }
};

// *******************************************************
// Delete a friendship with the specified id 
// *******************************************************
exports.delete = (req, res) => {    
  if (!Object.keys(req.body).length)                  
    res.status(400).send({ message: "Content can not be empty!" });
  else if (isNaN(req.body.animal_id))
    res.status(400).send({ message: "animal_id value not valid !" });  
  else if (isNaN(req.body.human_id))
    res.status(400).send({ message: "human_id value not valid !" });  
  else {
    const ami = new Ami({     
      animal_id  : req.body.animal_id,
      human_id   : req.body.human_id 
    });

    Ami.find(ami, (err, data) => {
      if (err) {
        if (err.kind === "not_found") 
          res.status(404).send({ message: `friendship not found.` });
        else 
          res.status(500).send({ message: "Error retrieving friendship" });
      } 
      else {
        Ami.remove(ami, (err2, data) => {    
          if (err2)
            res.status(500).send({ message: err2.message || "Some error occurred while creating the friendship." });
          else 
            res.send(data);
        });
      }
    });
  }
};
