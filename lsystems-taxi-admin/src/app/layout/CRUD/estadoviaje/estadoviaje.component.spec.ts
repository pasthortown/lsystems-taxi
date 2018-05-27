import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EstadoViajeComponent } from './estadoviaje.component';

describe('EstadoViajeComponent', () => {
   let component: EstadoViajeComponent;
   let fixture: ComponentFixture<EstadoViajeComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [ EstadoViajeComponent ]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(EstadoViajeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});