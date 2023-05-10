const express = require('express');
const millionRouter = express.Router()



const checkMillionDollarIdea = (req, res, next) => {
    const {numWeeks, weeklyRevenue} = req.body
    const fullSum = Number(numWeeks) * Number(weeklyRevenue)
    if(!numWeeks || !weeklyRevenue || isNaN(fullSum) || fullSum < 1000000){
        res.status(400).send()
    } else {
        next()
    }
};

module.exports = checkMillionDollarIdea;
