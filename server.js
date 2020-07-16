const express = require('express');
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
const keys=require("./config/keys");
const routes=require("./controller/api/users");
const routes2=require("./controller/api/polls");
const path = require("path");
const app = express();


//BODY-PARSER MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));




//MONGO DB CONNECTION
mongoose.connect(
keys.mongoURI
, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
.then((res) => {
    console.log("Mongo Successfully Connected")
}).catch((err) => {
    console.log(err)
});

//ROUTING MIDDLEWARE
app.use('/api/users',routes);
app.use('/api/polls',routes2);

//PRODUCTION
if(process.env.NODE_ENV === 'production'){
  //set static folder
  app.use(express.static('client/build'));
}
app.get('*',(req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

//PORT CONNECTION
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));

