const Validator = require('jsonschema').Validator;
var validator = new Validator();
const schemaData = require('fs').readFileSync('schema.json');
const jsonSchema = JSON.parse(schemaData);
let checks = {}

checks.validator = function(req){
    if(validator.validate(req, jsonSchema).errors.length<1){
        console.log("True");
        return true;
    }
    else{
        console.log("False");
        return false;
    }
}

checks.hash = require('object-hash');

module.exports = checks;