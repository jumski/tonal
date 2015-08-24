var toList = require('./list')
var note = require('../note/note')

var GT = function (a, b) { return a > b }
var LT = function (a, b) { return a < b }

/**
 * Force the items to a list to be always ascending or descending by transposing
 * octaves
 */
function direction (list, dir) {
  dir = dir || 1
  if (dir !== 1 && dir !== -1) throw Error('Direction not valid: ' + dir)
  var comp = dir === 1 ? GT : LT
  var off = dir === 1 ? 1 : 0

  var prev, curr
  list = toList(list)
  var result = list.slice(0, 1)
  for (var i = 1; i < list.length; i++) {
    prev = note(result[i - 1])
    curr = note(list[i])
    if (comp(prev.midi, curr.midi)) {
      var oct = Math.floor((prev.midi - curr.midi) / 12) + off
      result.push(note(curr, null, curr.oct + oct).name)
    } else {
      result.push(list[i])
    }
  }
  return result
}

module.exports = direction