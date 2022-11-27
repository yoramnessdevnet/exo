const Animal = require("../models/animal.model.js");
const Human = require("../models/human.model.js");

// *******************************************************
// Create a new Animal
// *******************************************************
exports.create = (req, res) => {    
  if (!Object.keys(req.body).length)                  
    res.status(400).send({ message: "Content can not be empty!" });
  else if (isNaN(req.body.age))
    res.status(400).send({ message: "Age not valid !" });
  else if (req.body.genre!='M' && req.body.genre!='F')
    res.status(400).send({ message: "Gender not valid (M/F) !" });    
  else {
    const animal = new Animal({     
      nom   : req.body.nom,
      age   : req.body.age,
      genre : req.body.genre,
      race  : req.body.race,
    });
  
    Animal.create(animal, (err, data) => {    
      if (err)
        res.status(500).send({ message: err.message || "Some error occurred while creating the Animal." });
      else 
        res.send(data);
    });
  }
};


// *******************************************************
// Retrieve all Animals
// *******************************************************
exports.findAll = (req, res) => {   
  Animal.getAll((err, data) => {
    if (err)
      res.status(500).send({ message: err.message || "Some error occurred while retrieving animals." });
    else 
      res.send(data);
  });
};


// *******************************************************
// Find a single Animal by Id
// *******************************************************
exports.findOne = (req, res) => {          
  if(isNaN(req.params.id))  {
    res.status(400).send({ message: "ID must be a number !" });
  }
  else {
    Animal.findById(parseInt(req.params.id), (err, data) => {
      if (err) {
        if (err.kind === "not_found") 
          res.status(404).send({ message: `Not found Animal with id ${req.params.id}.` });
        else 
          res.status(500).send({ message: "Error retrieving Animal with id " + parseInt(req.params.id) });
      } 
      else 
        res.send(data);
    });
  }
};


// *******************************************************
// search all friends by ID
// *******************************************************
exports.findFriends = (req, res) => {    
  if(isNaN(req.params.id))  {
    res.status(400).send({ message: "ID must be a number !" });
  }
  else {   
    Animal.getAllFriends(req.params.id, (err, data) => {
      if (err)
        res.status(500).send({ message: err.message || "Some error occurred while retrieving humans." });
      else 
        res.send(data);
    });
  }
};


// *******************************************************
// Update a Animal identified by the id in the request
// *******************************************************
exports.update = (req, res) => {           
  var flagOK = 1;

  if (!Object.keys(req.body).length) {     
    res.status(400).send({ message: "Content can not be empty!" });
    flagOK = 0;
  }
  
  if(isNaN(req.params.id))  {
    res.status(400).send({ message: "ID must be a number !" });
    flagOK = 0;
  }

  const cols = ['nom', 'age', 'genre', 'race', 'maitre_id'];

  for(var name in req.body) {
    if (req.body[name]=='') {
      flagOK = 0;
      res.status(400).send({ message: name + " not valid value !" });
    }
    else if ((name=='age' || name=='maitre_id') && isNaN(req.body[name]) ) {
      flagOK = 0;
      res.status(400).send({ message: name +":" + req.body[name] + " not valid value !" });
    }
    else if (!cols.includes(name)) {
      flagOK = 0;
      res.status(400).send({ message: name + " is not valid !" });
    }
    else if (name=='genre' && req.body[name]!='M' && req.body[name]!='F')  {
      flagOK = 0;
      res.status(400).send({ message: "genre " + req.body[name] + " not valid value !" });
    }
    else if (name=='maitre_id') {
      Human.findById(parseInt(req.body[name]), (err, data) => {
        if (err) {
          flagOK = 0;
          res.status(400).send({ message: "maitre_id " + req.body[name] + " not valid value !" });
        } 
      });
    }
  }

  if (flagOK==1)
      Animal.updateById(
        req.params.id, req.body, // update only columns in body
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") 
              res.status(404).send({ message: `Not found Animal with id ${req.params.id}.` });
            else 
              res.status(500).send({ message: "Error updating Animal with id " + req.params.id });
          } 
          else 
            res.send(data);
        }
      );
};


// *******************************************************
// Delete a Animal with the specified id 
// ******************************************************* 
exports.delete = (req, res) => {              
  if(isNaN(req.params.id))  {
    res.status(400).send({ message: "ID must be a number !" });
  } else {
    Animal.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") 
          res.status(404).send({ message: "Not found Animal with id " + req.params.id });
        else 
          res.status(500).send({ message: "Could not delete Animal with id " + req.params.id });
      } 
      else 
        res.send({ message: "Animal id " + req.params.id + " was deleted successfully!" });
    });
  }
};
