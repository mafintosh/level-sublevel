
var EventEmitter = require('events').EventEmitter
var next         = process.nextTick
var SubDb        = require('./sub')

var Hooks   = require('level-hooks')

module.exports   = function (db, sep) {
  //use \xff (255) as the seperator,
  //so that sections of the database will sort after the regular keys
  sep = sep || '\xff'
  Hooks(db)

  db.sublevel = function (prefix) {
    return new SubDb(db, prefix, sep)
  }

  db.prefix = function () {
    return ''
  }

  db.pre = function (hook) {
    r.hooks.pre({
        start: '',
        end  : sep
      }
      , hook)
    return db
  }
  db.post = function (hook) {
    db.hooks.post({start: '', end: sep}, hook)
    return db
  }

  return db
}

