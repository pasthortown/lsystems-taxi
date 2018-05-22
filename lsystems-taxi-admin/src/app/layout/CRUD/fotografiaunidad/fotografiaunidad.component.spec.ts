import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FotografiaUnidadComponent } from './fotografiaunidad.component';

describe('FotografiaUnidadComponent', () => {
   let component: FotografiaUnidadComponent;
   let fixture: ComponentFixture<FotografiaUnidadComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [ FotografiaUnidadComponent ]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(FotografiaUnidadComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});