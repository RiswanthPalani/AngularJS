import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BautomateComponent } from './bautomate.component';

describe('BautomateComponent', () => {
  let component: BautomateComponent;
  let fixture: ComponentFixture<BautomateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BautomateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BautomateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
