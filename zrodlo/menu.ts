import { appdata, helpers, mapaHeight , mapaWidth} from "./app.js";
export const functionalities = {
  showMenu(e: MouseEvent): void {
    const menu = document.getElementById("menu");
    if (menu) {
      menu.style.display = "flex";
      menu.style.left = `${e.clientX + window.scrollX}px`;
      menu.style.top = `${e.clientY + window.scrollY}px`;
    }
  },
  hideMenu(): void {
    const menu = document.getElementById("menu");
    if (menu) {
      menu.style.display = "none";
    }
  },
  delete(): void {
    [...appdata.zaznaczone].forEach((plytka) => {
      plytka.usunTlo();
      helpers.odznacz(plytka);
    });
    functionalities.stanDoHistorii()
  },
  kopiuj(): void {
    appdata.schowek = appdata.zaznaczone.map((obj) => ({id:obj.id,backpos:obj.elementHTML.style.backgroundPosition}));
  },
  wklejInit(): void {
    appdata.plytkiKopia = appdata.plytki.map((obj) => (obj.elementHTML.style.backgroundPosition));
    const mapa = document.getElementById("mapa");
    appdata.wklejanie = true;
    if (mapa) {
      let minix = Infinity,
        miniy = Infinity;
      appdata.schowek.forEach((plytka) => {
        const plytkaX = parseInt(plytka.id) % mapaWidth;
        const plytkaY = Math.floor(parseInt(plytka.id) / mapaWidth);

        if (plytkaX < minix) minix = plytkaX;
        if (plytkaY < miniy) miniy = plytkaY;
      });

      appdata.schowek.forEach((plytka) => {
        const id = parseInt(plytka.id);
        plytka.id = String(id - minix - miniy * mapaWidth);
      });
      functionalities.wklejAktualizacja();
    }
  },
  wklejAktualizacja(e?: MouseEvent): void {
    let mouseX, mouseY;

    if (appdata.wklejanie) {
      appdata.plytki.forEach((plytka) => {
        plytka.elementHTML.style.backgroundPosition = appdata.plytkiKopia[parseInt(plytka.id)]
      });
      if (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
      } else {
        mouseX = appdata.mouseDownCoords[0];
        mouseY = appdata.mouseDownCoords[1];
      }

      const mapa = document.getElementById("mapa");
      if (mapa) {
        const x = Math.floor((mouseX - mapa.getBoundingClientRect().x) / 35);
        const y = Math.floor((mouseY - mapa.getBoundingClientRect().y) / 35);

        const id = x + y * mapaWidth;
        appdata.schowek.forEach((plytka) => {
          if (
            x + (parseInt(plytka.id) % mapaWidth) < mapaWidth &&
            parseInt(plytka.id) + id < mapaWidth * mapaHeight
          ) {
            const plytkaDocelowa =
              appdata.plytki[parseInt(plytka.id) + id].elementHTML;

            plytkaDocelowa.style.backgroundPosition = plytka.backpos
          }
        });
      }
    }
  },
  zapiszPlik(): void {
    const data = appdata.plytki.map(
      (plytka) => plytka.elementHTML.style.backgroundPosition
    );
    const blob = new Blob([JSON.stringify(data)], {
      type: "application/json",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "mapa";
    document.body.append(link);
    link.click();
  },
  zaladujPlik(): void {
    const input = document.getElementById("blob");
    input?.click();
  },
  ladowanieBloba(): void {
    const blob = document.getElementById("blob") as HTMLInputElement;
    if (blob) {
      if (blob.files != null) {
        const file = blob.files[0];
        if (file) {
          const czytacz = new FileReader();
          czytacz.onload = (event: ProgressEvent<FileReader>) => {
            const wynik = event.target?.result;
            if (typeof wynik === "string") {
              const json = JSON.parse(wynik);
              appdata.plytki.forEach((plytka) => {
                plytka.elementHTML.style.backgroundPosition =
                  json[parseInt(plytka.id)];
              });
            }
          };
          czytacz.readAsText(file);
        }
      }
    }
  },
  stanDoHistorii(): void {
    appdata.historia.length = appdata.historiaZnacznik+1
    const data = appdata.plytki.map(
      (plytka) => plytka.elementHTML.style.backgroundPosition
    );
    if(appdata.historia.length>=20) appdata.historia.splice(0,1)
    appdata.historia.push(data)
    appdata.historiaZnacznik = appdata.historia.length-1
  },
  ladowanieHistorii():void{
    appdata.plytki.forEach(plytka=>{
      plytka.elementHTML.style.backgroundPosition = appdata.historia[appdata.historiaZnacznik][parseInt(plytka.id)]
    })
  },
  confijHistorie(): void{
    if(appdata.historiaZnacznik>0) appdata.historiaZnacznik-=1
    functionalities.ladowanieHistorii();
  },
  poprawHistorie():void{
    if (appdata.historiaZnacznik < appdata.historia.length-1) appdata.historiaZnacznik += 1;
    functionalities.ladowanieHistorii();
  }
};

