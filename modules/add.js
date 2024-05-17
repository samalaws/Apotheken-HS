import { create, el } from "./lib.js";
import { db } from "./db.js";
import {adminPage} from "./main.js";

/* 
        Add And Update Data to and in DB
        When new Pharmacy item add it to DB or update the data of it in DB
*/
// create empty objct to save the values in IT
export let obj = {
        id              : "",
        apoName         : "",
        city            : "",
        adresse         : "",
        tel             : "",
        website         : "",
        latitude        : "",
        longitude       : "",
};

export function createNewForm(){ 


        if(el("#form")){ // if form element exist-> then remove it
                // this IMPORTANT to remove the old Element from the APP and create new Element with new Data

                el("#form").remove(); // -> then remove it

        }else if (!el("#form")){ // if form not exist
                if(el('table')){ // if table exist
                        el('table').remove(); // then remove it
                }
                if(el("#add")){ // if add span exist
                        el("#add").remove(); // then remove it
                }
        const container = el('#container'); // find container element
        
        const form = create('form'); // create form 
        form.setAttribute('id', "form"); // set Atribut

        let div = '';
        let label = '';
        let input = '';

        div = create('div'); // create row
        div.className = "div";

// create apo name label        
        label = create('label') // create label
        label.className = "label";
        label.innerHTML = "Apotheke Name"
        div.append(label);

// create apo name input        
        input = create('input'); // create input
        input.className = "input";
        input.setAttribute('type', "text");
        input.setAttribute('placeholder', "name");
        input.setAttribute('id', "apo-name");
        input.setAttribute('value', obj.apoName);
        div.append(input);
        form.append(div);

// create city label        
        div = create('div'); // create row
        div.className = "div";
        label = create('label') // create label
        label.className = "label";
        label.innerHTML = "City"
        div.append(label);
// create city input       
        input = create('input'); // create input
        input.className = "input";
        input.setAttribute('type', "text");
        input.setAttribute('id', "city");
        input.setAttribute('placeholder', "City");
        input.setAttribute('value', obj.city);
        div.append(input);
        form.append(div);
// create address label        
        div = create('div'); // create row
        div.className = "div";
        label = create('label') // create label
        label.className = "label";
        label.innerHTML = "address"
        div.append(label);
// create address input        
        input = create('input'); // create input
        input.className = "input";
        input.setAttribute('type', "text");
        input.setAttribute('id', "address");
        input.setAttribute('placeholder', "address");
        input.setAttribute('value', obj.adresse);
        div.append(input);
        form.append(div);
// create tel label
        div = create('div'); // create row
        div.className = "div";
        label = create('label') // create label
        label.className = "label";
        label.innerHTML = "telephone"
        div.append(label);
// create tel input        
        input = create('input'); // create input
        input.className = "input";
        input.setAttribute('type', "text");
        input.setAttribute('id', "telephone");
        input.setAttribute('placeholder', "telephone");
        input.setAttribute('value', obj.tel);
        div.append(input);
        form.append(div);
// create photo label
        div = create('div'); // create row
        div.className = "div";
        label = create('label') // create label
        label.className = "label";
        label.innerHTML = "photo"
        div.append(label);
// create photo input
        input = create('input'); // create input
        input.className = "input";
        input.setAttribute('type', "file");
        input.setAttribute('id', "photo");
        div.append(input);
        form.append(div);
// create website label
        div = create('div'); // create row
        div.className = "div";
        label = create('label') // create label
        label.className = "label";
        label.innerHTML = "website"
        div.append(label);
// create website input
        input = create('input'); // create input
        input.className = "input";
        input.setAttribute('type', "text");
        input.setAttribute('id', "website");
        input.setAttribute('value', obj.website);
        input.setAttribute('placeholder', "website");
        div.append(input);
        form.append(div);
// create coordinates label
        div = create('div'); // create row
        div.className = "div";
        label = create('label') // create label
        label.className = "label";
        label.innerHTML = "coordinates"
        div.append(label);
// create latitude input
        input = create('input'); // create input
        input.className = "input";
        input.setAttribute('type', "text");
        input.setAttribute('id', "latitude");
        input.setAttribute('placeholder', "latitude");
        input.setAttribute('value', obj.latitude);
        div.append(input);
// create longitude input
        input = create('input'); // create input
        input.setAttribute('type', "text");
        input.setAttribute('id', "longitude");
        input.setAttribute('placeholder', "longitude");
        input.setAttribute('value', obj.longitude);
        div.append(input);
        form.append(div);
// create notdienst label
        div = create('div'); // create row
        div.className = "div";
        label = create('label') // create label
        label.className = "label";
        label.innerHTML = "Notdienst"
        div.append(label);
// create notdienst input
        input = create('input');
        input.setAttribute('type', "date");
        input.setAttribute('name', "notdienst-date");
        input.setAttribute('id', "notdienst-date");
        div.append(input);
        form.append(div);
        
        const save = create('span'); // create input save button
        save.setAttribute('id', "save");
        save.className= "save";
        save.innerHTML = "save"

        form.append(save);
        container.append(form);

        el('#save').addEventListener('click',saveNewData); // add EventListener to save button
        // when click run function saveNewData
        }
}

export function saveNewData(){

        // SET Value in Variabels
        const id = Date.now();
        const apothekeName = el('#apo-name').value;
        const city         = el('#city').value;
        const apothekeAdresse = el('#address').value;
        const apothekeTelephone = el('#telephone').value;
        const filepath = el('#photo').value; //fileName
        const apothekeLogo = filepath.substring(filepath.lastIndexOf("\\") + 1); // get file name from path
        const website = el('#website').value;
        const latitude = el('#latitude').value;
        const longitude = el('#longitude').value;
        const notdienstData = el("#notdienst-date").value;

//      the values of should not Empty
        if(     !apothekeName       ||
                !apothekeAdresse    ||
                !apothekeTelephone  ||
                !apothekeLogo       ||
                !website            ||
                !latitude           ||
                !longitude          ||
                !notdienstData      ){
                const span = create('span');
                span.innerHTML = "This fields are requierd and cannot be empty"
                span.style.color = "#ff6b00";
                el('form').append(span);
                return
        }
        const samsstagOpen   = "08:00"; // set Pharmacy Opening time at Saturdays
        const samsstagClose  = "13:00"; // set Pharmacy closing time at Saturdays
        const werktageOpen   = "08:00"; // set Pharmacy Opening time at Worddays 
        const werktageClose  = "18:30"; // set Pharmacy closing time at Worddays
        const favorite       = "false";

        const newApo ={ // set values in Array
                id, apothekeName, city, apothekeAdresse, apothekeTelephone,
                apothekeLogo,website, latitude, longitude, notdienstData,
                samsstagOpen, samsstagClose, werktageOpen, werktageClose,favorite
        }
        db.writeItem(id,newApo); // pass the array value with ID to DB
        el('form').remove(); // remove the form
        createNewForm(); // create new form

}
// function to remove form
export function removeForm(){
        el("#form").remove(); // 
}

// function to update the data 
export function updateFormData(id, btn, array){
        db.deleteItem(id); // when function running delete the Item data from DB
        btn.removeEventListener("click",saveNewData()); // remove EventListener from save button
        btn.innerHTML = "update"; // set new inner HTML = UPDATE
        btn.addEventListener("click", ()=>{ // add new EventListener, when click
                db.upDateItem(array); // run update item function and pass it the array of data
                adminPage(); // run adminpage function
                db.deleteItem(id); // delete item data from db //just to be sure that item is deleted
        });
}