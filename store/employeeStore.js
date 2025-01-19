// store/employeeStore.js
export class EmployeeStore {
    constructor() {
      this.employees = JSON.parse(localStorage.getItem('employees')) || [];
    }
  
    getEmployees() {
      return this.employees;
    }
  
    addEmployee(employee) {
      this.employees.push(employee);
      this.save();
    }
  
    updateEmployee(updatedEmployee) {
      const index = this.employees.findIndex(e => e.id === updatedEmployee.id);
      if (index !== -1) {
        this.employees[index] = updatedEmployee;
        this.save();
      }
    }
  
    deleteEmployee(id) {
      this.employees = this.employees.filter(e => e.id !== id);
      this.save();
    }
  
    save() {
      localStorage.setItem('employees', JSON.stringify(this.employees));
    }
  }
  