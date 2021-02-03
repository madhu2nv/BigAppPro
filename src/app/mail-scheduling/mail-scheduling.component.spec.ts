import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailSchedulingComponent } from './mail-scheduling.component';

describe('MailSchedulingComponent', () => {
  let component: MailSchedulingComponent;
  let fixture: ComponentFixture<MailSchedulingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailSchedulingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
