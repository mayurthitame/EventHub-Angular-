const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');
const api = require('./routes/api');
mongoose = require('mongoose');
const port = 3000;

app = express();
app.use(cors())
// app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.json()); 

app.use('/api', api);

app.listen(port, function(){
    console.log("Marvellous Innfosystems : Server running on localhost:" + port);
});

app.get('/', (request, responce) =>{
    responce.send("Marvellous server is running");
  });

  Database = "mongodb+srv://marvellous:marvellous@batches.o3vid.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(Database).then(()=> {
    console.log("Database connection is succesfullll");
  }).catch((err)=>{
    console.log(err);
  });

