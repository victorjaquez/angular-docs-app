import { Injectable } from '@angular/core';
import { Employee }  from './employee';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

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

  /** GET employees from the server */
  getEmployees(): Observable<Employee[]> {
    // TODO: send the message _after_ fetching the employees
    this.messageService.add('EmployeeService: fetched employees')
    return this.http.get<Employee[]>(this.employeesUrl)
      .pipe(
        tap(employees => this.log('fetched employees')),
        catchError(this.handleError('getEmployees', []))
      );
  }

  /** Handle Http operation that failed. */
  private handleError<T> (operation = 'operation', result ?: T) {
    return (error: any): Observable<T> => {
      console.log(error)
      this.log(`${operation} failed: ${error.message}`)
      return of(result as T)
    }
  }

  getEmployee(id: number): Observable<Employee> {
    // TODO: send the message _after_ fetching the employee
    this.messageService.add(`MessageService: fetched employee id=${id}`)
    return of(EMPLOYEES.find(employee => employee.id === id));
  }

}
