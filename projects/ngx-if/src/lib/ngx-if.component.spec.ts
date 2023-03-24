import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxIfComponent } from './ngx-if.component';

describe('NgxIfComponent', () => {
  let component: NgxIfComponent;
  let fixture: ComponentFixture<NgxIfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxIfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxIfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
