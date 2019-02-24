import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Employee } from './employee';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const employees = [
      {id: 1, name: 'Jazmin'},
      {id: 2, name: 'Alvaro'},
      {id: 3, name: 'Podrick'},
      {id: 4, name: 'Judith'},
      {id: 5, name: 'Natalia'},
      {id: 6, name: 'Irma'},
      {id: 7, name: 'Saul'},
      {id: 8, name: 'Juan'},
      {id: 9, name: 'Miguel'},
      {id: 10, name: 'Paz'}
    ];
    return {employees};
  }

  // Overrides the genId method to ensure that a employee always has an id.
  // If the employees array is empty, the method below returns the initial number (11).
  // If the employees array is not empty, the method below returns the highest employee id + 1
  genId(employees: Employee[]): number {
    return employees.length > 0 ? Math.max(...employees.map(employee => employee.id)) + 1 : 11;
  }
}
