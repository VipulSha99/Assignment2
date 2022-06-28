import {UserAction} from "./models/model.js";

export class User<T extends Array<object>,U extends Array<Array<string>>> implements UserAction{

    constructor(public info:T,public info1:U){
    }

    addUser(refer:any){
        let arr:Array<string> = [];
        for(let j=0;j<7;j++){
            arr.push(refer.target[j].value)
        }
        this.info1.push(arr);
        document.getElementById("reset")?.click();
        let column_list = ["First Name","Middle Name","Last Name","Email","Phone Number","Role","Address","Edit"];
        let table = document.getElementById("table_tag") as HTMLTableElement;
    
        let i = this.info1.length-1;
        let row = table.insertRow(i+1);
        for(let j=0;j<column_list.length;j++){
            if(j ===column_list.length-1){
                let btn = document.createElement('input') as HTMLInputElement;
                btn.type = "button";
                btn.className = "btn";
                btn.value = "Edit";
                let cell = row.insertCell(-1)
                cell.appendChild(btn);
                btn.onclick = (()=> {this.selectedRowEdit(btn)});

                let btn1 = document.createElement('input') as HTMLInputElement;
                btn1.type = "button";
                btn1.className = "btn1";
                btn1.value = "Delete";
                btn1.onclick = (()=> {this.selectedRowDelete(btn1)});

                cell.appendChild(btn1);
                return
            }
            let cell = row.insertCell(-1)
            let inputField = document.createElement('input') as HTMLInputElement;
            if(j===4){
                inputField.type="number";
            }
            else if(j===3){
                inputField.type="email";
            }
            else{
                inputField.type = "text";
            }
            inputField.value =this.info1[i][j]
            inputField.disabled = true
            cell.appendChild(inputField);
        }   
    }

    selectedRowEdit(refer:any){
        let j : number = 0;
            for(j=0;j<refer.parentNode.parentNode.cells.length-1;j++){
                refer.parentNode.parentNode.cells[j].childNodes[0].disabled = false
            }
            refer.parentNode.parentNode.cells[j].childNodes[0].value = "Save";
            let arrChanged = [...this.info1[refer.parentNode.parentNode.rowIndex-1]]
            refer.parentNode.parentNode.cells[j].childNodes[0].onclick=()=>{
                for(j=0;j<refer.parentNode.parentNode.cells.length-1;j++){
                    arrChanged[j] = refer.parentNode.parentNode.cells[j].childNodes[0].value
                    refer.parentNode.parentNode.cells[j].childNodes[0].disabled = true
                    
                }
                this.info1[refer.parentNode.parentNode.rowIndex-1] = arrChanged;
                for(j=0;j<refer.parentNode.parentNode.cells.length-1;j++){
                    refer.parentNode.parentNode.cells[j].childNodes[0].value = this.info1[refer.parentNode.parentNode.rowIndex-1][j]                   
                }
                refer.parentNode.parentNode.cells[j].childNodes[1].value = "Delete";
                refer.parentNode.parentNode.cells[j].childNodes[1].onclick = (()=>{this.selectedRowDelete(refer)})
                refer.parentNode.parentNode.cells[j].childNodes[0].value = "Edit";
                refer.parentNode.parentNode.cells[j].childNodes[0].onclick = (()=>{this.selectedRowEdit(refer)})
            }
            refer.parentNode.parentNode.cells[j].childNodes[1].value = "Cancel";
    
            refer.parentNode.parentNode.cells[j].childNodes[1].onclick=()=>{
                for(j=0;j<refer.parentNode.parentNode.cells.length-1;j++){
                    refer.parentNode.parentNode.cells[j].childNodes[0].value = this.info1[refer.parentNode.parentNode.rowIndex-1][j]
                    refer.parentNode.parentNode.cells[j].childNodes[0].disabled = true
    
                }
                refer.parentNode.parentNode.cells[j].childNodes[1].value = "Delete";
                refer.parentNode.parentNode.cells[j].childNodes[1].onclick = (()=>{this.selectedRowDelete(refer)})
                refer.parentNode.parentNode.cells[j].childNodes[0].value = "Edit";
                refer.parentNode.parentNode.cells[j].childNodes[0].onclick = (()=>{this.selectedRowEdit(refer)})
            }
    }

    selectedRowDelete(i:any){
        let rIndex,table = document.getElementById("table_tag") as HTMLTableElement;
                rIndex = i.parentNode.parentNode.rowIndex;
                table.deleteRow(rIndex)
                this.info1.splice(rIndex-1,1)
    }

}