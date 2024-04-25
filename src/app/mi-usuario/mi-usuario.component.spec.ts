import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiUsuarioComponent } from './mi-usuario.component';

describe('MiUsuarioComponent', () => {
  let component: MiUsuarioComponent;
  let fixture: ComponentFixture<MiUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiUsuarioComponent]
    });
    fixture = TestBed.createComponent(MiUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
