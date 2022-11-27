module.exports = app => { 
  
  const animal 	= require("../controllers/animal.controller.js");
  var router_animal 	= require("express").Router();
  router_animal.post(  "/",          animal.create);                    
  router_animal.get(   "/",          animal.findAll);                   
  router_animal.get(   "/:id",       animal.findOne);  
  router_animal.get(   "/:id/amis",  animal.findFriends);                    
  router_animal.put(   "/:id",       animal.update);                    
  router_animal.delete("/:id",       animal.delete);
  app.use('/api/animal', router_animal);

  const human 	= require("../controllers/human.controller.js");
  var router_human 	= require("express").Router();
  router_human.post(  "/",           		    human.create);                   
  router_human.get(   "/",           		    human.findAll);                  
  router_human.get(   "/:id",        		    human.findOne);   
  router_human.get(   "/:id/est_maitre_de",	human.findAnimals);                  
  router_human.get(   "/:id/amis",			      human.findFriends);   
  router_human.put(   "/:id",        		    human.update);                   
  router_human.delete("/:id",        		    human.delete);                   
  app.use('/api/human', router_human);   

  const ami 	= require("../controllers/ami.controller.js");
  var router_ami 	= require("express").Router();
  router_ami.post(  "/",       ami.create);                    
  router_ami.delete("/",       ami.delete);
  app.use('/api/ami', router_ami);

};
