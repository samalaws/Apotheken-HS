import { create, el } from "./lib.js";
import { db } from "./db.js";
import {adminPage} from "./main.js";
import { createTabel } from "./admin.js";

/* date we need to get
apo-name
adresse
telephon
path of logo photo
website
Coordinates la/lo for map
notdienst ja / nein - wenn ja dann wann datum
öffunug zeit    -> Sonntags false
                -> Smastags von 08 bis 13 Uhr 
                -> werttage von 08 bis 18:30 Uhr
favorite = false -> not in the Add Page
*/
// create HTML elements
export let obj = {
        id              : "",
        apoName         : "",
        city            : "",
        adresse         : "",
        tel             : "",
        website         : "",
        latitude        : "",
        longitude       : "",
    // notdienstDate   : Date.getDate(),
};

export function createNewForm(){


        if(el("#form")){

                el("#form").remove();

        }else if (!el("#form")){
                if(el('table')){
                        el('table').remove();
                }
                if(el("#add")){
                        el("#add").remove();
                }
        const container = el('#container');
        
        const form = create('form'); // create form
        form.setAttribute('id', "form");

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
        
        const save = create('span'); // create input
        save.setAttribute('id', "save");
        save.className= "save";
        save.innerHTML = "save"

        form.append(save);
        container.append(form);

        el('#save').addEventListener('click',saveNewData);
        }
}

export function saveNewData(){

        const id = Date.now();
        const apothekeName = el('#apo-name').value;
        const city         = el('#city').value;
        const apothekeAdresse = el('#address').value;
        const apothekeTelephone = el('#telephone').value;
        const filepath = el('#photo').value; //fileName
        const apothekeLogo = filepath.substring(filepath.lastIndexOf("\\") + 1);
//      const fileType = apothekeLogo.substring(apothekeLogo.lastIndexOf(".") + 1);
        console.log("File Name:", apothekeLogo);
//        console.log("File Type:", fileType);
        const website = el('#website').value;
        const latitude = el('#latitude').value;
        const longitude = el('#longitude').value;
        const notdienstData = el("#notdienst-date").value;
        
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
        const samsstagOpen   = "08:00";
        const samsstagClose  = "13:00";
        const werktageOpen   = "08:00";
        const werktageClose  = "18:30";
        const favorite       = "false";

        const newApo ={
                id, apothekeName, city, apothekeAdresse, apothekeTelephone,
                apothekeLogo,website, latitude, longitude, notdienstData,
                samsstagOpen, samsstagClose, werktageOpen, werktageClose,favorite
        }
        db.writeItem(id,newApo);
        el('form').remove();
        createNewForm();

}

export function removeForm(){
        el("#form").remove();
}

export function updateFormData(id, btn, array){
        db.deleteItem(id);
        btn.removeEventListener("click",saveNewData());
        btn.innerHTML = "update";
        btn.addEventListener("click", ()=>{
                db.upDateItem(array);
                adminPage();
                db.deleteItem(id);
        });



}