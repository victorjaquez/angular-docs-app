import { Injectable } from '@angular/core';
import { Employee }  from './employee';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

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
    this.messageService.add('EmployeeService: fetched employees')
    return this.http.get<Employee[]>(this.employeesUrl)
      .pipe(
        tap(employees => this.log('fetched employees')),
        catchError(this.handleError('getEmployees', []))
      );
  }

  private handleError<T> (operation = 'operation', result ?: T) {
    return (error: any): Observable<T> => {
      console.log(error)
      this.log(`${operation} failed: ${error.message}`)
      return of(result as T)
    }
  }

  /**GET employee by id. Will 404 if id not found */
  getEmployee(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http.get<Employee>(url).pipe(
      tap(_ => this.log(`fetched employee id=${id}`)),
      catchError(this.handleError<Employee>(`getEmployee id=${id}`))
    )
  }

  /**PUT: update the employee on the server */
  updateEmployee(employee: Employee): Observable<any> {
    return this.http.put(this.employeesUrl, employee, httpOptions).pipe(
      tap(_ => this.log(`updated employee id=${employee.id}`)),
      catchError(this.handleError<any>('updatedEmployee'))
    )
  }

  /**POST: add a new employee to the server */
  addEmployee (employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.employeesUrl, employee, httpOptions).pipe(
      tap((newEmployee: Employee) => this.log(`added employee w/ id=${newEmployee.id}`)),
      catchError(this.handleError<Employee>('addEmployee'))
    );
  }

  /**DELETE: delete the employee from the server */
  deleteEmployee(employee: Employee | number): Observable<Employee> {
    const id = typeof employee === 'number' ? employee : employee.id;
    const url = `${this.employeesUrl}/${id}`;

    return this.http.delete<Employee>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted employee id=${id}`)),
      catchError(this.handleError<Employee>('deleteEmployee'))
    )
  }

  /**GET employees whose name contains search term */
  searchEmployees(term: string): Observable<Employee[]> {
    if(!term.trim()) {
      // if not search term, return empty employee array.
      return of([]);
    }
    return this.http.get<Employee[]>(`${this.employeesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found employees matching ${term}`)),
      catchError(this.handleError<Employee[]>('searchEmployees', []))
    );
  }

}
