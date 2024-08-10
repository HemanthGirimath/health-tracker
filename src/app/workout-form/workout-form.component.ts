import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule,FormBuilder, Form, Validators } from '@angular/forms'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'; 
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import { Router } from '@angular/router';
import { WorkoutServiceService } from '../workout-service.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-workout-form',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatCardModule,MatSelectModule],
  templateUrl: './workout-form.component.html',
  styleUrl: './workout-form.component.css'
})
export class WorkoutFormComponent {
  WorkoutFormComponent: any;

  constructor(private formBuilde:FormBuilder,private router:Router,private server:WorkoutServiceService,@Inject(PLATFORM_ID) private platformId: Object){
    this.initForm();

  }

  WorkoutForm:FormGroup = this.formBuilde.group({
    userName:['',Validators.required],
    workoutType:['',Validators.required],
    workoutMinutes:['',Validators.required]
  })

  private initForm(): void {
    this.WorkoutForm = this.formBuilde.group({
      userName: ['', Validators.required],
      workoutType: ['', Validators.required],
      workoutMinutes: ['', Validators.required]
    });
  }


  onSubmit() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.WorkoutForm.valid) {
        const newWorkout = {
          name: this.WorkoutForm.get('userName')!.value,
          workouts: [{ 
            type: this.WorkoutForm.get('workoutType')!.value, 
            minutes: this.WorkoutForm.get('workoutMinutes')!.value 
          }]
        };
        this.server.addUserData(newWorkout);
      }
    }
    this.router.navigate(['/workout-list']);
  }

  ngOnInit(){
  }
}


