const isEmpty = require('is-empty');
const Validator=require("validator");


module.exports =ValidateRegistrationInput =(data) => {
const errors={};

//CONVERT EMPTY FIELDS TO EMPTY STRINGS
data.username= !isEmpty(data.username)?data.username:"";
data.email =!isEmpty(data.email)?data.email:"";
data.password=!isEmpty(data.password) ? data.password:"";
data.password2=!isEmpty(data.password2) ?data.password2:"";

// VALIDATING THE FIELDS

//Username validator
if (Validator.isEmpty(data.username)) {
    errors.username="Username Field is empty"
}
if (!Validator.isLength(data.username,{min:6,max:20})) {
    errors.username="Username must contain a min of 6 characters and a max 30"
}
//Email Validations
if (Validator.isEmpty(data.email)) {
    errors.email="Email Field is Empty"
}
if(!Validator.isEmail(data.email)){
    errors.email="Please enter a correct Email "
}
   //Password Validations
   if(Validator.isEmpty(data.password)){
       errors.password="Password filed cannot be empty"
   } 
   if (!Validator.isLength(data.password,{min:6,max:20})) {
       errors.password="Password must contain 6-20 characters"
   }
   //Password 2 validation
   if(Validator.isEmpty(data.password2)){
       errors.password2="Confirm password is Empty"
   }
   if (!Validator.equals(data.password2,data.password)) {
       errors.password2="Password doesn't match"
   }
   return{
       errors,
       isValid:isEmpty(errors)
   };
};