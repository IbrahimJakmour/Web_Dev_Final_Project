const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema ({
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
	    username: {type:String, unique: true, required: true}, 
    	social:{
          facebook: String,
          instagram: String,
          strava: String  
        },
	    blog: {type:String, default: 'none'},
        role: {type:String, default: 'runner'},
        email: {type:String, required: true, unique: true},
        men: {type: Boolean, default: 'none'},
        women: {type: Boolean, default: 'none'},
        password: {type:String, required: true} 
});

UserSchema.pre('save', function(next){
    const currentDate = new Date();
    this.updated_at = currentDate;
    if(!this.created_at){
        this.created_at = currentDate;
    }
    next();
})

const User = mongoose.model('User', UserSchema)

module.exports = User;