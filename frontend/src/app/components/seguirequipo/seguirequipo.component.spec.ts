import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguirequipoComponent } from './seguirequipo.component';

describe('SeguirequipoComponent', () => {
  let component: SeguirequipoComponent;
  let fixture: ComponentFixture<SeguirequipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeguirequipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguirequipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
