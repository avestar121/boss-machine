const express = require('express');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');
const { getAllFromDatabase, getFromDatabaseById, updateInstanceInDatabase, addToDatabase, deleteFromDatabasebyId, deleteAllFromDatabase } = require('./db');
const ideasRouter = express.Router();


ideasRouter.get('/', (req,res) => {
    res.send(getAllFromDatabase('ideas'))
  })
  
  ideasRouter.get('/:ideaId', (req,res) => {
    const individualIdea = getFromDatabaseById('ideas', req.params.ideaId)
    if(!individualIdea){
      res.status(404).send()
    }
    res.status(200).send(individualIdea)
  })
  
  ideasRouter.put('/:ideaId', (req,res) => {
    const ideaId = req.params.ideaId
    const ideasArr = getAllFromDatabase('ideas')
    const ideaIndex = ideasArr.findIndex(idea => idea.id === ideaId)
  
    if (ideaIndex === -1) {
      return res.status(404).send('Idea not found');
    }
  
    const updatedIdea = {...ideasArr[ideaIndex], name: req.body.name}
    let updatedIdeaInstance = updateInstanceInDatabase('ideas', updatedIdea);
    res.status(200).send(updatedIdea)
    
  })
  
  ideasRouter.post('/', checkMillionDollarIdea, (req,res) => {
    const ideaToAdd = {
      id:req.body.id,
      name:req.body.name,
      description: req.body.description,
      numWeeks: req.body.numWeeks,
      weeklyRevenue: req.body.weeklyRevenue,
    }
    const ideaAdded = addToDatabase('ideas', ideaToAdd)
    res.status(201).send(ideaAdded)
  })
  
  ideasRouter.delete('/:ideaId', (req, res, next) => {
    const ideaId = req.params.ideaId
    const ideasArr = getAllFromDatabase('ideas')
    const ideaIndex = ideasArr.findIndex(idea => idea.id === ideaId)
  
    if (ideaIndex === -1) {
      return res.status(404).send('Idea not found');
    }
  
    const deleted = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(500).send();
    }
  });

module.exports = ideasRouter
