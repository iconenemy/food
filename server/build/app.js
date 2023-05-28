"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_output_json_1 = __importDefault(require("./swagger_output.json"));
const connect_db_1 = __importDefault(require("./utils/connect.db"));
const routes_1 = __importDefault(require("./routes/routes"));
const PORT = process.env.PORT;
const app = (0, express_1.default)();
const router = new routes_1.default(app);
// Deployment
// if (process.env.NODE_MODE === 'production') {
//     app.use(express.static(path.resolve(__dirname, '../../client/build'), { index: false}))
//     app.get('/*', (req: Request, res: Response) => {
//         res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'))
//     })
// } 
// Express configuration
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)({
    credentials: true,
    origin: true
}));
app.use((0, express_fileupload_1.default)({
    createParentPath: true
}));
app.use('/doc', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_output_json_1.default));
router.init();
app.listen(PORT, () => {
    console.log(`Server has been start on port ${PORT}...`);
    (0, connect_db_1.default)();
});
