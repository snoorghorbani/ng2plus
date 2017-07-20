import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KoonComponent } from './Koon.component';

describe('KoonComponent', () => {
  let component: KoonComponent;
  let fixture: ComponentFixture<KoonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KoonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
