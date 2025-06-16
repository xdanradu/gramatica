import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedImageComponent } from './shared-image.component';

describe('SharedImageComponent', () => {
  let component: SharedImageComponent;
  let fixture: ComponentFixture<SharedImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
