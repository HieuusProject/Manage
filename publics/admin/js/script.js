console.log("this is fr script");
//acctive/inactive

const buttonstatus =  document.querySelectorAll("[button-status]");//lấy ra thành phần có key là button-status
//console.log(buttonstatus);
if(buttonstatus.length > 0){
    let url = new URL(window.location.href);//lấy url hiện tại
    //console.log(url);
    buttonstatus.forEach(button => {//chạy nếu có nút được bấm
        button.addEventListener("click", () => {//thêm hành động
            const status = button.getAttribute("button-status")// nhận giá trị từ buttonstatus
            if(status){
                url.searchParams.set("status",status);//thêm thành phần ? status bằng với giá trị status
            }
            else{
                url.searchParams.delete("status");//xóa thành phần
            }

            window.location.href = url.href;//thay đổi link trang
        });
    })
}
//các bước tùy chỉnh : 
//1: gán 1 giá trị mới trong js vào tất cả những thành phần có chứa giá trị đã gán ở trong pug
//2.thêm điều kiện để thực hiện hành dộng
//3. lấy ra url hiện tại
//4. lặp qua tất cả các thành phần có trong mảng bằng foreach và thực hiện hành dộng
//5: thực hiện hành động 
//6.lấy giá trị (getattribute) của gái trị trong pug
//7.thực hiện setparam
//8.thay đổi link trang + setparam

//search
const formsearch = document.querySelector("#form-search");
if(formsearch){
    let url = new URL(window.location.href);
    formsearch.addEventListener("submit",(e) => {
        console.log(e.target.elements.keyword.value);
        e.preventDefault();// ko cho tai lai trang
        const keyword =  e.target.elements.keyword.value
        if(keyword){
            url.searchParams.set("keyword",keyword);
        }
        else{
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    })
}


//pages

const buttonPani = document.querySelectorAll("[buttonpani]");
if (buttonPani) {
    let url = new URL(window.location.href);
    buttonPani.forEach(button => {
        button.addEventListener("click",() => {
            const page = button.getAttribute("buttonpani");
            url.searchParams.set("page",page);
            window.location.href = url.href;
        })
    })
}

//xcheckbox checkall
const checkbox = document.querySelector("[checkbox-multi]")
if(checkbox){
    const checkall = checkbox.querySelector("input[name='checkall']");
    const inputid = checkbox.querySelectorAll("input[name='id']")
    //console.log(inputid)
    checkall.addEventListener("click",()=>{
        //console.log(checkall.checked)
        if(checkall.checked){
            inputid.forEach((input) => {
                input.checked = true;
            })
        }
        else{
            inputid.forEach((input) => {
                input.checked = false;
            })
        }
    })
    inputid.forEach((input) => {
        input.addEventListener("click", () => {
            const countcheck = checkbox.querySelectorAll(
                "input[name='id']:checked").length;
            //console.log(countcheck)
            if(countcheck == inputid.length){
                checkall.checked = true;
            }
            else{
                checkall.checked = false;
            }
        })
    }) 
}

//formchange multi

const formchange = document.querySelector("[form-change-multi]");
if(formchange){
    formchange.addEventListener("submit",(e) => {
        e.preventDefault();
        const checkbox = document.querySelector("[checkbox-multi]")            
        const ipchecked = checkbox.querySelectorAll(
            "input[name='id']:checked");
        const typechange = e.target.elements.type.value;
        // console.log(typechange)
        if(typechange=="delete"){
            const isconfirm = confirm("A U Sure??")
            if(!isconfirm){
                return; 
            }   
        }
        if(ipchecked.length > 0){
            let ids = [];
            const inputids = formchange.querySelector( "input[name='ids']")
            ipchecked.forEach(input => {
                const id = input.getAttribute("value")
                if(typechange === "position"){
                    const position = input.closest("tr").querySelector("input[name='position']").value;
                    // console.log(position)
                    // console.log(`${id}-${position}`);
                    ids.push(`${id}-${position}`);
                }
                else{
                    ids.push(id)
                }
            })
            inputids.value = ids.join(", ");
            formchange.submit();
        }else{
            alert("Choose One !");
        }
    })
}

//alert
  
const showalert = document.querySelector("[show-alert]");
if(showalert){
    //console.log(showalert)
    const timeleft = parseInt(showalert.getAttribute("data-timeset"));
    //console.log(timeleft)
    setTimeout(() => {
        showalert.classList.add("alert-hidden");
    }, timeleft);
}

const upload = document.querySelector("[upload-imagine]")
if(upload){
    const uploadimagine = document.querySelector("[upload-imagine-input]");
    const preimagine = document.querySelector("[upload-preview]");
    uploadimagine.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if(file){
            preimagine.src = URL.createObjectURL(file);
        }
    })
}
//sort
const sort = document.querySelector("[sort]")
if(sort){
    let url = new URL(window.location.href);
    const selectsort = sort.querySelector("[sort-select]");
    const clearsort = sort.querySelector("[sort-clear]");
    selectsort.addEventListener("change", (e) => {
        const valuesort = e.target.value
        const [key,value] = valuesort.split("-")
        // console.log(key,value)
        url.searchParams.set("sortkey",key);
        url.searchParams.set("sortvalue",value);
        window.location.href = url.href;
    })
    clearsort.addEventListener("click", () => {
        url.searchParams.delete("sortkey");
        url.searchParams.delete("sortvalue");
        window.location.href = url.href;
    })  
    const crrkey = url.searchParams.get("sortkey");
    // console.log(crrkey)
    const crrvalue = url.searchParams.get("sortvalue");
    if(crrkey && crrvalue){
        const stringer = `${crrkey}-${crrvalue}`
        // console.log(stringer)
        const optionselected = sort.querySelector(`option[value='${stringer}']`)
        // console.log(optionselected)
        optionselected.selected = true;
    }
}




