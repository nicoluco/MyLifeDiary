import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  capitulo: any = {
    titulo: "",
    texto: ""
  }

  hoy = new Date();

  data2: any;
  data3: any;

  tituloRecibido: string = "";
  textoRecibido: string = "";


  constructor(private router: Router, private activerouter: ActivatedRoute) {
    this.activerouter.queryParams.subscribe(params => { //utilizamos lambd
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.data2 = this.router.getCurrentNavigation()?.extras.state;
        console.log(this.data2);
        this.tituloRecibido = this.data2.capitulo.titulo;
      }
    });
  }

  ngOnInit() {
    }

  enviarDatos() { //crear una variable de tipo contexto que seria de tipo let y llamarla de cualquier modo, en este caso del mismo nombre de la libreria que va a utilizar
      let navigationExtras: NavigationExtras = {
        state: { //guardar en una estrutura los datos que vamos a pasar
          capitulo: this.capitulo
        }
      }
    this.router.navigate(['/home'], navigationExtras)
    }


}

