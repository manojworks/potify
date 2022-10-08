import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerNavComponent } from './manager-nav.component';

describe('ManagerNavComponent', () => {
  let component: ManagerNavComponent;
  let fixture: ComponentFixture<ManagerNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
