const dashboardRouter = require("./dashboardrouter.js");//lay cai vua export
const productRouter = require("./productrouter.js");//lay cai vua export
const system_config = require("../../config/system.js");
module.exports = (app) => {
    const path_admin = system_config.prefixadmin;
    app.use(path_admin + "/dashboard",dashboardRouter);
    app.use(path_admin + "/products",productRouter);
};