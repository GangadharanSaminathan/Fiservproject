
import Express from "express";
import bodyParser from "body-parser";

const app = Express();

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);

app.get('/api', (req, res) => {
    return res.send("RESPONSE SENT");
});

app.post('/api/v1/parse', (req, res) => {
    //var data = "JOHN0000MICHAEL0009994567";
    const reqData = req.body.data;
    const pattern = reqData.match(/([A-Za-z]+0000)([A-Za-z]+000)([0-9]+)/);
    const response = { firstName: pattern[1], lastName: pattern[2], clientId: pattern[3] };
    res.send({status: 200, data: response});
});


app.post('/api/v2/parse', (req, res) => {
    const reqData = req.body.data;
    const pattern = reqData.match(/([A-Za-z]+0000)([A-Za-z]+000)([0-9]+)/);
    const response = { firstName: pattern[1].slice(0, -4), lastName: pattern[2].slice(0, -3), clientId: pattern[3].slice(0, -4) + "-" + pattern[3].slice(-4) };
    res.send({status: 200, data: response});
});


app.listen(3000, () => {
    console.log("App is running on 3000");
});

