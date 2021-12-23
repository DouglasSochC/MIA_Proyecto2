import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjusteclienteComponent } from './ajustecliente.component';

describe('AjusteclienteComponent', () => {
  let component: AjusteclienteComponent;
  let fixture: ComponentFixture<AjusteclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjusteclienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjusteclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
