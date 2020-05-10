"use strict";

function readFormObject(formId) {

    // Form object to be returned
    const outputObj = {};

    // Gather all <input/> elements for the given form ID
    const inputElements = $(`form#${formId}`).children("input");

    // Stores the client-supplied input value for each input element
    let inputElementValue = "";

    // Reducer to convert object properties gathered from HTML form to an accumulated object (outputObj)
    const reducer = (accumulator, currentValue, index, array) => {

        if (index === array.length - 1) {
    
            // if final level of dot notation, store our value gathered from the input element
            accumulator[currentValue] = inputElementValue;  
        }
        else if (accumulator[currentValue] === undefined) {
    
            // if next object in depth traversal does not exist, create it
            accumulator[currentValue] = {};  
        }
    
        return accumulator[currentValue];
    };

    for (const inputElement of inputElements) {

        // Gather input value supplied by client
        inputElementValue = $(inputElement).val();

        // Gather object keys from a dot notation string stored in input element name attribute
        const objProps = $(inputElement).attr("name").split(".");

        // Build our outputObj with these dot notation keys
        objProps.reduce(reducer, outputObj);
    }

    return outputObj;
}

// Assign form listeners to deserialize object
$("form").find("button[type=summit]").click((event) => {
   
    event.preventDefault();

    const formId = event.target.parentElement.id;

    const formObj = readFormObject(formId);

    console.log(formObj);
});
