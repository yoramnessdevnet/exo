const Human = require("../models/human.model.js");

// *******************************************************
// Create a new Human
// *******************************************************
exports.create = (req, res) => {      
  if (!Object.keys(req.body).length)                  
    res.status(400).send({ message: "Content can not be empty!" });
  else if (isNaN(req.body.age))
    res.status(400).send({ message: "Age not valid !" });
  else if (req.body.genre!='M' && req.body.genre!='F')
    res.status(400).send({ message: "Gender not valid (M/F) !" });  
  else {
    const human = new Human({       
      nom   : req.body.nom,
      age   : req.body.age,
      genre : req.body.genre
    });

    Human.create(human, (err, data) => { 
      if (err)
        res.status(500).send({ message: err.message || "Some error occurred while creating the Human." });
      else 
        res.send(data);
    });
  }
};


// *******************************************************
// Retrieve all Humans
// *******************************************************
exports.findAll = (req, res) => {         
  Human.getAll((err, data) => {
    if (err)
      res.status(500).send({ message: err.message || "Some error occurred." });
    else 
      res.send(data);
  });
};


// *******************************************************
// Find a single Human by Id
// *******************************************************
exports.findOne = (req, res) => {          
  if(isNaN(req.params.id))  {
    res.status(400).send({ message: "ID must be a number !" }); 
  }
  else {
    Human.findById(parseInt(req.params.id), (err, data) => {
      if (err) {
        if (err.kind === "not_found") 
          res.status(404).send({ message: `Not found Human with id ${req.params.id}.` });
        else 
          res.status(500).send({ message: "Error retrieving Human with id " + parseInt(req.params.id) });
      } 
      else 
        res.send(data);
    });
  }
};


// *******************************************************
// find all animals of which the human is master
// *******************************************************
exports.findAnimals = (req, res) => {    
  if(isNaN(req.params.id))  {
    res.status(400).send({ message: "ID must be a number !" });
  }
  else {   
    Human.getAllAnimals(req.params.id, (err, data) => {
      if (err)
        res.status(500).send({ message: err.message || "Some error occurred." });
      else 
        res.send(data);
    });
  }
};


// *******************************************************
// search animal friends
// *******************************************************
exports.findFriends = (req, res) => {    
  if(isNaN(req.params.id))  {
    res.status(400).send({ message: "ID must be a number !" });
  }
  else {   
    Human.getAllFriends(req.params.id, (err, data) => {
      if (err)
        res.status(500).send({ message: err.message || "Some error occurred while retrieving animals." });
      else 
        res.send(data);
    });
  }
};


// *******************************************************
// Update a Human identified by the id in the request
// *******************************************************
exports.update = (req, res) => {           
  var flagOK = 1;

  if (!Object.keys(req.body).length) {     
    res.status(400).send({ message: "Body content can not be empty !" });
    flagOK = 0;
  }
  
  if(isNaN(req.params.id))  {
    res.status(400).send({ message: "ID must be a number !" });
    flagOK = 0;
  }

  const cols = ['nom', 'age', 'genre'];

  for(var name in req.body) {
    if (req.body[name]=='') {
      flagOK = 0;
      res.status(400).send({ message: name + " not valid value !" });
    }
    else if ((name=='age') && isNaN(req.body[name]) ) {
      flagOK = 0;
      res.status(400).send({ message: name + ":" + req.body[name] + " not valid value !" });
    }
    else if (!cols.includes(name)) {
      flagOK = 0;
      res.status(400).send({ message: name + " is not valid !" });
    }
    else if (name=='genre' && req.body[name]!='M' && req.body[name]!='F')  {
      flagOK = 0;
      res.status(400).send({ message: "genre " + req.body[name] + " not valid value !" });
    }
  }

  if (flagOK==1)
    Human.updateById(
        req.params.id, req.body, // update only columns in body !
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") 
              res.status(404).send({ message: `Not found Human with id ${req.params.id}.` });
            else 
              res.status(500).send({ message: "Error updating Human with id " + req.params.id });
          } 
          else 
            res.send(data);
        }
      );
};


// *******************************************************
// Delete a Human with the specified id in the request
// *******************************************************
exports.delete = (req, res) => {              
  if(isNaN(req.params.id))  {
    res.status(400).send({ message: "ID must be a number !" });
  } else {
    Human.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") 
          res.status(404).send({ message: "Not found Human with id " + req.params.id });
        else 
          res.status(500).send({ message: "Could not delete Human with id " + req.params.id });
      } 
      else 
        res.send({ message: "Human id " + req.params.id + " was deleted successfully!" });
    });
  }
};

