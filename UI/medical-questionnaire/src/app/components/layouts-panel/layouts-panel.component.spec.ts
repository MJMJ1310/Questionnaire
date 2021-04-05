import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutsPanelComponent } from './layouts-panel.component';

describe('LayoutsPanelComponent', () => {
  let component: LayoutsPanelComponent;
  let fixture: ComponentFixture<LayoutsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutsPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
