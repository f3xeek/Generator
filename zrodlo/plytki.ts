import { appdata, helpers, mapaWidth, mapaHeight } from "./app.js";
import { plytkaMapyInter } from "./interfaces.js";
import { functionalities as menu } from "./menu.js";
function klikniecie(id:string){
    const rzecz = document.getElementById(String(id))
    const automat = document.getElementById("automat") as HTMLInputElement;
    if (rzecz && automat){
        let najId = 0;
        [...appdata.zaznaczone].forEach(plytka=>{ 
            plytka.elementHTML.style.backgroundPosition = rzecz.style.backgroundPosition
            helpers.odznacz(plytka)
            if (parseInt(plytka.id) > najId) najId = parseInt(plytka.id);
        })
        if (automat.checked ) helpers.zaznacz(appdata.plytki[najId+1]);
    }
    menu.stanDoHistorii()
}

class plytkaMapy implements plytkaMapyInter {
    id: string;
    elementHTML: HTMLDivElement;
    constructor(id: string, elementHTML: HTMLDivElement) {
        this.id = id;
        this.elementHTML = elementHTML;
    }
    klik = (): void =>{
        helpers.zaznacz(this)
    }
    usunTlo = ():void =>{
      this.elementHTML.style.backgroundPosition = "-3px -67px"
    }

}

export function inicjalizacja_plytek() {
  const mapa = document.getElementById("mapa");
  const rzeczy = document.getElementById("rzeczy");
  const rzeczyWidth = 16;
  const rzeczyHeight = 20;

  if (rzeczy) {
    for (let y = 0; y < rzeczyHeight; y++) {
      const rzad = document.createElement("div");
      rzad.classList.add("disp");

      for (let x = 0; x < rzeczyWidth; x++) {
        const plytka = document.createElement("div");
        plytka.id = String(y * rzeczyWidth + x);
        plytka.classList.add("plytka");
        plytka.style.backgroundPosition = `-${x * 32 + 3}px -${y * 32 + 3}px`;
        rzad.append(plytka);
        plytka.addEventListener("click", () => {
          klikniecie(plytka.id);
        });
      }
      rzeczy.append(rzad);
    }
  }
  if (mapa)
    for (let y = 0; y < mapaHeight; y++) {
      const rzad = document.createElement("div");
      rzad.classList.add("disp");

      for (let x = 0; x < mapaWidth; x++) {
        const plytka = document.createElement("div");
        const id = String(y * mapaWidth + x);
        plytka.id = id;
        plytka.classList.add("plytka");
        plytka.style.backgroundPosition = `-4px -67px`;
        rzad.append(plytka);
        const plytkaJs = new plytkaMapy(id, plytka)
        appdata.plytki.push(plytkaJs);
        plytka.addEventListener("click", plytkaJs.klik);
      }
      mapa.append(rzad);
    }
  menu.stanDoHistorii()
}
