class HelperFunctions {

  /*  
  * A default value for required parameters so they cannot be skiped in function parameter list
  */
  static requiredParameter(parameterName) {
    throw new Error(`Missing parameter ${parameterName}`);
  }

  /*
  * Generates a random string with the given length
  */
  static randomString(length) {
    let generatedString = "";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    while (generatedString.length < length) {
      generatedString += chars.charAt(Math.floor(Math.random() * chars.length));  
    }
    return generatedString;
  }

  /*
  * Function used for optional chaining of object properties
  * obj: Object from which property should be gotten
  * propNames: path with names to the wanted property
  * Returns the value in specified path or undefined if one of the properties does not exist
  */
  static get(obj, ...propNames) {
    if(!obj) return obj;
    const [currentProperty, ...rest] = propNames;
    const value = obj[currentProperty];
    if(propNames.length === 1 || !value) return value;
    return get(value, rest);
  }


}