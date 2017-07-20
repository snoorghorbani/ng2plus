import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NadaradComponent } from './Nadarad.component';

describe('NadaradComponent', () => {
  let component: NadaradComponent;
  let fixture: ComponentFixture<NadaradComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NadaradComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NadaradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
