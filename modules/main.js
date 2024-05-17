import {createNavbar} from "./home.js";
import {loadNavbar} from "./navbar.js";
import { create, el, group } from "./lib.js";
import { data } from "./loadData.js";
import { createTabel } from "./admin.js";
import {removeAllElement} from "./remove-container.js";

/*
-- here you'll find these Functions:
-- createTodayDate() --> return the date of today
-- homePage() --> create home page elements and call createNavbar()
-- adminPage() --> create admin page elements and call loadNavbar() createTabel() removeAllElement()
-- checkOpenDoor() --> check time -> to show if the pharmacy should be open or close now
-- checkNotdienst() --> function to check if a pharmacy has NOTDIENST today or NOT
-- openNotdienst() --> to set class open - if a pharmacy has NOTDIENST today
-- setFavorite() --> favorite to set favorite class or remove it
-- showCards() --> to add data cards in container --> in this function there is createCards()
-- createCards() --> to create cards, where the date will be showing in it - call createMap()
-- createMap()--> to create map - call showAposOnMap
-- // showAposOnMap--> to set data on map
*/

export const global = {counter : 0}; // set variable counter

let map; // declaration map varible

// create function retun the date of today
export function createTodayDate(){
    const date = new Date();
    const day = `0${date.getDate()}`;
    const month = `0${date.getMonth()+1}`;
    const year = date.getFullYear();
    let fullDate = ""
    return fullDate = `${year}-${month}-${day}`
}


// create home page elements
export async function homePage(){

    createNavbar(); // call create navbar function
    el('#home').addEventListener('click', homePage); // EventListener for home button call home page function
    el('#admin').addEventListener('click', adminPage); // EventListener for admin button call admin page function
    el("#search").addEventListener('click', homePage); // EventListener for search button call home page function

}

// create admin page elements
export async function adminPage(){
//    el('#container').remove(); // remove all elements
    removeAllElement() // remove all elements
    loadNavbar(); // call load navbar function
    createTabel(); // call create tabel function
    el('#home').addEventListener('click', homePage); // EventListener for home button call home page function
    el('#admin').addEventListener('click', adminPage); // EventListener for admin button call admin page function
}


// check time -> to show if the pharmacy should be open or close now 
export function checkOpenDoor(span){
    
    const date = new Date();
    const week = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const today = week[date.getDay()];
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const timeNow = `${hours}:${minutes}`;

    if ( today === "Sunday"){ // if today is Sunday
        span.className = span.className + "close"; // set class colse = orange color
    }
    else if( today === "Saturday"){ // if today is Saturday
        if(timeNow >= "08:00" || timeNow < "13:00"){ // if time now MORE than or equal  to 08.00 OR less than 13:00
            span.className = span.className + "open"; // set class open = green color
        }
        else{ // otherwise
            span.className = span.className + "close"; // set class colse = orange color

        }
    }
    else if(today == "Monday"      ||   // If today is Monday
            today == "Tuesday"     ||   // OR today is Tuesday
            today == "Wednesday"   ||   // OR today is Wednesday
            today == "Thursday"    ||   // OR today is Thursday
            today == "Friday" )         // OR today is Friday
            {
                if ( timeNow >= "08:00" || timeNow < "18:30"){ // if time now MORE than or equal  to 08.00 OR less than 18:30
                    span.className = span.className + "open"; // set class open = green color
                }
                else{ // otherwise
                    span.className = span.className + "close"; // set class colse = orange color
//                    console.log("close is active");
                }        
            }
}

// function to check if a pharmacy has NOTDIENST today or NOT
export function checkNotdienst(span,notdienstData){

    if (notdienstData == createTodayDate()){ // if Yes
        span.className = span.className + "notdiesnt"; // set class notdiesnt
    }
}

// function to set class open if a a pharmacy has NOTDIENST today
export function openNotdienst(span,notdienstData){

    if (notdienstData == createTodayDate()){
        span.setAttribute("class", "material-symbols-outlined open");
    }
}

// function favorite icon
// if element has no class favorite and it was clicked set favorite class = green
// if element has class favorite and it was clicked remove favorite class = grey
export function setFavorite(){
    const container = el("#container");
    const cards = el("#cards");
    if(container && cards){
        group("#cards span").forEach((e)=>{
            if (e.id ==="fav"){
                e.addEventListener("click",()=>{
                    e.classList.toggle('favorite');
                })
            } 
        })
    }
}


// function to add info cards in container
export function showCards(){

    const element = el('select'); // call select element 
    let myOption = ""; // option element
    let remove = "false"; // set variable remove

    function createContainer(){ //  function create container
        const container = el("#container"); //call container element
        const cards = create("div"); // create new div named cards -> as container for card
        cards.setAttribute("id","cards"); // give cards id = cards 
        container.append(cards); // append cards in container
    }

    createContainer(); // call funtion
    data.forEach((val)=>{ // set the data in data array in 
        createCards(val); // cards   
    });


    element.addEventListener("change",()=>{ // set EventListener to select element = change
        global.counter = 0;
        // when option was selected, remove value will change to be true
        // that main that the cards before that was created and should reomve from container
        // to show the new cards
        if(remove = "true"){ 
            el('#cards').remove(); // remove cards from container
            createContainer();  // call create contaner to create new cards with new data
        }
        myOption = element.value; // set option value in variable

        data.forEach((val)=>{ // call data

            if( myOption == val.city){ // if option value equal to one of the citys value in data

                createCards(val); // then call create cards function and pass the data in val
                                // here just the equal data will be passing to cards

            }else if(myOption == "Landkreis"){ // otherwise if  option is landkreis

                createCards(val); // call create cards function and pass the data in val
                                // here all data will be passing to cards
            }

            else if( myOption == "Notdienst"){ // otherwise if  option is Notdienst

                if(createTodayDate() == val.notdienstData){ // call create cards function and pass the data in val
                                                    
                    createCards(val); // here just data that has notdienst true 
                                     // will be passing to cards
                }
            }
        })
        remove = "true";   // set remove as true
// here should delete map container -> 
        el('#map').remove();
        createMap(); // create new map
    }
    );
    
    // function to create cards, where the date will be showing in it
    function createCards(val){
        global.counter ++; // counter ++ to count the number of cards that be created
        const card = create("div"); // create ne div
        card.className ="card"; // set class to div
        cards.append(card); // append new card in cards container
        const cardHeader = create("div"); // create new div as container 
        cardHeader.setAttribute("id", "card-header"); // set id 
        card.append(cardHeader); // append div in card
        let span = ""; // create new varible 
        span = create("span"); // create span - apo name will be passing in it later
        span.className = "apo-name"; // set class to span
        span.innerHTML = val.apothekeName; // set inner html apo-name
        cardHeader.append(span); // append span in cardHeader 
        const img = create("img"); // create img element
        img.className ="photo"; // set class
        img.setAttribute("src",`img/${val.apothekeLogo}`); // pass src photo path in img folder
        img.setAttribute("alt", "logo"); // set alt attribute
        card.append(img); // apend img in card
        span = create("span"); // create new span
        span.className = "address"; // set class
        span.innerHTML = val.apothekeAdresse; // pass adress as inner html
        card.append(span); // apend span in card
        span = create("span"); // create new span
        span.className = "phone"; // set class
        span.innerHTML = val.apothekeTelephone; // pass tel info as inner html
        card.append(span); // append span in card
        const div = create("div"); // create new div as container to the icons
        div.className = "div-icon"; // set class
        card.append(div); // append div in card
        span = create("span"); // create ne span
        span.className = "material-symbols-outlined "; // set class
        span.setAttribute("id", "door"); // set id attribute 
        span.innerHTML = "door_open"; // set inner html value
        checkOpenDoor(span); // call check open door function and pass the span 
        openNotdienst(span,val.notdienstData); // call open Notdienst function and pass the span and value
        div.append(span); // append span in div container
        const anker = create("a"); // create new anker 
        anker.setAttribute("link", "noopener"); // set attribute
        anker.setAttribute("target", "_blank"); // set attribute _blank as target to open the website in new tab
        anker.setAttribute("href", val.website); // pass the website linke as href attribute
        span = create("span"); // create new span
        span.className = "material-symbols-outlined website"; // set class to span
        span.innerHTML = "globe"; // set inner HTMl value
        anker.append(span); // append span in anker element
        div.append(anker); // append span in div container
        span = create("span"); // create new span element
        span.className = "material-symbols-outlined map "; // set class to span
        span.innerHTML = "location_on"; // set inner HTMl value
        span.setAttribute("id",val.apothekeTelephone); // set tel number as id
        // when map icon clicked - tel number will used as reference to compare the values
        div.append(span); // append span in div container
        span = create("span"); // create new span
        span.className = "material-symbols-outlined "; // set class to span
        span.innerHTML = "local_pharmacy"; // set inner HTMl value
        checkNotdienst(span,val.notdienstData); // call open Notdienst function and pass the span and value
        div.append(span); // append span in div container
        span = create("span"); // create new span
        span.className = "material-symbols-outlined "; // set class to span
        span.setAttribute("id", "fav"); // set id
        span.innerHTML = "favorite"; // set inner HTMl value        
        div.append(span); // append span in div container
        el("#info").innerHTML = `Total: ${global.counter} Apotheken`; // innerHTML counter = apo count

    }
    createMap();
}

setFavorite(); // call set favorite function


// function to create map
export async function createMap(){
    
    const container = el("#container");
    const mapContainer = create("div");
    mapContainer.setAttribute('id', 'mapContainer');
    const myMap = create('div'); // create new div named map to show the map in it
    myMap.setAttribute('id','map') // give map id = map
    mapContainer.append(myMap);
    container.append(mapContainer); // append map in container


    const cards = el("#cards");
    const card = el(".card");
    
    let setViewCordinat = [51.05947644537415, 6.122798424298746];
    map = map = L.map('map').setView(setViewCordinat, 10);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    if(container && cards){ // if container and cards are exist
        if(card){ // if card exist
            
            group('.card span').forEach((e)=>{ // set searching group to get all spans in card
                if( e.classList.contains("map")){ // if span has class map
                    e.addEventListener('click', ()=>{ // then add EventListener to it
                        data.forEach((val)=>{ 
                            // for each loop to get value in data array
                            if(val.apothekeTelephone == e.id){ // if tel number equal to span element id
                                setViewCordinat = [ val.latitude, val.longitude] ;
                                cards.style.display = "none";
//                                el('#map').style.display = "block";
                                showAposOnMap(); // call show apos on map function
                                map.flyTo(setViewCordinat,17);
                            }
                        });
                    });
                }
            })
        }
    }
}
// show apos on map function
// to set data on map

export async function showAposOnMap(){ 
    let positions  = []
    data.forEach((val)=>{ 
        positions = [val.latitude,val.longitude];
        const content = `
                        <h5>Info: ${val.apothekeName}</h5>
                        <span>Tel: ${val.apothekeTelephone}</span>
                        <span>${val.apothekeAdresse}</span>
                        <a>${val.website}<a/>
                        `;
        L.marker(positions)
        .bindPopup(content).addTo(map)
    })
}

export function serviceWorkerAktiv(){
    if ('serviceWorker' in navigator){
        navigator.serviceWorker.register('../service-worker.js', {scope: './' });
    }
}