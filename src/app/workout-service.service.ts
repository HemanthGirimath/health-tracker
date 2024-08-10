import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkoutServiceService {

  constructor() { 

  }

 
  userData = [
    {
      id: 1,
      name: 'John Doe',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      workouts: [
        { type: 'Swimming', minutes: 60 },
        { type: 'Running', minutes: 20 }
      ]
    },
    {
      id: 3,
      name: 'Mike Johnson',
      workouts: [
        { type: 'Yoga', minutes: 50 },
        { type: 'Cycling', minutes: 40 }
      ]
    },
   ]
   ngOnInit(): void {
    this.loadUserData();
  }


  addUserData(newData: any) {
    const newId = this.userData.length + 1;
    const newUser = { id: newId, ...newData };
    this.userData.push(newUser);
    this.saveUserData();
  }

  saveUserData() {
    localStorage.setItem('userData', JSON.stringify(this.userData));
  }


  loadUserData() {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      this.userData = JSON.parse(storedData);
    }
    return storedData
  }

}
