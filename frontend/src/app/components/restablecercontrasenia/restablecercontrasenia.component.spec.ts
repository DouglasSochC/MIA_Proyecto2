import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestablecercontraseniaComponent } from './restablecercontrasenia.component';

describe('RestablecercontraseniaComponent', () => {
  let component: RestablecercontraseniaComponent;
  let fixture: ComponentFixture<RestablecercontraseniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestablecercontraseniaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestablecercontraseniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
