import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ListItemEditComponent} from './list-item-edit.component';

describe('ListItemEditComponent', () => {
  let component: ListItemEditComponent;
  let fixture: ComponentFixture<ListItemEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListItemEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
