import { appdata, helpers, mapaWidth, } from "./app.js";

const pole = document.getElementById("pole");
const mapa = document.getElementById("mapa");
export function narysujPole(e: MouseEvent):void{
    if(pole && mapa && appdata.mouseDown){
        appdata.zaznaczniePolem = true
        pole.style.display = "block"
        const szerokosc = Math.abs(appdata.mouseDownCoords[0] - e.clientX);
        const wysokosc = Math.abs(appdata.mouseDownCoords[1] - e.clientY);
        const startX = Math.min(appdata.mouseDownCoords[0], e.clientX)-mapa.getBoundingClientRect().x;
        const startY = Math.min(appdata.mouseDownCoords[1], e.clientY)-mapa.getBoundingClientRect().y;
        
        pole.style.width = `${szerokosc+1}px`
        pole.style.height = `${wysokosc+1}px`
        pole.style.left = `${startX}px`;
        pole.style.top = `${startY}px`;
    }
}
export function zaznaczPolem():void{
    if (!appdata.controlDown){
        [...appdata.zaznaczone].forEach(rzecz => helpers.odznacz(rzecz))
    }
    if(pole && mapa && appdata.zaznaczniePolem){
        const kordy = pole.getBoundingClientRect()
        const mapaKordy =  mapa.getBoundingClientRect()

        const xfloat = kordy.x - mapaKordy.x;
        const yfloat = kordy.y - mapaKordy.y;

        const x = Math.floor(xfloat/35)
        const y = Math.floor(yfloat / 35);

        const width = Math.floor((kordy.width + (xfloat % 35)) / 35);
        const height = Math.floor((kordy.height + (yfloat % 35)) / 35);
        for (let j = y; j <= y + height; j++) {
          for (let i = x; i <= x + width; i++) {
            if(i<mapaWidth&& i>=0 && j>=0)
            helpers.zaznacz(appdata.plytki[i + j * mapaWidth]);
          }
        }
        pole.style.display = "none"
        appdata.zaznaczniePolem = false
    }
}