import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { Chart } from 'chart.js/auto';
import { WorkoutServiceService } from '../workout-service.service';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'; 
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
interface Workout {
  type: string;
  minutes: number;
}

interface UserData {
  id: number;
  name: string;
  workouts: Workout[];
}

@Component({
  selector: 'app-workout-graph',
  standalone: true,
  imports: [CanvasJSAngularChartsModule, CommonModule, FormsModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatSelectModule],
  templateUrl: './workout-graph.component.html',
  styleUrls: ['./workout-graph.component.css']
})
export class WorkoutGraphComponent implements OnInit {
  dataSource: UserData[] = [];
  selectedUserId: number | null = null;
  workoutChart: Chart | null = null;

  constructor(private server: WorkoutServiceService) {}

  ngOnInit(): void {
    this.loadUserData();
    if (this.dataSource.length > 0) {
      this.selectedUserId = this.dataSource[0].id;
      this.createChart(this.dataSource[0].workouts);
    }
  }

  loadUserData(): void {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      this.dataSource = JSON.parse(storedUserData);
      console.log('Loaded user data:', this.dataSource);
    } else {
      console.log('No user data found in localStorage');
    }
  }

  onUserChange(event: any): void {
    const selectedUser = this.dataSource.find(user => user.id == this.selectedUserId);
    if (selectedUser) {
      this.updateChart(selectedUser.workouts);
    }
  }

  createChart(workouts: Workout[]): void {
    const ctx = document.getElementById('workoutChart') as HTMLCanvasElement;
    if (!ctx) {
      console.error('Canvas element not found');
      return;
    }

    const workoutTypes = workouts.map(workout => workout.type);
    const workoutMinutes = workouts.map(workout => workout.minutes);

    this.workoutChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: workoutTypes,
        datasets: [{
          label: 'Workout Minutes',
          data: workoutMinutes,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  updateChart(workouts: Workout[]): void {
    if (this.workoutChart) {
      const workoutTypes = workouts.map(workout => workout.type);
      const workoutMinutes = workouts.map(workout => workout.minutes);

      this.workoutChart.data.labels = workoutTypes;
      this.workoutChart.data.datasets[0].data = workoutMinutes;
      this.workoutChart.update();
    } else {
      console.error('Chart not initialized');
    }
  }
}