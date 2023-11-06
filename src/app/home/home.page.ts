import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data2: any;
  data3: any;

  tituloRecibido: string = "";
  textoRecibido: string = "";
  titulosRecibidos: any = [];

  ngOnInit() { }
  usuario: string = "";

  constructor(public alertController: AlertController, private router: Router, private activerouter: ActivatedRoute) {
    this.activerouter.queryParams.subscribe(params => { //utilizamos lambd
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.data2 = this.router.getCurrentNavigation()?.extras.state;
        if (this.data2.user) {
          this.usuario = this.data2.user.Usuario;
        }
        if (this.data2.capitulo) {
          this.tituloRecibido = this.data2.capitulo.titulo;
          this.titulosRecibidos.unshift(this.tituloRecibido);
          console.log(this.titulosRecibidos);
        }

      }
    });
  }
  /**
   * Metodo limpíar recorre un objeto y se define el 
   * valor de su propiedad en ""
   */





  alerta() {
    console.log('Hola mundo')
  }

}
