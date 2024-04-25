import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TributoComponent } from './tributo.component';

describe('TributoComponent', () => {
  let component: TributoComponent;
  let fixture: ComponentFixture<TributoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TributoComponent]
    });
    fixture = TestBed.createComponent(TributoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
