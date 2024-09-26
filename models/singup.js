const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,

    },
    email: {
        type: String,
       
    }, 
    password: {
        type: String,
        
    },
    img:[{
        picname:{type:String},
        url:{type:String}
 } ]
});

const User = mongoose.model('Userdata', userSchema);

module.exports = User;
