import { TestBed } from '@angular/core/testing';
import { WorkoutServiceService } from './workout-service.service';

describe('WorkoutServiceService', () => {
  let service: WorkoutServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutServiceService);
    
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default data', () => {
    expect(service.userData.length).toBe(3);
    expect(service.userData[0].name).toBe('John Doe');
  });

  it('should add new user data', () => {
    const newUser = {
      name: 'Alice Brown',
      workouts: [{ type: 'Running', minutes: 35 }]
    };
    service.addUserData(newUser);
    expect(service.userData.length).toBe(4);
    expect(service.userData[3].name).toBe('Alice Brown');
    expect(service.userData[3].id).toBe(4);
  });

  it('should save user data to localStorage', () => {
    service.saveUserData();
    const storedData = localStorage.getItem('userData');
    expect(storedData).toBeTruthy();
    expect(JSON.parse(storedData!)).toEqual(service.userData);
  });

  it('should load user data from localStorage', () => {
    const testData = [
      { id: 1, name: 'Test User', workouts: [{ type: 'Test', minutes: 10 }] }
    ];
    localStorage.setItem('userData', JSON.stringify(testData));
    
    service.loadUserData();
    expect(service.userData).toEqual(testData);
  });

  it('should return stored data when loadUserData is called', () => {
    const testData = [
      { id: 1, name: 'Test User', workouts: [{ type: 'Test', minutes: 10 }] }
    ];
    localStorage.setItem('userData', JSON.stringify(testData));
    
    const loadedData = service.loadUserData();
    expect(loadedData).toBeTruthy();
    expect(JSON.parse(loadedData!)).toEqual(testData);
  });

  it('should return null when loadUserData is called and localStorage is empty', () => {
    const loadedData = service.loadUserData();
    expect(loadedData).toBeNull();
  });

  it('should call loadUserData on ngOnInit', () => {
    spyOn(service, 'loadUserData');
    service.ngOnInit();
    expect(service.loadUserData).toHaveBeenCalled();
  });

  it('should save data to localStorage when adding new user data', () => {
    spyOn(service, 'saveUserData');
    const newUser = {
      name: 'New User',
      workouts: [{ type: 'Test', minutes: 15 }]
    };
    service.addUserData(newUser);
    expect(service.saveUserData).toHaveBeenCalled();
  });
});