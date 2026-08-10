const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer  = require('multer')
const session = require('express-session');
const flash = require('express-flash')
const databased = require("./config/databased.js");
const systemconfig = require("./config/system");
const router = require("./router/client/indexrouter.js");
const adminrouter = require("./router/admin/indexrouter.js");
require("dotenv").config();

databased.connect();

const app = express();
const port = process.env.PORT;

app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000}}));
app.use(flash());

app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: false}));
app.set("views", `${__dirname}/views`);
app.set('view engine', 'pug');

router(app);//lời gọi hàm
adminrouter(app);

app.locals.prefixadmin = systemconfig.prefixadmin
app.use(express.static(`${__dirname}/publics`));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});