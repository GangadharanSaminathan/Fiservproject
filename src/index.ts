
import express from "express";
import bodyParser from "body-parser";

import parseRouter from './routes/parse';
const app = express();

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);
app.use(parseRouter);

app.get('/api', (req, res) => {
    return res.send("RESPONSE SENT");
});


app.listen(3000, () => {
    // console.log("App is running on 3000");
});

