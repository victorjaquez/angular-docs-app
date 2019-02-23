import { Component, OnInit } from '@angular/core';
import { EMPLOYEES } from '../mock-employees';
import { Employee } from '../employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees = EMPLOYEES;
  selectedEmployee: Employee;

  onSelect(employee: Employee): void {
    this.selectedEmployee = employee;
  }

  constructor() { }

  ngOnInit() {
  }

}
