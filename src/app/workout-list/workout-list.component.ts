import { Component, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table'
import { WorkoutServiceService } from '../workout-service.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatFormField } from '@angular/material/select';
import { MatOption } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatLabel } from '@angular/material/input';
@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule,CommonModule,FormsModule,MatSelect,MatFormField,MatOption,MatInput,MatLabel],
  templateUrl: './workout-list.component.html',
  styleUrl: './workout-list.component.css'
})
export class WorkoutListComponent  {
  displayedColumns: string[] = ['Name', 'Workouts', 'number of workouts', 'Total Workout Minutes'];
  dataSource = new MatTableDataSource<any>();
  resultsLength = 0;
  workoutTypes: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private server: WorkoutServiceService) {}

  ngOnInit(): void {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      this.dataSource.data = userData.map((user: { name: any; workouts: any[]; }) => ({
        name: user.name,
        workouts: user.workouts.map(workout => workout.type).join(', '),
        numberOfWorkouts: user.workouts.length,
        totalMinutes: user.workouts.reduce((acc, workout) => acc + workout.minutes, 0)
      }));
      this.resultsLength = this.dataSource.data.length;
      this.extractWorkoutTypes(userData);
    }
    this.dataSource.filterPredicate = this.createFilter();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  extractWorkoutTypes(userData: any[]): void {
    const types = new Set<string>();
    userData.forEach(user => {
      user.workouts.forEach((workout: { type: string; }) => {
        types.add(workout.type);
      });
    });
    this.workoutTypes = Array.from(types);
  }

  applyNameFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = JSON.stringify({name: filterValue, workoutType: this.dataSource.filter ? JSON.parse(this.dataSource.filter).workoutType : ''});
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyWorkoutTypeFilter(event: any): void {
    const filterValue = event.value;
    this.dataSource.filter = JSON.stringify({name: this.dataSource.filter ? JSON.parse(this.dataSource.filter).name : '', workoutType: filterValue});
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createFilter(): (data: any, filter: string) => boolean {
    return (data: any, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);
      return data.name.toLowerCase().indexOf(searchTerms.name.toLowerCase()) !== -1 &&
             (searchTerms.workoutType === '' || data.workouts.toLowerCase().indexOf(searchTerms.workoutType.toLowerCase()) !== -1);
    };
  }
}