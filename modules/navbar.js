import { el, create } from "./lib.js";
import{getData} from "./loadData.js";

/*
-- here you'll find loadNavbar() Functions:
-- call getData()
*/

// create Navbar.
// Navbar will be used in Home page, admin page, add new Pharmacy form ..ext
export function loadNavbar(){
    const body = el('body'); // select body element

// container
    const container = create('div'); // create container
    container.setAttribute("id", "container"); // add id to container
    body.append(container); // append container in body

// create div = navbar, set id and append
    const navbar    = create("div");
    navbar.setAttribute("id", "navbar");
    container.append(navbar);

// create div = logoBar, set id and append
    const logoBar    = create("div");
    logoBar.setAttribute("id", "logo-bar");
    navbar.append(logoBar);

// create div = logoHolder, set id and append
    const logoHolder = create('div');
    logoHolder.setAttribute("id", "logo-holder");
    logoBar.append(logoHolder);

// create div = logo, set id, innerHTML and append
    const logo = create("span");
    logo.setAttribute("id", "logo");
    logo.innerHTML = "Apotheken-HS";
    logoHolder.append(logo);

// create div = iconHolder, set id, and append
    const iconHolder = create("div");
    iconHolder.setAttribute("id", "icon-holder");
    logoBar.append(iconHolder);

// create div = homeSpan, set id, className,  innerHTML and append
    const homeSpan = create("span");
    homeSpan.setAttribute("id", "home");
    homeSpan.className = "material-symbols-outlined";
    homeSpan.innerHTML = "home"; // Home icon in Navbar
    iconHolder.append(homeSpan);

// create div = adminSpan, set id, className,  innerHTML and append
    const adminSpan = create("span");
    adminSpan.setAttribute("id", "admin");
    adminSpan.className = "material-symbols-outlined";
    adminSpan.innerHTML = "settings"; // Admin icon in Navbar
    iconHolder.append(adminSpan);

    getData(); // call getData function

}