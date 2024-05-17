import { data, } from "./loadData.js";
import { loadNavbar } from "./navbar.js";
import { el, create } from "./lib.js";
import { removeAllElement } from "./remove-container.js";
import {setFavorite, showCards, global} from "./main.js";


export function createNavbar(){

    let citys = []; // get city values from data array an push it in new array
    data.forEach((val)=>{
        citys.push(val.city);
    })
    const uniqeCitys = new Set(citys); // set uniqe city values in new array
//    console.log(uniqeCitys);

    removeAllElement(); // call removeAllElement() to remove container and all elements in it
    loadNavbar(); // call loadNavbar()
    global.counter = 0;
// select navbar element
    const navbar = el('#navbar');

// create div = options, set id, and append it
    const options = create("div");
    options.setAttribute("id", "options");
    navbar.append(options);

// create label = set class, and append it
    const label = create("label");
    label.className = "label-select";
    options.append(label);

    // create span, set class, innerHtmal and append it
    const labelSpan = create("span");
    labelSpan.className = "label-span";
    labelSpan.innerHTML = "Bitte eine Stad auswählen";
    label.append(labelSpan);

// create select element , set class, and append it
    const select = create("select");
    select.className = "label-select";
    select.setAttribute("id", "select-options");
    select.setAttribute("aria-label", "select city");
    options.append(select);

// create options landkreis, set class, innerHTML, value and append it
    let mOption = create("option");
    mOption.className = ("stadt");
    mOption.innerHTML = "Landkreis";
    mOption.value = "Landkreis";
    select.append(mOption);

// create options Notdienst, set class, innerHTML, value and append it
mOption = create("option");
    mOption.className = ("stadt");
    mOption.innerHTML = "Notdienst";
    mOption.value = "Notdienst";
    select.append(mOption);
    
// create options uniqe citys values, set class, innerHTML = city value and append it
uniqeCitys.forEach((val)=>{ 
        let cityName = val;        
        const mOption = create("option");
        mOption.className = ("stadt");
        mOption.setAttribute("name","stadt");
        mOption.innerHTML = cityName;
        select.append(mOption);
    });
    
    const searchHolder = create("div"); // create new div searchHolder as container
    searchHolder.setAttribute("id","search-holder"); // set id
    options.append(searchHolder); // append div in options
    let span = create('span'); // create new span
    span.setAttribute("id", "info"); // set id
//    span.innerHTML = `Total: ${counter} Apotheken`; // innerHTML counter = apo count
    searchHolder.append(span); // append span in div container
    const button = create('button'); // create button
    button.setAttribute("id", "search"); // set id
    button.innerHTML = `SUCHEN`; // set innerHTML
    
    searchHolder.append(button); //append button in div container

//##################################################    
// create cards    
    showCards();
// favorite icon function
    setFavorite();
// select option function


}