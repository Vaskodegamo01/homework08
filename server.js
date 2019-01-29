const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const  links = require("./app/links.js");
const Url =  require("./models/link");

const config = require("./config.js");

const app = express();
const db = mongoose.connection;

const port = 3333;

mongoose.connect(config.db.url + '/' + config.db.name, { useNewUrlParser: true });
app.use(express.static('public'));
app.use(express.json());
app.use(cors());


db.once('open', () => {
    app.use("/links", links());
    app.listen(port, () => console.log("server start at " + port));
});

app.get('*',(req,res)=>{
    let data = req.params;
    data = data[0].slice(-6);
    if(data.length === 6){
        Url.findOne({'UrlSort': data})
            .then(results => res.status(301).redirect(results.urlFull))
            .catch((e) => res.send(e).status(404));
    }
});
