import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioDbService } from 'src/app/services/servicio-db.service';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
})
export class ModificarPage implements OnInit {
  titulo: string = "";
  texto: string = "";
  id: number = 0;

  constructor(private router: Router, private activeRouter: ActivatedRoute, private servicio: ServicioDbService) {
    this.activeRouter.queryParams.subscribe(param => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.id = this.router.getCurrentNavigation()?.extras?.state?.['idEnviado'];
        this.texto = this.router.getCurrentNavigation()?.extras?.state?.['textoEnviado'];
        this.titulo = this.router.getCurrentNavigation()?.extras?.state?.['tituloEnviado'];

      }
    })
  }

  ngOnInit() {
  }
  enviarDatos() {
    this.servicio.modificarDia(this.id, this.titulo, this.texto);
    this.servicio.presentToast("Día Actualizado");
    this.router.navigate(['/home']);
  }

}
