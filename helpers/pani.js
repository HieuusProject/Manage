module.exports = (objectpani, query, countproducts) => {
    if(query.page){
        objectpani.currentpages = parseInt(query.page);
    }

    objectpani.skip = (objectpani.currentpages - 1) * objectpani.limititem;
    const totalpage = Math.ceil(countproducts / objectpani.limititem)
    objectpani.totalpage = totalpage;
    return  objectpani;
}