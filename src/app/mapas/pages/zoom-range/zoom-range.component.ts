import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.css']
})
export class ZoomRangeComponent implements AfterViewInit,OnDestroy{

  @ViewChild('mapa') divMapa!:ElementRef<HTMLElement>;
  mapa!:mapboxgl.Map;
  zoomLevel:number=10;
  center:[number,number]=[-79.92182398405727,-2.0248329866732493];

  constructor() { }

  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center:this.center,
      zoom:this.zoomLevel
    });

    this.mapa.on('zoom',(ev)=>{
        const zoomActual = this.mapa.getZoom();
        this.zoomLevel = zoomActual;
    })

    this.mapa.on('zoomend',(ev)=>{
      if(this.mapa.getZoom()>18){
        this.mapa.zoomTo(18);
      }
    })

    this.mapa.on('move',(ev)=>{
      const target = ev.target;
      const {lng,lat} = target.getCenter();
      this.center = [lng,lat];
    });
  }

  ngOnDestroy(): void {
    this.mapa.off('zoom',()=>{});
    this.mapa.off('zoomend',()=>{});
    this.mapa.off('move',()=>{});
  }

  zoomIn(){
    this.mapa.zoomIn();
    console.log('Zoom In');

  }

  zoomOut(){
    this.mapa.zoomOut();
    console.log('Zoom out');
  }

  zoomCambio(valor:string){
    this.mapa.zoomTo(Number(valor));
  }

  

}
