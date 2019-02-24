import { Injectable } from '@angular/core';
import { Employee }  from './employee';
import { EMPLOYEES } from './mock-employees';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeesUrl = 'api/employees'; // URL to web api

  constructor(
    private http: HttpClient, 
    private messageService: MessageService) { }

  /* Log a EmployeeService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`EmployeeService: ${message}`)
  }


  getEmployees(): Observable<Employee[]> {
    // TODO: send the message _after_ fetching the employees
    this.messageService.add('EmployeeService: fetched employees')
    return this.http.get<Employee[]>(this.employeesUrl)
  }

  getEmployee(id: number): Observable<Employee> {
    // TODO: send the message _after_ fetching the employee
    this.messageService.add(`MessageService: fetched employee id=${id}`)
    return of(EMPLOYEES.find(employee => employee.id === id));
  }

}
