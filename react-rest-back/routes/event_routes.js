const express = require('express');
const router = express.Router();
const Event = require('../models/events');
const mongoose = require('mongoose');
const authorize = require('../authentication/middleware/authorize');

mongoose.Promise = global.Promise;

//get all events
router.get('/', (req, res) => {
    // const now = new Date();

    Event.find({
        // date_time: {$gte: now}
    })
        .then(shop => { res.json(shop); })
        .catch(err => {
            res.status(400).json({ err });
        })
});

// get all events by date specified
router.get('/date', (req, res) => {
    function zeroTime(d) {
        d.setHours(0);
        d.setMinutes(0);
        d.setSeconds(0);
        return d;
    }
    minDate = zeroTime(new Date(req.query.minDate));
    maxDate = zeroTime(new Date(req.query.maxDate));
    Event.find({
        date_time: { $gte: minDate, $lte: maxDate, }
    })
        .then(event => {
            res.json(event);
        })
        .catch(err => {
            console.log(err);
            res.status(400)
                .json({ err });
        })
})

//get element by id number
router.get('/:event_id', (req, res) => {
    Event.findById(req.params.event_id)
        .populate('attendees')
        .then(updated => {
            res.json(updated)
        })
        .catch(err => res.status(500).json(err));

});

//get event by time period
router.get('/time', (req, res) => {
    console.log(req)
    Event.find({day_period : req.query.day_period})
        .then(event => {
            res.json(event)
            console.log(event)
        })
        .catch(err => {
            res.status(400)
                .json({ err })
                console.log('oops')
        })
});


//CREATE a new event
router.post('/', (req, res) => {
    let object = req.body
    console.log('This is req.body:');
    let newEvent = Event({
        name: object.name,
        date_time: object.date_time,
        location_start: object.location_start,
        minPace: object.minPace,
        maxPace: object.maxPace,
        distance: object.distance,
        bag: object.bag,
        men: object.men,
        women: object.women,
        comment: object.comment,
        username: object.username,
        created_by: object.created_by
    })
    console.log('This is the new Event:');
    console.log(newEvent)
    newEvent.save()
        .then(element => { res.json(newEvent) })
        .catch(err => {
            console.log(err)
            res.status(400).json({ err })
        })
});

//add attendees to event

router.post('/:event_id/attendees', (req, res) => {
    Event.findById(req.params.event_id).then(event => {
        if (event.attendees.indexOf(req.body.id) == -1) {
            event.attendees.push(req.body.id);
            console.log(event.attendees.push(req.body.id))
            event.save()
                .then(savedAttribute => {
                    res.json(savedAttribute);
                    console.log('success')
                })
                .catch(err => {
                    res.status(500).send(err);
                    console.log('oops');
                })
        } else {
            res.status(403).send('user is already attending');
        }
    })
        .catch(err => {
            res.status(500).send(err);
        })

});


//update an event

router.put('/:event_id', (req, res) => {
    const updateData = req.body;
    Event.findOneAndUpdate({ _id: req.params.event_id }, updatedData)
        .then(updated => res.json(updated))
        .catch(err => res.status(500).json(err));
});

//delete an event

router.delete('/:event_id', (req, res) => {
    Event.findOneAndRemove({ _id: req.params.event_id })
        .then(deleted => res.json(deleted))
        .catch(err => res.status(500).json(err));
});

module.exports = router;