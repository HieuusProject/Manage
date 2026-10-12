const changeStatus = document.querySelectorAll("[buttonchangestt]");
if(changeStatus){
    const form = document.querySelector("#form-change-status");
    if(form){
        const path = form.getAttribute("data-path");
        changeStatus.forEach(button => {
            button.addEventListener('click', () => {
                const status = button.getAttribute("datastatus");
                const id = button.getAttribute("dataid");
                const change = status == "active" ? "inactive" : "active";
                const action  = `${path}/${change}/${id}?_method=PATCH`;
                console.log(action)
                form.action = action;
                form.submit();
            })        
        })        
    }
}