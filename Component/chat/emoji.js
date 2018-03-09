var emoji = require('node-emoji')
var emojis = [
    ':coffee:',
    'grinning',
    'smiley',
    'wink',
    'sweat_smile',
    'yum',
    'sunglasses',
    'rage',
    'confounded',
    'flushed',
    'disappointed',
    'sob',
    'neutral_face',
    'innocent',
    'grin',
    'smirk',
    'scream',
    'sleeping',
    'flushed',
    'confused',
    'mask',
    'blush',
    'worried',
    'hushed',
    'heartbeat',
    'broken_heart',
    'crescent_moon',
    'star2',
    'sunny',
    'rainbow',
    'heart_eyes',
    'kissing_smiling_eyes',
    'lips',
    'rose',
    
    'pizza',
    'left_right_arrow',
    'radioactive_sign',
    'copyright',
    'registered',
    'bangbang',
    'interrobang',
    'tm',
    'information_source',
    'arrow_up_down',
    'arrow_upper_left',
    'watch',
    'hourglass',
    'keyboard',
    'point_up',
    'white_frowning_face',
    'relaxed',
    'waning_crescent_moon',
    'taco',
    'chestnut',
    'evergreen_tree',
    'cherry_blossom',
    'cat',
    'rage',
    '+1',
];

var map = {};
for (var i in emojis) {
    var name = emojis[i];
    var code = emoji.get(name);
    map[code] = name;
    // console.log("code:", code);
    // console.log("name:", name);
}
// console.log(map)
module.exports = {
  map: map
};
