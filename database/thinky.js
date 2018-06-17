let config = require('../config');
let thinky = require('thinky')({
    db: config.database
});

module.exports = thinky;