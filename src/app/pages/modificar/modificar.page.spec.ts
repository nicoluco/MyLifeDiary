// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ModificarPage } from './modificar.page';
// import { ActivatedRoute, Router } from '@angular/router';
// import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

// import { of } from 'rxjs'; // Importa 'of' desde rxjs

// describe('ModificarPage', () => {

//   const fakeActivatedRoute = {
//     snapshot: { data: {} },
//     queryParams: of({ 'idEnviado': 1, 'textoEnviado': 'Texto de prueba', 'tituloEnviado': 'Título de prueba' })
//   } as ActivatedRoute;


//   let component: ModificarPage;
//   let fixture: ComponentFixture<ModificarPage>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ModificarPage],
//       providers: [
//         { provide: ActivatedRoute, useValue: fakeActivatedRoute },
//         { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); } },
//         SQLite],
//     }).compileComponents();

//     fixture = TestBed.createComponent(ModificarPage);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
