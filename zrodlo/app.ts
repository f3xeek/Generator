import { plytkaMapyInter, appData } from "./interfaces.js"
export const appdata:appData = {
    plytki:[],
    zaznaczone:[],
    controlDown:false,
    mouseDown:false,
    zaznaczniePolem:false,
    wklejanie:false,
    mouseDownCoords:[0,0],
    schowek:[],
    plytkiKopia:[],
    historia:[],
    historiaZnacznik:-1
}

export const helpers = {
    zaznacz(plytka:plytkaMapyInter): void {
        if (appdata.zaznaczone.includes(plytka)) helpers.odznacz(plytka)
        else{
            if (!appdata.controlDown && !appdata.zaznaczniePolem){
                [...appdata.zaznaczone].forEach((rzecz) => helpers.odznacz(rzecz));
                appdata.zaznaczone.length = 0
            }
            
            appdata.zaznaczone.push(plytka)
            plytka.elementHTML.style.borderColor = "orange"
            
        }
    },
    odznacz(plytka:plytkaMapyInter): void{
        plytka.elementHTML.style.borderColor = "aliceblue"
        const miejsce = appdata.zaznaczone.indexOf(plytka)
        appdata.zaznaczone.splice(miejsce, 1);
    },
    control(e:string): void{
        appdata.controlDown = e == "keydown";
    }
}
export const mapaWidth = 20, mapaHeight = 20