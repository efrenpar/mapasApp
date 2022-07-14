import { Component, OnInit } from '@angular/core';


interface MenuItem{
  ruta:string;
  nombre:string;
}



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles:[
    `
      li{
        cursor:pointer;
      }
    `
  ]
})
export class MenuComponent implements OnInit {

  menuItems:MenuItem[]=[
    {
      ruta:'/mapas/fullscreen',
      nombre:"FullsCreen"
    },
    {
      ruta:'/mapas/zoom-range',
      nombre:"Zoom Range"
    },
    {
      ruta:'/mapas/marcadores',
      nombre:"marcadores"
    },
    {
      ruta:'/mapas/propiedades',
      nombre:"propiedades"
    },
  ]



  constructor() { }

  ngOnInit(): void {
  }

}
