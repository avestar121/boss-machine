const express = require('express');
const { getAllFromDatabase, getFromDatabaseById, updateInstanceInDatabase, addToDatabase, deleteFromDatabasebyId, deleteAllFromDatabase } = require('./db');
const minionsRouter = express.Router();

minionsRouter.get('/', (req, res) => {
    const minionsRes = getAllFromDatabase('minions')
    res.status(200).send(minionsRes)
  })

minionsRouter.get('/:minionId', (req,res) => {
  const individualMinion = getFromDatabaseById('minions', req.params.minionId)
  if(!individualMinion){
    res.status(404).send()
  }
  res.status(200).send(individualMinion)
})

minionsRouter.put('/:minionId', (req,res) => {
  const minionId = req.params.minionId
  const minionsArr = getAllFromDatabase('minions')
  const minionIndex = minionsArr.findIndex(minion => minion.id === minionId)

  if (minionIndex === -1) {
    return res.status(404).send('Minion not found');
  }

  const updatedMinion = {...minionsArr[minionIndex], name: req.body.name}
  let updatedMinionInstance = updateInstanceInDatabase('minions', updatedMinion);
  res.status(200).send(updatedMinion)
  
})

minionsRouter.post('/', (req,res) => {
  const minionToAdd = {
    id:req.body.id,
    name:req.body.name,
    title:req.body.title,
    salary:req.body.salary
  }
  const minionAdded = addToDatabase('minions', minionToAdd)
  res.status(201).send(minionToAdd)
})

minionsRouter.delete('/:minionId', (req, res, next) => {
  const minionId = req.params.minionId
  const minionsArr = getAllFromDatabase('minions')
  const minionIndex = minionsArr.findIndex(minion => minion.id === minionId)

  if (minionIndex === -1) {
    return res.status(404).send('Minion not found');
  }

  const deleted = deleteFromDatabasebyId('minions', req.params.minionId);
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(500).send();
  }
});

module.exports = minionsRouter;