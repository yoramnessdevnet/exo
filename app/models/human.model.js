const sql = require("./db.js");

const Human = function(human) {
  this.nom 		= human.nom;
  this.age 		= human.age;
  this.genre 	= human.genre;
};


// *******************************************************
// Create a new Human
// *******************************************************
Human.create = (newHuman, result) => {
  sql.query("INSERT INTO human SET ?", newHuman, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created human: ", { id: res.insertId, ...newHuman });
    result(null, { id: res.insertId, ...newHuman });
  });
};


// *******************************************************
// Retrieve all Humans
// *******************************************************
Human.getAll = (result) => {
  sql.query("SELECT id, nom, age, genre FROM human", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("human: ", res);
    result(null, res);
  });
};


// *******************************************************
// Find a single Human by Id
// *******************************************************
Human.findById = (id, result) => {
  sql.query(`SELECT * FROM human WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found human: ", res[0]); 
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};


// *******************************************************
// find all animals of which the human is master
// *******************************************************
Human.getAllAnimals = (id, result) => {
  sql.query(`SELECT id,nom,age,genre,race FROM animal WHERE maitre_id = ${id}`, (err, res) => {
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
// search animal friends
// *******************************************************
Human.getAllFriends = (id, result) => {
  sql.query(`SELECT a.id,a.nom,a.age,a.genre,a.race FROM ami inner join animal a on animal_id=a.id WHERE human_id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("amis: ", res);
    result(null, res);
  });
};


// *******************************************************
// Update a Human identified by the id in the request
// *******************************************************
Human.updateById = (id, human, result) => {
  var listVar = [];
  var listCol = []; 
  var reqSql  = "UPDATE human SET";
  
    for(var name in human) {
      listCol.push(" " + name + " = ?"); 
      listVar.push(human[name]);
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

        console.log("updated human: ", { id: id, ...human });
        result(null, { id: id, ...human });
      }
    );
};

// *******************************************************
// Delete a Human with the specified id in the request
// *******************************************************
Human.remove = (id, result) => {
  sql.query("DELETE FROM human WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {        // not found Human with the id
      result({ kind: "not_found" }, null);
      return;
    }
    
    sql.query( "UPDATE animal SET maitre_id = ? where maitre_id = ?", [0,id],  (err2, res2) => {
      if (err2) {
        console.log("error: ", err2);
        result(null, err2);
        return;
      }
    });

    sql.query( "DELETE FROM ami WHERE human_id = ? ", id,  (err3, res3) => {
      if (err3) {
        console.log("error: ", err3);
        result(null, err3);
        return;
      }
    });    

    console.log("deleted human with id: ", id);
    result(null, res);  
  });
};

module.exports = Human;
