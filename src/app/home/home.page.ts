import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, AnimationController, MenuController } from '@ionic/angular';
import { ServicioDbService } from '../services/servicio-db.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  token: any = "";
  descriptionClima: string = "";
  tiempo: number = 0;


  constructor(private servicioDb: ServicioDbService,
    public alertController: AlertController,
    private router: Router,
    private activerouter: ActivatedRoute,
    private animationCtrl: AnimationController,
    private menuCtrl: MenuController,
    private api: ApiService) { }


  arregloDiario: any = [
    {
      id: '',
      titulo: '',
      texto: ''
    }
  ]

  usuario: string = "";

  // data2: any;
  // data3: any;

  // tituloRecibido: string = "";
  // textoRecibido: string = "";
  // titulosRecibidos: any = [];

  ngOnInit() {
    this.menuCtrl.enable(true)

    this.token = localStorage.getItem('token');
    this.usuario = this.token

    this.servicioDb.dbState().subscribe(res => {
      if (res) {
        this.servicioDb.fetchDiario().subscribe(item => {
          this.arregloDiario = item;
          console.log(this.arregloDiario);
        })
      }
    });

    this.api.getTiempo().subscribe((data) => {
      this.tiempo = data.main.temp;
      this.descriptionClima = data.weather[0].description;
      console.log(data);
    })
  }

  modificar(x: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        idEnviado: x.id,
        tituloEnviado: x.titulo,
        textoEnviado: x.texto
      }
    }
    this.router.navigate(['/modificar'], navigationExtras);
    console.log("MODIFICANDO", x);
  }

  eliminar(x: any) {
    this.servicioDb.eliminarDia(x.id);
    this.servicioDb.presentToast("Día Eliminado");
  }

  // constructor(private servicioBd: ServicioDbService,public alertController: AlertController, private router: Router, private activerouter: ActivatedRoute, private animationCtrl: AnimationController, private menuCtrl: MenuController) {
  //   this.activerouter.queryParams.subscribe(params => { //utilizamos lambd
  //     if (this.router.getCurrentNavigation()?.extras.state) {
  //       this.data2 = this.router.getCurrentNavigation()?.extras.state;
  //       if (this.data2.user) {
  //         this.usuario = this.data2.user.Usuario;
  //       }
  //       if (this.data2.capitulo) {
  //         this.tituloRecibido = this.data2.capitulo.titulo;
  //         if (!this.titulosRecibidos.includes(this.tituloRecibido)) {
  //           this.titulosRecibidos.unshift(this.tituloRecibido);

  //         }
  //         console.log(this.titulosRecibidos);
  //       }

  //     }
  //   });
  // }
  /**
   * Metodo limpíar recorre un objeto y se define el 
   * valor de su propiedad en ""
   */



}
