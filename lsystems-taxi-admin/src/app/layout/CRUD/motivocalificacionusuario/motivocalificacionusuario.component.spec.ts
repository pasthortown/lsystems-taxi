import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MotivoCalificacionUsuarioComponent } from './motivocalificacionusuario.component';

describe('MotivoCalificacionUsuarioComponent', () => {
   let component: MotivoCalificacionUsuarioComponent;
   let fixture: ComponentFixture<MotivoCalificacionUsuarioComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [ MotivoCalificacionUsuarioComponent ]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(MotivoCalificacionUsuarioComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});