const express = require('express');
const router = express.Router();
const Event = require('../models/events');
const authorize = require('../authentication/middleware/authorize');
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
    console.log(req.query)

    function zeroTime(d) {
        d.setHours(0);
        d.setMinutes(0);
        d.setSeconds(0);
        return d;
    }
    minDate = zeroTime(new Date(req.query.minDate));
    maxDate = zeroTime(new Date(req.query.maxDate));
    console.log(minDate.toString())
    console.log(maxDate.toString());

    Event.find({
        date_time: { $gte: minDate, $lte: maxDate, }
    })
        .then(shop => {
            res.json(shop);
        })
        .catch(err => {
            console.log(err);
            res.status(400)
                .json({ err });
        })
})

router.get('/:event_id', authorize, (req, res) => {
    Event.findById(req.params.event_id)
        .then(updated => {res.json(updated)
        console.log(updated)}
        )
        .catch(err => res.status(500).json(err));
    
});

//CREATE a new event
router.post('/', authorize, (req, res) => {
    let object = req.body

    if (object.date_time > Date.now()) {
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
            comment: object.comment
        })
        newEvent.save()
            .then(element => { res.json(newEvent) })
            .catch(err => {
                console.log(err)
                res.status(400).json({ err })
            })
    }
});

//add attendees to event

router.post('/:event_id/attendees', authorize, (req, res) => {


    Event.findById(req.params.event_id).then(event => {
        if (event.attendees.indexOf(req.body.id) == -1){
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

router.put('/:event_id', authorize, (req, res) => {
    const updateData = req.body;
    Event.findOneAndUpdate({ _id: req.params.event_id }, updatedData)
        .then(updated => res.json(updated))
        .catch(err => res.status(500).json(err));
});

//delete an event

router.delete('/:event_id', authorize, (req, res) => {
    Event.findOneAndRemove({ _id: req.params.event_id })
        .then(deleted => res.json(deleted))
        .catch(err => res.status(500).json(err));
});

module.exports = router;