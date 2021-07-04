const express = require('express');
const router = express.Router();
const person = require("../controllers/PersonController.js");
const { ensureAuthenticated, ensureAdmin } = require('../config/auth');

// Get all persons
router.get('/', ensureAuthenticated, function(req, res) {
  person.list(req, res);
});

// Get single person by id
router.get('/show/:id', ensureAuthenticated, function(req, res) {
  person.show(req, res);
});

// Create person
router.get('/create', ensureAdmin, function(req, res) {
  person.create(req, res);
});

// Save person
router.post('/save', ensureAdmin, function(req, res) {
  person.save(req, res);
});

// Edit person
router.get('/edit/:id',  ensureAdmin, function(req, res) {
  person.edit(req, res);
});

// Edit update
router.post('/update/:id',  ensureAdmin, function(req, res) {
  person.update(req, res);
});

// Edit update
router.post('/delete/:id',  ensureAdmin, function(req, res, next) {
  person.delete(req, res);
});

module.exports = router;
