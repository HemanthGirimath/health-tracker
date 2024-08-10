import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WorkoutServiceService {

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
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { 
    if (isPlatformBrowser(this.platformId)) {
      this.loadUserData();
    }
  }

  addUserData(newData: any) {
    const newId = this.userData.length + 1;
    const newUser = { id: newId, ...newData };
    this.userData.push(newUser);
    if (isPlatformBrowser(this.platformId)) {
      this.saveUserData();
    }
  }

  saveUserData() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('userData', JSON.stringify(this.userData));
    }
  }

  loadUserData() {
    if (isPlatformBrowser(this.platformId)) {
      const storedData = localStorage.getItem('userData');
      if (storedData) {
        this.userData = JSON.parse(storedData);
      }
    }
  }

}
