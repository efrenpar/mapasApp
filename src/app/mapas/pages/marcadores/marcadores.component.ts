import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface marcador{
  marker?:mapboxgl.Marker;
  color:string;
  centro?:[number,number]
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.css']
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!:ElementRef<HTMLElement>;
  mapa!:mapboxgl.Map;
  zoomLevel:number=10;
  center:[number,number]=[-79.92182398405727,-2.0248329866732493];
  marcadores:marcador[]=[];

  constructor() { }


  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center:this.center,
      zoom:this.zoomLevel
    });

    // const markerHtml:HTMLElement = document.createElement("div");
    // markerHtml.innerHTML = "Hola mundo"

    // new mapboxgl.Marker({
    //   // element:markerHtml
    // })
    // .setLngLat(this.center)
    // .addTo(this.mapa);

    this.leerLocalStorage();
  }


  irMarcador(marcador:marcador){

    this.mapa.flyTo({
      center:marcador.marker!.getLngLat()
    });
  }

  agregarMarcador(){

    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const nuevoMarcador = new mapboxgl.Marker({
      draggable:true,
      color
    })
    .setLngLat(this.center)
    .addTo(this.mapa)

    this.marcadores.push({
      marker:nuevoMarcador,
      color
    });

    this.guardarMarcadoresLocalStorage();

    nuevoMarcador.on('dragend',()=>{
      this.guardarMarcadoresLocalStorage();
    })

  }

  guardarMarcadoresLocalStorage(){

    const lngLatArr:marcador[]=[];

    this.marcadores.forEach(m=>{
      const color = m.color;
      const {lng,lat} = m.marker!.getLngLat();

      lngLatArr.push({
        color,
        centro:[lng,lat]
      });
    })

    localStorage.setItem("marcadores",JSON.stringify(lngLatArr))
  }

  leerLocalStorage(){
    if(!localStorage.getItem("marcadores")){
      return;
    }

    const lngLatArr:marcador[] = JSON.parse(localStorage.getItem("marcadores")!);

    lngLatArr.forEach(m=>{
      const newMaker = new mapboxgl.Marker({
        color:m.color,
        draggable:true
      })
      .setLngLat(m.centro!)
      .addTo(this.mapa)

      this.marcadores.push({
        marker:newMaker,
        color:m.color
      })

      newMaker.on('dragend',()=>{
        this.guardarMarcadoresLocalStorage();
      })
    })
  }

  borrarMarcador(i:number){
    this.marcadores[i].marker?.remove();
    this.marcadores.splice(i,1)
    this.guardarMarcadoresLocalStorage();
    console.log("double");
  }


}
