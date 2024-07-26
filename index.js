const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require('cors');
app.use(cors());



const bodyParser = require('body-parser');
// const blogRoutes = require('../routes/blogRoutes');
const blogRoutes = require('./routes/blogRoutes');
const twelveRoutes = require('./routes/twelveRoute');
const compilerRoute = require('./routes/compilerRoute');
const codeforcesapi = require('./routes/CodeForcesAPI');
const interview = require('./routes/InterviewRoutes');
const imgpost = require('./routes/ImgPost');
const language = require('./routes/languageRoute');

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });

app.use(bodyParser.json());
app.use('/blog', blogRoutes);
app.use('/ictfirst', twelveRoutes);
app.use('/compiler', compilerRoute);
app.use('/api', codeforcesapi);
app.use('/img', imgpost);
app.use('/interview', interview);
app.use('/language', language);



app.listen(5000, () => {
    console.log("App listen to port:5000");
});
