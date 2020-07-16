const isEmpty = require('is-empty');
const Validator=require("validator");


module.exports =ValidateLoginInput=(data) => {
const errors={}
//CONVERT EMPTY FIELDS TO EMPTY STRINGS
data.email=!isEmpty(data.email) ? data.email:"";
data.password=!isEmpty(data.password) ? data.password:"";

//Validation
//Email Validation
if (Validator.isEmpty(data.email)) {
    errors.email="Email Field is empty"
}
if (!Validator.isEmail(data.email)) {
    errors.email="Please enter Correct email"
}
//Password Validation
if(Validator.isEmpty(data.password)){
    errors.password="Password Field is Empty"
}
return{
    errors,
    isValid:isEmpty(errors)
};
};