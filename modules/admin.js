import { data } from "./loadData.js";
import { el, create } from "./lib.js";
import{createNewForm,obj,updateFormData} from "./add.js";
import { db } from "./db.js";

// Run and SHOW the Data from DB 
// Give the ADMIN the opportunity to view, modify or delete the data items
// Function to create new table in Admin Page
export function createTabel(){


    if(el("table")){ // if table exist
        el("table").remove(); // remove it
    }
    if(el("#form")){ // if form exist
        el("#form").remove(); // remove it
    }
    if(el("#options")){ // if options in navbar exist
        el("#options").remove(); // remove it
    }

    const container = el('#container'); // get container element
    const table = create('table'); // create new table element
    let tr = ""; // empty tr element
    let th = ""; // empty th element
    let td  = ""; // empty td element
    let button = ""; // empty button

    tr = create("tr"); // create tr
// create, innerHTML and appent elements of th then appen them in tr
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

    th = create("th")
    th.innerHTML = "Notdienst date";
    tr.append(th);

    table.append(tr); // append tr in tabel
    
    data.forEach((val)=>{ // for each the data to get values

        // create tr and td elements and get values and innerHTMl them in the elements
        tr      = create('tr');

        td      = create('td'); 
        const name          = val.apothekeName; // 
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

        td      = create('td');
        const notdienstData = val.notdienstData;
        td.innerHTML        = notdienstData;
        tr.append(td);

        
        button = create("button") // create edit button
        button.setAttribute('id', "edit");
        button.setAttribute('key', val.id); // set value id for it as ID to connent it with the right value
        button.addEventListener("click", function(){ // add EventListener for Edit button
            const key = this.getAttribute('key'); 
            data.forEach((val)=>{
                if(val.id == key){
// create new form and set the values of the selected data item in the form elements
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
            const saveBtn = el('#save'); // when save button was clicked
            db.deleteItem(key); // deledte the old item from DB
            updateFormData( // run update form data function
                val.id, 
                saveBtn,
                val
            );
//            console.log(key);
        });
        button.innerHTML = "Edit"; // set inner HTML for it
        tr.append(button); // append edit button in tr element

        const btn = create("button") // delete item button
        btn.setAttribute('id', "delete"); 
        btn.innerHTML = "Delete";
        btn.setAttribute('key', val.id);// set value id for it as ID to connent it with the right data item (val.id = id of the data item)

        btn.addEventListener("click", function(){ // when clicked then run this function
            const key = this.getAttribute('key'); 
            db.deleteItem(key); // delete the item from DB
            this.closest('div').remove(); // remove the item from html
            window.location.reload(); // reload the app
        });
        tr.append(btn);

        table.append(tr);

    })
    container.append(table);

    
    if(!el('#add')){ // if add button not exist
        addButton(); // run add button function
        el('#add').addEventListener('click',createNewForm); // when clicked  run createNewForm function
    }else if(el('#add')){ // otherwise if was exist
        if(el("#form")){  // if from esixt
            el("#form").remove(); // then remove it
        }
    }
    
}

function addButton(){ // add button function -> Add button in NAVBAR
    const span      = create('span'); 
    span.className  = "material-symbols-outlined";
    span.setAttribute("id", "add");
    span.innerHTML  = "add";
    el('#icon-holder').append(span)
}

