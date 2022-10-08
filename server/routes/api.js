const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Events = require('../models/events');
const jwt = require('jsonwebtoken');
var bodyParser = require('body-parser')
const app = express();


app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json());



function verifyToken(req, res, next) 
{
  if(!req.headers.authorization) 
  {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') 
  {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) 
  {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}


app.get("/events", async (request, response) => {
  const events = await Events.find({});
  try 
  {
    response.send(events);
    console.log(events);
  } 
  catch (error) 
  {
    response.status(500).send(error);
  }
});

app.post("/events",async(req,res)=>{
  const events = new Events(req.body);
  try
  {
    await events.save();
    res.send(events);
  }
  catch(error)
  {
    res.status(500).send(error);
  }
})

app.get('/special', verifyToken, (req, res) => {
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
    }
    // {
    //   "_id": "3",
    //   "name": "LSP",
    //   "description": "3 Days",
    //   "Teacher": "Piyush Manohar Khairnar"
    // },
    // {
    //   "_id": "4",
    //   "name": "Struts",
    //   "description": "3 Days",
    //   "Teacher": "Piyush Manohar Khairnar"
    // },
    // {
    //   "_id": "5",
    //   "name": "Embedded Programming",
    //   "description": "3 Days",
    //   "Teacher": "Piyush Manohar Khairnar"
    // },
    // {
    //   "_id": "6",
    //   "name": "IOT Workshop",
    //   "description": "3 Days",
    //   "Teacher": "Piyush Manohar Khairnar"
    // }
  ]
  res.json(specialEvents)
})

app.post('/login', (req, res) => {
    let userData = req.body
    
    if ((userData.email == "Marvellous") && (userData.password == "Marvellous")) 
    {
      let payload = {subject: 1}
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({token})   
    } 
    else 
    {
        res.status(401).send('Invalid Password')
    } 
})

module.exports = app;