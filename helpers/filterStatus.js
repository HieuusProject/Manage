module.exports = (query) => {
     let filterStatuss = [
        {
            name:"All",
            status: "",
            class: ""
        },
        {
            name:"Active",
            status: "active",
            class: ""
        },
        {
            name:"Inactive",
            status:"inactive",
            class: ""
        }
    ];
    if(query.status){
        const index = filterStatuss.findIndex(item => item.status == query.status);
        filterStatuss[index].class =  "active";
    }
    else{
        const index = filterStatuss.findIndex(item => item.status == "");
        filterStatuss[index].class =  "active"; 
    }
    
    // if(query.status=="active"){
    //     filterStatuss[1].class = "active";
    // }
    // else if(query.status=="inactive"){
    //     filterStatuss[2].class = "active";
    // }
    // else{
    //     filterStatuss[0].class = "active";
    // }

    return filterStatuss;
}