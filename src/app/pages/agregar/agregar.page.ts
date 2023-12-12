import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ServicioDbService } from 'src/app/services/servicio-db.service';

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


  constructor(private router: Router, private activerouter: ActivatedRoute, private db: ServicioDbService, private alertController: AlertController, private toastController: ToastController) {
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
    this.db.insertarDia(this.capitulo.titulo, this.capitulo.texto);
    this.db.presentToast("Día Agregada");
 
 
    this.router.navigate(['/home'])
  }
  

  async presentToast(position: 'top' | 'middle' | 'bottom', msj: string) {
    const toast = await this.toastController.create({
      message: msj, //antes salia: 'Hello World!'
      duration: 1500,
      position: position,
    });

    await toast.present();
  }


}

