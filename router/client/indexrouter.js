const homerouter = require("./homerouter.js");//lay cai vua export
const productsrouter = require("./productsrouter.js");//lay cai vua export

module.exports = (app) => {
    app.use('/',homerouter);
    app.use('/products',productsrouter);
}
