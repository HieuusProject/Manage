console.log("this is script for roiles");
const des = document.querySelectorAll("#scripts");
const ads = document.querySelectorAll("#displayed");
// console.log(des)
var change = false;
if(des&&ads){
    des.forEach(item => {
        if(item.innerText.length >= 60){
            const text = item.innerText;
            const cutting = text.slice(0,60);
            const privatep = item.getAttribute("privatep");
            item.innerText = cutting
            change = true;
            ads.forEach(ref => {
                const privatea = ref.getAttribute("privatea")
                if(privatea == privatep){
                    ref.style.display = "";
                }
            })            
        }
    })
}

const table = document.querySelector("[table-permission]");
if(table){
    const button = document.querySelector("[button-submit]");
    button.addEventListener("click",()=>{
        let permissions = [];
        const rows = table.querySelectorAll("[data-name]");
        rows.forEach(row => {
            const name = row.getAttribute("data-name");
            const inputs = row.querySelectorAll("input");
            if(name == "id"){
                inputs.forEach(input => {
                    const id = input.value;
                    permissions.push({
                        id: id,
                        permissions: []
                    });                    
                })
            } else{
                inputs.forEach((input, index) => {
                    const checked = input.checked;
                    if(checked){
                        permissions[index].permissions.push(name)
                    }
                })
            }
        })
        if(permissions.length > 0){``
            const formchange = document.querySelector("#form-change-permissions");
            const inputpermis = formchange.querySelector("input[name='permissions']");
            inputpermis.value = JSON.stringify(permissions);
            formchange.submit();
        }
    })
}

const permissionDefault = document.querySelector("[data-records]");
if(permissionDefault){
    const records = JSON.parse(permissionDefault.getAttribute("data-records"));
    const tablenation = document.querySelector("[table-permission]");
    records.forEach((record,index) => {
        const permissions = record.permission;
        permissions.forEach(per => {
            const row = tablenation.querySelector(`[data-name="${per}"]`);
            const input = row.querySelectorAll("input")[index];
            input.checked=true
        })
    })
}
