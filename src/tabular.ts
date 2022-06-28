import {User} from "./app.js";

let info: Array<object> = [];
let info1: Array<Array<string>> = [];
let column_list = ["First Name","Middle Name","Last Name","Email","Phone Number","Role","Address","Edit"];

function api<T>(url: string): Promise<T> {
    return fetch(url)
      .then(response => {
        return response.json()
      })
  
  }
document.getElementById("load_button")?.addEventListener("click",async()=>{
    let data: Array<object> = await api("../data.json");
    console.log(data)
    if(document.getElementById("load_button")!.innerText === "Refresh data"){
        let Table = document.getElementById("table_tag") as HTMLTableElement;
        Table.innerHTML = "";
    }else{
        document.getElementById("load_button")!.innerHTML = "Refresh data";
        document.getElementById("table_tag")!.style.display = "revert";
        document.getElementById("input_tag")!.style.display = "flex";
    }
    info = data;
    loadTableData();
})

function loadTableData(){
    
    let table = document.getElementById("table_tag") as HTMLTableElement;
    let row = table.insertRow(0);
    
    column_list.forEach((column)=>{
        let headerCell = document.createElement("th");
        headerCell.innerHTML = column;
        row.appendChild(headerCell);
        
    })
    for (let i = 0; i < info.length; i++) { 
        row = table.insertRow(i+1);
        let arr: Array<string> = [];
        column_list.forEach((column)=>{
            if(column ==="Edit"){
                let btn = document.createElement('input') as HTMLInputElement;
                btn.type = "button";
                btn.className = "btn";
                btn.value = "Edit";
                let cell = row.insertCell(-1)
                cell.appendChild(btn);
                btn.onclick = (function() {user.selectedRowEdit(this);});

                let btn1 = document.createElement('input') as HTMLInputElement;
                btn1.type = "button";
                btn1.className = "btn1";
                btn1.value = "Delete";
                btn1.onclick = (function() {user.selectedRowDelete(this)});

                cell.appendChild(btn1);
                return
            }
            let cell = row.insertCell(-1)
            let inputField = document.createElement('input') as HTMLInputElement;
            if(column==="Phone Number"){
                inputField.type="number";
            }
            else if(column==="Email"){
                inputField.type="email";
            }
            else{
                inputField.type = "text";
            }
            inputField.value =(info[i] as any)[column]
            inputField.disabled = true
            arr.push((info[i] as any)[column])
            cell.appendChild(inputField);
        })        
        info1.push(arr);

    }

}; 

let user = new User(info,info1);

document.getElementById("input_tag")?.addEventListener("submit",(e)=>{
    e.preventDefault();
    user.addUser(e);
})

