const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

  test('Whole number input', function() {
    const input = '10mi';
    const expected = 10;
    const result = convertHandler.getNum(input);
    assert.equal(result, expected);
  });

  test('Decimal number input', function() {
    const input = '3.5kg';
    const expected = 3.5;
    const result = convertHandler.getNum(input);
    assert.equal(result, expected);
  });

  test('Fractional input', function() {
    const input = '1/2gal';
    const expected = 0.5;
    const result = convertHandler.getNum(input);
    assert.equal(result, expected);
  });

  test('Fractional input with decimal', function() {
    const input = '3.2/2lbs';
    const expected = 1.6;
    const result = convertHandler.getNum(input);
    assert.equal(result, expected);
  });

  test('Error on double-fraction input', function() {
    const input = '3/2/3km';
    const result = convertHandler.getNum(input);
    assert.isNaN(result);
  });

  test('Default numerical input of 1 when no number provided', function() {
    const input = 'kg';
    const expected = 1;
    const result = convertHandler.getNum(input);
    assert.equal(result, expected);
  });

  test('Correctly read each valid input unit', function() {
    assert.equal(convertHandler.getUnit('10gal'), 'gal');
    assert.equal(convertHandler.getUnit('10l'), 'L');
    assert.equal(convertHandler.getUnit('10lbs'), 'lbs');
    assert.equal(convertHandler.getUnit('10kg'), 'kg');
    assert.equal(convertHandler.getUnit('10mi'), 'mi');
    assert.equal(convertHandler.getUnit('10km'), 'km');
  });

  test('Error for invalid input unit', function() {
    assert.isNull(convertHandler.getUnit('10xyz'));
  });

  test('Correct return unit for each valid input unit', function() {
    assert.equal(convertHandler.getReturnUnit('gal'), 'L');
    assert.equal(convertHandler.getReturnUnit('L'), 'gal');
    assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
    assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
    assert.equal(convertHandler.getReturnUnit('mi'), 'km');
    assert.equal(convertHandler.getReturnUnit('km'), 'mi');
  });

  test('Correct spelled-out string unit for each valid input unit', function() {
    assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
    assert.equal(convertHandler.spellOutUnit('L'), 'liters');
    assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
    assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
    assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
    assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
  });

  test('Convert gal to L', function() {
    const initNum = 5;
    const initUnit = 'gal';
    const expected = 18.92705; // 5 gallons to liters
    const result = convertHandler.convert(initNum, initUnit);
    assert.approximately(result, expected, 0.1); // Using approximately due to float precision
  });

  test('Convert L to gal', function() {
    const initNum = 10;
    const initUnit = 'L';
    const expected = 2.64172; // 10 liters to gallons
    const result = convertHandler.convert(initNum, initUnit);
    assert.approximately(result, expected, 0.1); // Using approximately due to float precision
  });

  test('Convert mi to km', function() {
    const initNum = 5;
    const initUnit = 'mi';
    const expected = 8.0467; // 5 miles to kilometers
    const result = convertHandler.convert(initNum, initUnit);
    assert.approximately(result, expected, 0.1); // Using approximately due to float precision
  });

});
