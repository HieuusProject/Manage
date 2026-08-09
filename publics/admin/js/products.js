console.log("Our Products Changeing")

const buttonChangestt = document.querySelectorAll("[buttonchangestt]");
if(buttonChangestt.length>0){
    //console.log(buttonChangestt)
    const form = document.querySelector("#form-changestatus");
    const path = form.getAttribute("datapath");
    console.log(path)
    buttonChangestt.forEach(button => {
        button.addEventListener("click", () => {
            const statuscrr = button.getAttribute("datastatus")
            const idcrr = button.getAttribute("dataid")
            //console.log(idcrr,statuscrr)
            let sttchange = statuscrr == "active" ? "inactive" : "active";
            const action = path + `/${sttchange}/${idcrr}?_method=PATCH`;
            console.log(action)
            form.action = action
            form.submit();
           
        })
    })
}

const buttonDelete = document.querySelectorAll("[button-delete]");
if(buttonDelete.length > 0){
    const formdelete = document.querySelector("#form-delete-item")
    const path = formdelete.getAttribute("datapath")
    //console.log(path)
    buttonDelete.forEach(button => {
        button.addEventListener("click",() => {
            const isConfirm = confirm("A U Sure? Delete?");
            if(isConfirm){
                const id = button.getAttribute("data-id");
                const action = `${path}/${id}?_method=DELETE`;
                //console.log(action)
                formdelete.action = action;
                formdelete.submit()
            }    
        })
    })
}

