import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemDayComponent } from './list-item-day.component';

describe('ListItemDayComponent', () => {
  let component: ListItemDayComponent;
  let fixture: ComponentFixture<ListItemDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListItemDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
