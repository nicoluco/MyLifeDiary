import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioDbService {

  //variables para manipular la conexión a la base de datos
  public database!: SQLiteObject;
  //variable para la sentencia de careación de tabla
  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario(id_usuario INTEGER PRIMARY KEY autoincrement, nombre_usu VARCHAR (30) , apellido_usu VARCHAR (30), nivel_edu VARCHAR (50), fecha_nac DATE );";
  //TABLA DEL DIARIO DE VIDA
  tablaDiario: string = "CREATE TABLE IF NOT EXISTS diario(id_diario INTEGER PRIMARY KEY autoincrement, titulo VARCHAR (40), texto TEXT,id_usuario INTEGER, FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario));";
  //variables para la sentencia de registros por defecto en la tabla
  registroDia: string = "INSERT or IGNORE INTO diario(id_diario,titulo,texto) VALUES (1,'Primer registro','texto de prueba');";
  //observable para manipular todos los registros de la tabla diario (crea un observable para cada tabla)
  //son elementos que van a transmitir info desde aquí (el servicio) a nustras pags de manera sincronica.(para q el usuario vea la info en tiempo real)
  listaDiario = new BehaviorSubject([]);
  //observable para manipular si la BD esta lista o no para su manipulación
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private toastController: ToastController, private alertController: AlertController) {
    this.crearBD();
  }
  async presentToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 3000,
      icon: 'globe'
    });
    await toast.present();
  }

  async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: msj,
      buttons: ['OK'],
    });
    await alert.present();
  }

  //funcion para la creación de la BBDD
  crearBD() {
    //verificamos que la plataforma este lista
    this.platform.ready().then(() => {
      //creamos la BD
      this.sqlite.create({
        name: 'bddiario.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        //guardamos la conexión a la BD en la variable propia
        this.database = db;
        //llamar a la funcion para crear las tablas
        this.crearTablas();
      }).catch(e => {
        //muestro el mensaje de error en caso de ocurrir alguno
        this.presentToast("Error BD:" + e);
      })
    })
  }

  async crearTablas() {
    try {
      //ejecuto mis tablas en orden de llaves primarias y foraneas
      await this.database.executeSql(this.tablaUsuario, []);
      await this.database.executeSql(this.tablaDiario, []);
      //ejecuto mis registro
      await this.database.executeSql(this.registroDia, []);
      //cargar todos los registros de la tabla en el observable
      this.buscarDia();
      //actualizar el status de la BD
      this.isDBReady.next(true);
    } catch (e) {
      this.presentToast("Error Tablas:" + e);
    }
  }  
  buscarDia() {
    //retorno la ejecución del select
    return this.database.executeSql('SELECT * FROM diario', []).then(res => {
      //creo mi lista de objetos del diario vacio
      let items: any[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id_diario,
            titulo: res.rows.item(i).titulo,
            texto: res.rows.item(i).texto
          })
        }
      }
      //actualizamos el observable del diario
      this.listaDiario.next(items as any);
    })
  }
  dbState() {
    return this.isDBReady.asObservable();
  }

  fetchDiario(): Observable<any[]> {
    return this.listaDiario.asObservable();
  }

  //funciones para el CRUD
  //para insertar noticias:   no se necesita la primaria porque es autoincrementable
  insertarDia(titulo: any, texto: any) {
    let data = [titulo, texto];
    return this.database.executeSql('INSERT INTO diario(titulo,texto) VALUES (?,?)', data).then(res => {
      this.buscarDia(); // y aca se modifica el observable de noticia porque hay un registro nuevo en esa tabla
    })
  }


  // funcion para modificar: aca si se va a necesitar al PK
  modificarDia(id: any, titulo: any, texto: any) {
    let data = [titulo, texto, id];
    return this.database.executeSql('UPDATE diario SET titulo = ?, texto = ? WHERE id_diario = ?', data).then(data2 => {
      this.buscarDia();
    })
  }

  eliminarDia(id: any) {
    return this.database.executeSql('DELETE FROM diario WHERE id_diario = ?', [id]).then(a => {
      this.buscarDia();
    })
  }

}
