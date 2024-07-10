function ConvertHandler() {
  
  this.getNum = function(input) {
    const regex = /^([0-9]+(\.[0-9]+)?\/[0-9]+(\.[0-9]+)?|[0-9]+(\.[0-9]+)?)$/;
    let result = input.match(regex);

    if (!result) return 1; // Default to 1 if no number is provided
    
    // Handle fractional and decimal inputs
    if (result[0].includes('/')) {
      let [num1, num2] = result[0].split('/');
      return parseFloat(num1) / parseFloat(num2);
    } else {
      return parseFloat(result[0]);
    }
  };
  
  this.getUnit = function(input) {
    const units = ['gal', 'l', 'lbs', 'kg', 'mi', 'km'];
    let result = input.match(/[a-zA-Z]+$/);

    if (!result) return null; // If no valid unit found, return null

    let unit = result[0].toLowerCase();
    if (unit === 'l') unit = 'L'; // Represent liter as uppercase 'L'
    
    return units.includes(unit) ? unit : null;
  };
  
  this.getReturnUnit = function(initUnit) {
    switch (initUnit.toLowerCase()) {
      case 'gal':
        return 'L';
      case 'l':
        return 'gal';
      case 'lbs':
        return 'kg';
      case 'kg':
        return 'lbs';
      case 'mi':
        return 'km';
      case 'km':
        return 'mi';
      default:
        return null; // If invalid initUnit provided
    }
  };

  this.spellOutUnit = function(unit) {
    switch (unit.toLowerCase()) {
      case 'gal':
        return 'gallons';
      case 'l':
        return 'liters';
      case 'lbs':
        return 'pounds';
      case 'kg':
        return 'kilograms';
      case 'mi':
        return 'miles';
      case 'km':
        return 'kilometers';
      default:
        return null; // If invalid unit provided
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit.toLowerCase()) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        result = null; // If invalid initUnit provided
    }

    // Round result to 5 decimals
    if (result !== null) {
      result = parseFloat(result.toFixed(5));
    }

    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let initUnitString = this.spellOutUnit(initUnit);
    let returnUnitString = this.spellOutUnit(returnUnit);

    return `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;
  };
  
}

module.exports = ConvertHandler;
