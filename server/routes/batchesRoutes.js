const express = require("express");
const batchesModel = require("../models/batches");
const Events = require('../models/events'); 
var bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");

const app = express();

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json());


function verifyToken(request, response, next) 
{
  if(!request.headers.authorization) 
  {
    return response.status(401).send('Unauthorized request')
  }
  let token = request.headers.authorization.split(' ')[1]
  if(token === 'null') 
  {
    return response.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) 
  {
    return response.status(401).send('Unauthorized request')    
  }
  request.userId = payload.subject
  next()
}

app.get("/api/events", async (request, response) => {
  const events = await Events.find({});
  try 
  {
    response.send(events);
  } 
  catch (error) 
  {
    response.status(500).send(error);
  }
});

app.post("/api/events",async(request,response)=>{
  const events = new Events(request.body);
  try
  {
    await events.save();
    response.send(events);
  }
  catch(error)
  {
    response.status(500).send(error);
  }
})

  app.get("/api/special", verifyToken, (request, response) => {
    let specialEvents = [
      {
        "_id": "1",
        "name": "IOT",
        "description": "3 Days",
        "Teacher": "Piyush Manohar Khairnar"
      },
      {
        "_id": "2",
        "name": "IOS Internals",
        "description": "3 Days",
        "Teacher": "Piyush Manohar Khairnar"
      },
      {
        "_id": "3",
        "name": "LSP",
        "description": "3 Days",
        "Teacher": "Piyush Manohar Khairnar"
      },
      {
        "_id": "4",
        "name": "Struts",
        "description": "3 Days",
        "Teacher": "Piyush Manohar Khairnar"
      },
      {
        "_id": "5",
        "name": "Embedded Programming",
        "description": "3 Days",
        "Teacher": "Piyush Manohar Khairnar"
      },
      {
        "_id": "6",
        "name": "IOT Workshop",
        "description": "3 Days",
        "Teacher": "Piyush Manohar Khairnar"
      }
    ]
    response.json(specialEvents)
  })
  

app.post("/api/login",async (request, response) => {
  let userData = await request.body
  
  if ((userData.email == "Marvellous") && (userData.password == "Marvellous")) 
  {
    let payload = {subject: 1}
    let token = jwt.sign(payload,'secretKey')
    response.status(200).send({token})
  } 
  else 
  {
      response.status(401).send('Invalid Password')
  } 
})
module.exports = app;