import { el } from "./lib.js";

// function to remove container
export function removeAllElement(){
    const container = el("#container");
    container.remove();
}