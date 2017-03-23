const mongoose = require('mongoose');
const Schema = mongoose.Schema,

ObjectId = Schema.Types.ObjectId;

const EventSchema = new Schema({
    name: {type:String, required: true},
    date_time: {type: Date},
    just_date: {type: Date},
    day_period: {type: String},
    week_period:{type: String},
    location_start: {type: String, required: true}, 
    minPace: Number, 
    maxPace: Number,
    distance: Number,
    bag: Boolean,
    comment: {type: String},
    route: {type: String},
    username: {type:String},
    attendees: [{type: ObjectId, ref:"User"}],
    created_by: {type: ObjectId, ref:'User'}
});

EventSchema.pre('save', function(next) {
    const currentDate = Date();
    this.updated_at = currentDate;

    if(!this.created_at){
        this.created_at = currentDate;
    }
    next();
})

EventSchema.pre('save', function(next){
    var self = this;
    const date = self.date_time
    const hour = date.getHours();
    if((hour >=5) && (hour <12)){
        self.day_period = 'Morning'
    } else if((hour >=12) && (hour <17)){
        self.day_period = 'Afternoon'
    } else if((hour >= 17) && (hour <21)){
        self.day_period = 'Evening'
    } else if(hour >= 21) {
        self.day_period = 'Night'
    }
    next();
})

EventSchema.pre('save', function(next){
    var self = this;
    const date = self.date_time
    const day = date.getDay();
    if((day === 0) || (day === 6)){
        self.week_period = 'weekend'
    } else if((day > 1) && (day < 6)){
        self.week_period = "weekday"
    }
    next();
})

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;