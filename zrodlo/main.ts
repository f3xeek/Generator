import { inicjalizacja_plytek } from "./plytki.js";
import { appdata,helpers } from "./app.js";
import { narysujPole, zaznaczPolem} from "./pole.js";
import { functionalities as menu } from "./menu.js";
function handleKeyboard(e:KeyboardEvent):void {
    if ((e.key=="s"||e.key=="S") && (e.ctrlKey||e.metaKey)) e.preventDefault()
    if(e.key=="Meta" || e.key=="Control") helpers.control(e.type)
    else if (e.key=="Delete" || e.key=="Backspace") menu.delete()
    if (appdata.controlDown && e.type == "keydown") {
      switch (e.key) {
        case "z":
          menu.confijHistorie();
          break;
        case "y":
          menu.poprawHistorie();
          break;
        case "x":
          menu.kopiuj();
          menu.delete();
          break;
        case "c":
          menu.kopiuj();
          break;
        case "v":
          menu.wklejInit();
          break;
        case "s":
          menu.zapiszPlik();
          break;
        case "l":
          menu.zaladujPlik();
          break;
      }
    }

}

function handleMouse(e:MouseEvent):void{
    appdata.mouseDownCoords = [e.clientX, e.clientY];
    if (appdata.wklejanie){
        appdata.wklejanie = false
        menu.stanDoHistorii();
    }
    if(e.button==0){
        appdata.mouseDown = true;
    }
    menu.hideMenu();
}

function zaznaczaniePolem2(){
    if(appdata.mouseDown){
        zaznaczPolem();
        appdata.mouseDown=false
    }
}
const input = document.getElementById("blob") as HTMLInputElement;
const mapa = document.getElementById("mapa")
window.addEventListener("load", inicjalizacja_plytek)
window.addEventListener("keydown", handleKeyboard);
window.addEventListener("keyup", handleKeyboard);
window.addEventListener("contextmenu",(e)=>e.preventDefault());
mapa?.addEventListener("contextmenu", menu.showMenu);
mapa?.addEventListener("mousemove", narysujPole)
mapa?.addEventListener("mousemove", menu.wklejAktualizacja)
mapa?.addEventListener("mousedown", handleMouse)
mapa?.addEventListener("mouseup", zaznaczaniePolem2);
mapa?.addEventListener("mouseleave", zaznaczaniePolem2);
mapa?.addEventListener("mouseleave", ()=>{appdata.wklejanie = false});

input?.addEventListener("change", menu.ladowanieBloba)

document.getElementById("Undo")?.addEventListener("click", menu.confijHistorie)
document.getElementById("Redo")?.addEventListener("click", menu.poprawHistorie)
document.getElementById("Cut")?.addEventListener("click", ()=>{menu.kopiuj();menu.delete()})
document.getElementById("Copy")?.addEventListener("click", menu.kopiuj)
document.getElementById("Paste")?.addEventListener("click", menu.wklejInit);
document.getElementById("Delete")?.addEventListener("click", menu.delete);
document.getElementById("Save")?.addEventListener("click", menu.zapiszPlik);
document.getElementById("Load")?.addEventListener("click", menu.zaladujPlik );

const menuHTML = document.getElementById("menu")
menuHTML?.querySelectorAll("button").forEach(guzik=>{guzik.addEventListener("click", menu.hideMenu)})