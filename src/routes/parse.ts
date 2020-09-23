
import { Router } from 'express';
const parseRouter = Router();

parseRouter.post('/api/v1/parse', (req, res) => {
    // var data = "JOHN0000MICHAEL0009994567";
    const reqData = req.body.data;
    // const pattern = reqData.match(/([A-Za-z]+0000)([A-Za-z]+000)([0-9]+)/);
    // const response = { firstName: pattern[1], lastName: pattern[2], clientId: pattern[3] };
    const response = { firstName: reqData.substr(0,8), lastName: reqData.substr(8,10), clientId: reqData.substr(18)};
    res.send({status: 200, data: response});
});

parseRouter.post('/api/v2/parse', (req, res) => {
    const reqData = req.body.data;
    // const pattern = reqData.match(/([A-Za-z]+0000)([A-Za-z]+000)([0-9]+)/);
    // const response = { firstName: pattern[1].slice(0, -4), lastName: pattern[2].slice(0, -3), clientId: pattern[3].slice(0, -4) + "-" + pattern[3].slice(-4) };
    const response = { firstName: reqData.substr(0,4), lastName: reqData.substr(8,7), clientId: reqData.substr(18)};
    res.send({status: 200, data: response});
});


export default parseRouter;