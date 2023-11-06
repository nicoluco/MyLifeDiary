import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  data2: any;
  data3: any;

  ngOnInit() { }
  usuario: string = "";
  niveles: any[] = [
    { id: 1, nivel: "Basica Incompleta" },
    { id: 2, nivel: "Basica Completa" },
    { id: 3, nivel: "Media Incompleta" },
    { id: 4, nivel: "Media Completa" },
    { id: 5, nivel: "Media Incompleta" },
    { id: 6, nivel: "Superior Completa" }
  ]
  data: any = {
    nombre: "",
    apellido: "",
    education: "",
    nacimiento: ""
  };
  constructor(public alertController: AlertController, private router: Router, private activerouter: ActivatedRoute) {
    this.activerouter.queryParams.subscribe(params => { //utilizamos lambd
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.data2 = this.router.getCurrentNavigation()?.extras.state;
        console.log(this.data2);
        this.usuario = this.data2.user.Usuario;
        console.log(this.usuario);
      }
    });
  }
  /**
   * Metodo limpíar recorre un objeto y se define el 
   * valor de su propiedad en ""
   */
  limpiar() {
    for (var [key, value] of Object.entries(this.data)) {
      Object.defineProperty(this.data, key, { value: "" })
    }
  }

  mostrar() {
    // IF
    (this.data.nombre != "" && this.data.apellido != "") &&
      // THEN 
      this.presentAlert("Usuario", "Su nombre es " + this.data.nombre + " " + this.data.apellido) ||
      // ELSE 
      this.presentAlert("Usuario", "No ingreso nada");
  }

  async presentAlert(titulo: string, message: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
