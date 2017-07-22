import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsdadfccccComponent } from './Asdadfcccc.component';

describe('AsdadfccccComponent', () => {
  let component: AsdadfccccComponent;
  let fixture: ComponentFixture<AsdadfccccComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsdadfccccComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsdadfccccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
