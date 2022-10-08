express = require('express');
mongoose = require('mongoose');
batchesRouter = require("./routes/batchesRoutes.js");
var bodyParser = require('body-parser')
const cors = require('cors')


app = express();
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json());

//app.use(express.json());
app.use(cors())
// app.use(express.static(path.join(__dirname, 'dist')));

app.use(batchesRouter);

app.listen(3000, (request,responce) => {
  console.log("Server is running at 3000");
});

app.get('/', (request, responce) =>{
  responce.send("Marvellous server is running");
});

Database = 'mongodb+srv://marvellous:marvellous@batches.o3vid.mongodb.net/test?retryWrites=true&w=majority';


mongoose.connect(Database).then(()=> {
  console.log("Database connection is succesful");
}).catch((err)=>{
  console.log("Connection failed"+err);
});