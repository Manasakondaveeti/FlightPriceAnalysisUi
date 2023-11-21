import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDialogComponentComponent } from './data-dialog-component.component';

describe('DataDialogComponentComponent', () => {
  let component: DataDialogComponentComponent;
  let fixture: ComponentFixture<DataDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataDialogComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
