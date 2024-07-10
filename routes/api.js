'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get((req, res) => {
      const input = req.query.input;

      // Extract num and unit from input
      const initNum = convertHandler.getNum(input);
      const initUnit = convertHandler.getUnit(input);

      // If either num or unit is invalid, send appropriate error response
      if (!initNum && !initUnit) {
        return res.json({ error: 'invalid number and unit' });
      }
      if (!initNum) {
        return res.json({ error: 'invalid number' });
      }
      if (!initUnit) {
        return res.json({ error: 'invalid unit' });
      }

      // Get return unit
      const returnUnit = convertHandler.getReturnUnit(initUnit);

      // Perform conversion
      const returnNum = convertHandler.convert(initNum, initUnit);

      // Prepare response string
      const toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      // Send response
      res.json({
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string: toString
      });
    });

};
