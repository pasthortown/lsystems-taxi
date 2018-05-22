import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FotografiaPersonaComponent } from './fotografiapersona.component';

describe('FotografiaPersonaComponent', () => {
   let component: FotografiaPersonaComponent;
   let fixture: ComponentFixture<FotografiaPersonaComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [ FotografiaPersonaComponent ]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(FotografiaPersonaComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});