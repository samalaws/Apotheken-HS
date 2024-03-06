import { data } from "./loadData.js";
import { el, create, group } from "./lib.js";
import{createNewForm,obj,saveNewData,updateFormData} from "./add.js";
import { db } from "./db.js";
import {adminPage} from "./main.js";

// i need to add website data to my data


export function createTabel(){

    //console.log(data);

    if(el("table")){
        el("table").remove();
    }
    if(el("#form")){
        el("#form").remove();
    }
    if(el("#options")){
        el("#options").remove();
    }

    const container = el('#container');
    const table = create('table');
    let tr = "";
    let th = "";
    let td  = "";
    let button = "";

    tr = create("tr");
//    th = create("th");
//    th.innerHTML = "ID";
//    tr.append(th);
    th = create("th")
    th.innerHTML = "Name";
    tr.append(th);
    th = create("th")
    th.innerHTML = "City";
    tr.append(th);
    th = create("th")
    th.innerHTML = "Adresse";
    tr.append(th);
    th = create("th")
    th.innerHTML = "Telephone";
    tr.append(th);
//    th = create("th")
//    th.innerHTML = "Photo Path";
//    tr.append(th);
//    th = create("th")
//    th.innerHTML = "Latitude";
//    tr.append(th);
//    th = create("th")
//    th.innerHTML = "Longitude";
//    tr.append(th);
//    th = create("th")
//    th.innerHTML = "Notdienst";
//    tr.append(th);
    th = create("th")
    th.innerHTML = "Notdienst date";
    tr.append(th);
//    th = create("th")
//    th.innerHTML = "Opining Saturday";
//    tr.append(th);
//    th = create("th")
//    th.innerHTML = "Closing Saturday";
//    tr.append(th);
//    tr.append(th);
//    th = create("th")
//    th.innerHTML = "Opining Weekdays";
//    tr.append(th);
//    th = create("th")
//    th.innerHTML = "Closing Weekdays";
//    tr.append(th);
    table.append(tr);
    
    data.forEach((val)=>{
        tr      = create('tr');
//        td      = create('td');
//        const id            = val.id;
//        td.innerHTML        = id;
//        tr.append(td);

        td      = create('td');
        const name          = val.apothekeName;
        td.innerHTML        = name;
        tr.append(td);

        td      = create('td');
        const city          = val.city;
        td.innerHTML        = city;
        tr.append(td);

        td      = create('td');
        const adresse       = val.apothekeAdresse;
        td.innerHTML        = adresse;
        tr.append(td);

        td      = create('td');
        const telephone     = val.apothekeTelephone;
        td.innerHTML        = telephone;
        tr.append(td);

//        td      = create('td');
//        const logo          = val.apothekeLogo;
//        td.innerHTML        = logo;
//        tr.append(td);

        // td      = create('td');
        // const latitude      = val.latitude;
        // td.innerHTML        = latitude;
        // tr.append(td);

        // td      = create('td');
        // const longitude     = val.longitude;
        // td.innerHTML        = longitude;
        // tr.append(td);

        // td      = create('td');
        // const notdienst     = val.notdienst;
        // td.innerHTML        = notdienst;
        // tr.append(td);

        td      = create('td');
        const notdienstData = val.notdienstData;
        td.innerHTML        = notdienstData;
        tr.append(td);

        // td      = create('td');
        // const samsstagOpen  = val.samsstagOpen;
        // td.innerHTML        = samsstagOpen;
        // tr.append(td);

        // td      = create('td');
        // const samsstagClose = val.samsstagClose;
        // td.innerHTML        = samsstagClose;
        // tr.append(td);

        // td      = create('td');
        // const werktageOpen  = val.werktageOpen;
        // td.innerHTML        = werktageOpen;
        // tr.append(td);

        // td      = create('td');
        // const werktageClose = val.werktageClose;
        // td.innerHTML        = werktageClose;
        // tr.append(td);
        
        button = create("button")
        button.setAttribute('id', "edit");
        button.setAttribute('key', val.id);
        button.addEventListener("click", function(){
            console.log("edit is clicked");
//            console.log(data);
//            console.log(this);
            const key = this.getAttribute('key');
            console.log(key);
            console.log(this);
            data.forEach((val)=>{
//                console.log(val.id);
                if(val.id == key){
//                    console.log(val.apothekeName);
                    createNewForm(
                        obj.id          = val.id,
                        obj.apoName     = val.apothekeName,
                        obj.city        = val.city,
                        obj.adresse     = val.apothekeAdresse, 
                        obj.tel         = val.apothekeTelephone,
                        obj.website     = val.website,
                        obj.latitude    = val.latitude,
                        obj.longitude   = val.longitude
                        )
                }else if(val.id != key){
                    console.log("val.id != key");
                }
                
            });
            const saveBtn = el('#save');
//            console.log(val.id);
//            console.log(val);
//            console.log(saveBtn)
//            console.log(key);
            db.deleteItem(key);
            updateFormData(
                val.id,
                saveBtn,
                val
            );
            console.log(key);
        });
        button.innerHTML = "Edit";
        tr.append(button);

        const btn = create("button")
        btn.setAttribute('id', "delete");
        btn.innerHTML = "Delete";
        btn.setAttribute('key', val.id);

        btn.addEventListener("click", function(){
            const key = this.getAttribute('key');
            console.log("key is: "+key);
            db.deleteItem(key);
            console.log(`${this} is deleted`);
            this.closest('div').remove();
            window.location.reload();
        });
        tr.append(btn);

        table.append(tr);
    })
    container.append(table);

    
    if(!el('#add')){
//        console.log("child is not exiset");
        addButton();
        el('#add').addEventListener('click',createNewForm);
    }else if(el('#add')){
        if(el("#form")){
            el("#form").remove();
        }
    }
    
}

function addButton(){
    const span      = create('span');
    span.className  = "material-symbols-outlined";
    span.setAttribute("id", "add");
    span.innerHTML  = "add";
    el('#icon-holder').append(span)
}

