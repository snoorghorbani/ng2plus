import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentDefinitionComponent } from './component-definition.component';

describe('ComponentDefinitionComponent', () => {
  let component: ComponentDefinitionComponent;
  let fixture: ComponentFixture<ComponentDefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentDefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
