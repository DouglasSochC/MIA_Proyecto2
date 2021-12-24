import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionpartidoComponent } from './informacionpartido.component';

describe('InformacionpartidoComponent', () => {
  let component: InformacionpartidoComponent;
  let fixture: ComponentFixture<InformacionpartidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionpartidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionpartidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
