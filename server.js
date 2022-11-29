let projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app 
const app = express();

// Dependencies 
const bodyParser = require('body-parser')
//Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = 3000;
// Spin up the server
const server = app.listen(port, listening);
 function listening(){
    console.log(`running on localhost: ${port}`);
  };

//POST Route
app.post('/',receiveData);
//This function recive data and push this data inside array project data
function receiveData(req,res){
projectData=req.body;
console.log(projectData);
}
//GET Route
app.get('/sendData',sendData);
//This function send project data value array to fetch this 
function sendData(req,res){ 
  app.post('/',(req,res)=>{
projectData.temp=req.body.temp;
projectData.weather=req.body.weather;
projectData.Icon=req.body.Icon;
projectData.CityName=req.body.CityName;
projectData.Date=req.body.CityName;
projectData.feeling=req.body.feeling;
  }); 
res.send(projectData);
}


