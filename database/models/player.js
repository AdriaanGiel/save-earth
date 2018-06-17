let uuid = require('uuid/v4');
let thinky = require('../thinky');
let type = thinky.type;

let Player = thinky.createModel('Player', {
    id: type.string().default(() => {
        return uuid();
    }),
    name: type.string()
});

module.exports = Player;