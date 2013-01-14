var Bongo = require('bongo');
var Schema = require('./schema');
var Model = require('./model');
var options;
var bongo;

exports.Schema = Schema;

exports.setOptions = function (opts) {
    
    if (options) {
        throw new Error('DB Options already set.');
    }
    
    options = opts;
};

function createModule (colName, schema) {
    
    var model = new Model(colName, schema);
    model.db = this;
    
    return model;
}

exports.connect = function (dbName, callback) {
    
    if (!bongo) {
        bongo = new Bongo(options);
    }
    
    bongo.connect(dbName, function (err, db) {
        
        db.model = createModule;
        
        callback(err, db);
    });
};