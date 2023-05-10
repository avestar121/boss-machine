const express = require('express');
const { getAllFromDatabase, getFromDatabaseById, updateInstanceInDatabase, addToDatabase, deleteFromDatabasebyId, deleteAllFromDatabase, createMeeting } = require('./db');
const ideasRouter = require('./ideasRouter');
const meetingsRouter = require('./meetingsRouter');
const minionsRouter = require('./minionsRouter');
const apiRouter = express.Router();

apiRouter.use('/minions', minionsRouter )
apiRouter.use('/ideas', ideasRouter)
apiRouter.use('/meetings', meetingsRouter)




module.exports = apiRouter;
