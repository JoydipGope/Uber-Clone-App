// const mongoose = require('mongoose');


// function connectToDb() {
//     mongoose.connect(process.env.DB_CONNECT
//     ).then(() => {
//         console.log('Connected to DB');
//     }).catch(err => console.log(err));
// }


// module.exports = connectToDb;

const mongoose = require('mongoose');
const captainModel = require('../models/captain.model'); // Adjust the path as needed

function connectToDb() {
    mongoose.connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        console.log('Connected to DB');

        // Create geospatial indexes for captain model
        try {
            await captainModel.createIndexes();
            console.log('Indexes created for captain model');
        } catch (err) {
            console.error('Error creating indexes:', err);
        }
    })
    .catch(err => {
        console.log('DB connection error:', err);
    });
}

module.exports = connectToDb;
