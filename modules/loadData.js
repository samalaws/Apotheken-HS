import { db } from "./db.js";


// function to get data from db und retrun data array


export let data = [];

export async function getData(){
    data = await db.readAllItems();
//    console.log(data);
    return data;
}





