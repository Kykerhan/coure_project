const mongoose = require("mongoose");
const Person = require("../models/Person");

let personController = {};

let isAdmin = false;
// Show list of persons
personController.list = function(req, res) {
  isAdmin = (req.user.role === "admin");
  Person.find({}).exec(function (err, persons) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/persons/index", {persons: persons, admin: isAdmin});
    }
  });
};

// Show employee by id
personController.show = function(req, res) {
  isAdmin = (req.user.role === "admin");
  Person.findOne({_id: req.params.id}).exec(function (err, person) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/persons/show", {person: person, admin: isAdmin});
    }
  });
};

// Create new employee
personController.create = function(req, res) {
  res.render("../views/persons/create");
};

// Save new employee
personController.save = function(req, res) {
  isAdmin = (req.user.role === "admin");
  var person = new Person(req.body);

  person.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/persons/create");
    } else {
      console.log("Successfully created an person.");
      res.redirect("/persons/show/"+person._id);
    }
  });
};

// Edit an person
personController.edit = function(req, res) {
  isAdmin = (req.user.role === "admin");
  if(!isAdmin){
    return res.redirect('/dashboard');
  }
  Person.findOne({_id: req.params.id}).exec(function (err, person) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      return res.render("../views/persons/edit", {person: person});
    }
  });
};

// Update an person
personController.update = function(req, res) {
  Person.findByIdAndUpdate(req.params.id, { $set: {
    name: req.body.name, position: req.body.position,
      address: req.body.address, phone: req.body.phone,
      surname: req.body.surname, email: req.body.email
    }}, { new: true }, function (err, person) {
    if (err) {
      console.log(err);
     return res.render("../views/persons/edit", {person: req.body});
    }
    return res.redirect("/persons/show/"+person._id);
  });
};

// Delete an person
personController.delete = function(req, res) {
  Person.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Person deleted!");
      res.redirect("/persons");
    }
  });
};

module.exports = personController;
