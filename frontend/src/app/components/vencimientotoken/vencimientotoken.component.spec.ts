import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VencimientotokenComponent } from './vencimientotoken.component';

describe('VencimientotokenComponent', () => {
  let component: VencimientotokenComponent;
  let fixture: ComponentFixture<VencimientotokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VencimientotokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VencimientotokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
