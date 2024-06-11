const Joi = require('joi');

const validate = (data, schema) => {
    return schema.validate(data);
};

module.exports = validate;
