export interface plytkaMapyInter {
  id: string;
  elementHTML: HTMLDivElement;
  usunTlo: Function
  klik: Function
}
export interface appData {
  plytki: plytkaMapyInter[];
  zaznaczone: plytkaMapyInter[];
  plytkiKopia: string[];
  historia: string[][];
  controlDown: boolean;
  zaznaczniePolem: boolean;
  mouseDown: boolean;
  wklejanie: boolean;
  mouseDownCoords: [number, number];
  schowek: {id:string,backpos:string}[];
  historiaZnacznik:number;
}