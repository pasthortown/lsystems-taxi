import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MotivoEstadoComponent } from './motivoestado.component';

describe('MotivoEstadoComponent', () => {
   let component: MotivoEstadoComponent;
   let fixture: ComponentFixture<MotivoEstadoComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [ MotivoEstadoComponent ]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(MotivoEstadoComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});