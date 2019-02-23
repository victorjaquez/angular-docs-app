import { Injectable } from '@angular/core';
import { Employee }  from './employee';
import { EMPLOYEES } from './mock-employees';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service' 

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  getEmployees(): Observable<Employee[]> {
    // TODO: send the message _after_ fetching the employees
    this.messageService.add('EmployeeService: fetched employees')
    return of(EMPLOYEES);
  }

  getEmployee(id: number): Observable<Employee> {
    // TODO: send the message _after_ fetching the employee
    this.messageService.add(`MessageService: fetched employee id=${id}`)
    return of(EMPLOYEES.find(employee => employee.id === id));
  }

  constructor(private messageService: MessageService) { }
}
