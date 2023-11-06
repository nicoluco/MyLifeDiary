import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  /*Se genera el modelo user con dos claves
  cada clave tiene su valor inicial*/
  login: any = {
    Usuario: "",
    Password: ""
  }
  field: string = "";

  constructor(private router: Router, public toastController: ToastController) { } //se debe instanciar

  ngOnInit() {
  }
  ingresar() {
    if (this.validateModel(this.login)) {
      if (!((this.login.Usuario).length < 9 && (this.login.Usuario).length > 2)) {
        this.presentToast("El nombre de usuario debe tener un min de 3 letras y un max de 8");
        return;
      }
      if (!/^\d{4}$/.test(this.login.Password)) {
        this.presentToast("La contraseña debe contener exactamente 4 números");
        return;
      }
      this.presentToast("Bienvenido");
      
      let navigationExtras: NavigationExtras = {
        state: {
          user: this.login // Al estado le asignamos un objeto con clave y valor
        }
      };
      this.router.navigate(['/home'], navigationExtras);//navegamos hacia el home y enviamos información adicional

    }
    else {
      this.presentToast("Falta: " + this.field);
    }


   
  }

  validateModel(model: any) {
    // Recorro todas las entradas que me entrega Object entries y obtengo su clave, valor
    for (var [key, value] of Object.entries(model)) {
      // Si un valor es "" se retornara false y se avisara de lo faltante
      if (value == "") {
        // Se asigna el campo faltante
        this.field = key;
        // Se retorna false
        return false;
      }
    }
    return true;
  }
  /*
  * Muestra un toast al usuario
  * @param message Mensaje a presentar al usuario
  * @param duration Duración el toast, este es opcional
  */
  async presentToast(message: string, duration ?: number){
  const toast = await this.toastController.create(
    {
      message: message,
      duration: duration ? duration : 2000
    }
  );
  toast.present();
}
}
