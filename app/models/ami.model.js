const sql = require("./db.js");

const Ami = function(ami) {
  this.animal_id  = ami.animal_id,
  this.human_id   = ami.human_id
};

// *******************************************************
// Create a friendship
// *******************************************************
Ami.create = (newAmi, result) => {
  sql.query("INSERT INTO ami SET ?", newAmi, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created friendship: ", { id: res.insertId, ...newAmi });
    result(null, { id: res.insertId, ...newAmi });
  });
};

// *******************************************************
// Find a friendship
// *******************************************************
Ami.find = (newAmi, result) => {
  sql.query("SELECT * FROM ami WHERE animal_id=? and human_id=?", [newAmi.animal_id, newAmi.human_id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    
    if (res.length) {
      //console.log("found friendship: ", res[0]);
      result(null, res[0]); 
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

// *******************************************************
// Delete a friendship
// *******************************************************
Ami.remove = (newAmi, result) => {
  sql.query("DELETE FROM ami WHERE animal_id=? and human_id=?", [newAmi.animal_id, newAmi.human_id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("deleted friendship " + newAmi.animal_id + " / " +newAmi.human_id);
    result(null, res);
  });
};

module.exports = Ami;
