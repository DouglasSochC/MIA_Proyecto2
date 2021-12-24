import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferenciajugadorComponent } from './transferenciajugador.component';

describe('TransferenciajugadorComponent', () => {
  let component: TransferenciajugadorComponent;
  let fixture: ComponentFixture<TransferenciajugadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferenciajugadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferenciajugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
