"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const parse_1 = __importDefault(require("./routes/parse"));
const app = express_1.default();
const urlencodedParser = body_parser_1.default.urlencoded({ extended: false });
app.use(urlencodedParser);
app.use(parse_1.default);
app.get('/api', (req, res) => {
    return res.send("RESPONSE SENT");
});
app.listen(3000, () => {
    // console.log("App is running on 3000");
});
//# sourceMappingURL=index.js.map