const express = require('express');
const bodyParser = require('body-parser');
const port = 8080;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({
    extended: true
}));

app.get("/", (req, res) => {
    res.send('Hello express!!');
});

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }

    console.log('Node app is running on port: ' + port);
});