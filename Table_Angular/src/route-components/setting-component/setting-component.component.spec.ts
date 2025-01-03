import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingComponentComponent } from './setting-component.component';

describe('SettingComponentComponent', () => {
  let component: SettingComponentComponent;
  let fixture: ComponentFixture<SettingComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
