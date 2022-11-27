const sql = require("./db.js");

const Animal = function(animal) {
  this.nom 		= animal.nom;
  this.age 		= animal.age;
  this.genre 	= animal.genre;
  this.race 	= animal.race; 
};


// *******************************************************
// Create a new Animal
// *******************************************************
Animal.create = (newAnimal, result) => {
  sql.query("INSERT INTO animal SET ?", newAnimal, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    //console.log("created animal: ", { id: res.insertId, ...newAnimal });
    result(null, { id: res.insertId, ...newAnimal });
  });
};


// *******************************************************
// Retrieve all Animals
// *******************************************************
Animal.getAll = (result) => {
  sql.query("SELECT a.id, a.nom, a.age, a.genre, a.race, a.maitre_id, h.nom as maitre_nom FROM animal a left join human h on a.maitre_id=h.id", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("animal: ", res);
    result(null, res);
  });
};


// *******************************************************
// Find a single Animal by Id
// *******************************************************
Animal.findById = (id, result) => {
  sql.query(`SELECT a.id, a.nom, a.age, a.genre, a.race, a.maitre_id, h.nom as maitre_nom FROM animal a left join human h on a.maitre_id=h.id where a.id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      //console.log("found animal: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};


// *******************************************************
// search all friends by ID
// *******************************************************
Animal.getAllFriends = (id, result) => {
  sql.query(`SELECT h.id,h.nom,h.age,h.genre FROM ami inner join human h on human_id=h.id WHERE animal_id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    //console.log("amis: ", res);
    result(null, res);
  });
};


// *******************************************************
// Update a Animal identified by the id in the request
// *******************************************************
Animal.updateById = (id, animal, result) => {
  var listVar = [];
  var listCol = []; 
  var reqSql  = "UPDATE animal SET";
  
  for(var name in animal) {
    listCol.push(" " + name + " = ?"); 
    listVar.push(animal[name]);
  }
  
  listVar.push(id);
  reqSql += listCol.join(', ') + " WHERE id = ? ";
  
  if (listCol.length)
    sql.query( reqSql, listVar,  
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {        
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("updated animal: ", { id: id, ...animal });
        result(null, { id: id, ...animal });
      }
    );
};


// *******************************************************
// Delete a Animal identified by the id in the request
// *******************************************************
Animal.remove = (id, result) => {
  sql.query("DELETE FROM animal WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {  
      result({ kind: "not_found" }, null);
      return;
    }

    sql.query( "DELETE FROM ami WHERE animal_id = ? ", id,  (err3, res3) => {
      if (err3) {
        console.log("error: ", err3);
        result(null, err3);
        return;
      }
    });    

    //console.log("deleted animal with id: ", id);
    result(null, res);
  });
};

module.exports = Animal;
