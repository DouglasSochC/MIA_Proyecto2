import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferenciatecnicoComponent } from './transferenciatecnico.component';

describe('TransferenciatecnicoComponent', () => {
  let component: TransferenciatecnicoComponent;
  let fixture: ComponentFixture<TransferenciatecnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferenciatecnicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferenciatecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
