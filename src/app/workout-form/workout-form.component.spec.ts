import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { WorkoutFormComponent } from './workout-form.component';
import { WorkoutServiceService } from '../workout-service.service';

describe('WorkoutFormComponent', () => {
  let component: WorkoutFormComponent;
  let fixture: ComponentFixture<WorkoutFormComponent>;
  let mockWorkoutService: jasmine.SpyObj<WorkoutServiceService>;

  beforeEach(async () => {
    mockWorkoutService = jasmine.createSpyObj('WorkoutServiceService', ['addUserData']);

    await TestBed.configureTestingModule({
      imports: [
        WorkoutFormComponent,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatCardModule,
        NoopAnimationsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: WorkoutServiceService, useValue: mockWorkoutService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.WorkoutForm).toBeTruthy('Form should be defined');
    
    expect(component.WorkoutForm.get('userName')).toBeTruthy('userName control should exist');
    expect(component.WorkoutForm.get('workoutType')).toBeTruthy('workoutType control should exist');
    expect(component.WorkoutForm.get('workoutMinutes')).toBeTruthy('workoutMinutes control should exist');
    
    expect(component.WorkoutForm.get('userName')!.value).toBe('', 'userName should be empty');
    expect(component.WorkoutForm.get('workoutType')!.value).toBe('', 'workoutType should be empty');
    expect(component.WorkoutForm.get('workoutMinutes')!.value).toBe('', 'workoutMinutes should be empty');
  });

  it('should validate required fields', () => {
    const form = component.WorkoutForm;
    expect(form.valid).toBeFalsy();
    
    form.patchValue({
      userName: 'John Doe',
      workoutType: 'running',
      workoutMinutes: '30'
    });
    
    expect(form.valid).toBeTruthy();
  });

  it('should call WorkoutServiceService.addUserData when form is submitted', () => {
    const form = component.WorkoutForm;
    form.patchValue({
      userName: 'John Doe',
      workoutType: 'running',
      workoutMinutes: '30'
    });
    
    component.onSubmit();
    
    expect(mockWorkoutService.addUserData).toHaveBeenCalledWith({
      name: 'John Doe',
      workouts: [{ type: 'running', minutes: '30' }]
    });
  });
});