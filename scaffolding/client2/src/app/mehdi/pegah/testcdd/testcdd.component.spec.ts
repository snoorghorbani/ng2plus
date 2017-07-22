import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestcddComponent } from './Testcdd.component';

describe('TestcddComponent', () => {
  let component: TestcddComponent;
  let fixture: ComponentFixture<TestcddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestcddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestcddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
