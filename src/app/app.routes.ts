import { Routes } from '@angular/router';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { WorkoutGraphComponent } from './workout-graph/workout-graph.component';

export const routes: Routes = [
    {path:'workout-form',component:WorkoutFormComponent},
    {path:'workout-list',component:WorkoutListComponent},
    {path:'workout-graph',component:WorkoutGraphComponent}
];
