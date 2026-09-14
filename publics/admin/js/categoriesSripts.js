console.log("Scripts for Categories");
const buttonD = document.querySelectorAll("[button-delete]");
if(buttonD){
    const form = document.querySelector("#id-deleted-form");
    const path = form.getAttribute("data-path")
    buttonD.forEach(item => {
        item.addEventListener("click",()=>{
            const isConfirm = confirm("Sure? True : False");
            if(isConfirm){
                const id = item.getAttribute("data-id");
                const action = `/${path}/${id}?_method=DELETE`
                form.action = action;
                form.submit();
            }            
        })
    })
}
