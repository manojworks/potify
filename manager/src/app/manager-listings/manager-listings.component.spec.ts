import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerListingsComponent } from './manager-listings.component';

describe('ManagerListingsComponent', () => {
  let component: ManagerListingsComponent;
  let fixture: ComponentFixture<ManagerListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerListingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
