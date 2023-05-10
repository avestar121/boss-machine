const express = require('express');
const { getAllFromDatabase, addToDatabase, deleteAllFromDatabase, createMeeting } = require('./db');
const meetingsRouter = express.Router();


meetingsRouter.get('/', (req, res) => {
    const meetingsRes = getAllFromDatabase('meetings')
    res.status(200).send(meetingsRes)
  })
  
meetingsRouter.post('/', (req,res) => {
    let newMeeting = addToDatabase('meetings', createMeeting())
    res.status(201).send(newMeeting)
  })
  
meetingsRouter.delete('/', (req,res) => {
    res.status(204).send(deleteAllFromDatabase('meetings'))
  })


module.exports = meetingsRouter;