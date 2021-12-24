import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicarnoticiaComponent } from './publicarnoticia.component';

describe('PublicarnoticiaComponent', () => {
  let component: PublicarnoticiaComponent;
  let fixture: ComponentFixture<PublicarnoticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicarnoticiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicarnoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
