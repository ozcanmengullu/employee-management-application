import { LitElement, html, css } from 'https://cdn.skypack.dev/lit';
import { LocalizeMixin } from '../mixins/localization-mixin.js';
import store from '../store/store.js';
import './navigation-menu.js';
import { addEmployee, editEmployee } from '../store/employeeSlice.js';

class EmployeeForm extends LocalizeMixin(LitElement) {
  static styles = css`
  :host {
    display: block;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0 auto;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background: white;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 600px;
    padding: 24px;
  }

  label {
    font-weight: 500;
    color: #333;
    margin-bottom: 4px;
    display: block;
  }

  input, select {
    width: 100%;
    padding: 12px;
    margin: 4px 0;
    border: 2px solid #e0e0e0;
    border-radius: 6px;
    font-size: 16px;
    transition: border-color 0.3s ease;
    box-sizing: border-box;
  }

  input:focus, select:focus {
    outline: none;
    border-color: #ff9800;
    box-shadow: 0 0 0 2px rgba(255, 152, 0, 0.1);
  }

  button {
    background-color: #ff9800;
    color: white;
    padding: 14px 24px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    transition: all 0.3s ease;
    margin-top: 10px;
  }

  button:hover {
    background-color: #f57c00;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    :host {
      padding: 16px;
      margin: 10px;
      box-shadow: none;
    }

    input, select {
      padding: 10px;
      font-size: 14px;
    }

    button {
      padding: 12px 20px;
      font-size: 14px;
    }
  }
`;

  static properties = {
    employeeId: { type: String },
    employee: { type: Object }
  };

  constructor() {
    super();
    this.employee = {
      firstName: '',
      lastName: '',
      dateOfEmployment: '',
      dateOfBirth: '',
      phone: '',
      email: '',
      department: 'IT',
      position: 'Developer'
    };

    this.departments = ['Analytics', 'Tech'];
    this.positions = ['Junior', 'Medior', 'Senior'];
  }

  connectedCallback() {
    super.connectedCallback();
    const path = window.location.pathname;
    const match = path.match(/\/edit\/(\d+)/);
    
    if (match) {
      this.employeeId = match[1];
      const state = store.getState();
      const foundEmployee = state.employeeData.find(emp => emp.id === parseInt(this.employeeId));
      
      if (foundEmployee) {
        this.employee = { 
          ...foundEmployee,
          id: parseInt(this.employeeId)
        };
      }
    }
  }

  render() {
    return html`
      <navigation-menu></navigation-menu>
      <form>
        <div>
          <label>${this.t('firstName')}:</label>
          <input type="text" .value="${this.employee.firstName}" 
                 @input="${(e) => this.employee = { ...this.employee, firstName: e.target.value }}"
                 required>
        </div>
        <div>
          <label>${this.t('lastName')}:</label>
          <input type="text" .value="${this.employee.lastName}"
                 @input="${(e) => this.employee = { ...this.employee, lastName: e.target.value }}"
                 required>
        </div>
        <div>
          <label>${this.t('dateOfEmployment')}:</label>
          <input type="date" .value="${this.employee.dateOfEmployment}"
                 @input="${(e) => this.employee = { ...this.employee, dateOfEmployment: e.target.value }}"
                 required>
        </div>
        <div>
          <label>${this.t('dateOfBirth')}:</label>
          <input type="date" .value="${this.employee.dateOfBirth}"
                 @input="${(e) => this.employee = { ...this.employee, dateOfBirth: e.target.value }}"
                 required>
        </div>
        <div>
          <label>${this.t('phone')}:</label>
          <input type="tel" .value="${this.employee.phone}"
                 @input="${(e) => this.employee = { ...this.employee, phone: e.target.value }}"
                 required>
        </div>
        <div>
          <label>${this.t('email')}:</label>
          <input type="email" .value="${this.employee.email}"
                 @input="${(e) => this.employee = { ...this.employee, email: e.target.value }}"
                 required>
        </div>
        <div>
          <label>${this.t('department')}:</label>
          <select .value="${this.employee.department}"
                  @change="${(e) => this.employee = { ...this.employee, department: e.target.value }}"
                  required>
            ${this.departments.map(dept => html`
              <option value="${dept}">${this.t(`departments.${dept}`)}</option>
            `)}
          </select>
        </div>
        <div>
          <label>${this.t('position')}:</label>
          <select .value="${this.employee.position}"
                  @change="${(e) => this.employee = { ...this.employee, position: e.target.value }}"
                  required>
            ${this.positions.map(pos => html`
              <option value="${pos}">${this.t(`positions.${pos}`)}</option>
            `)}
          </select>
        </div>
        <button class="submit-button"  @click="${this._handleSubmit}">${this.t('save')}</button>
      </form>
    `;
  }

  // _handleSubmit(e) {
  //   e.preventDefault();
  //   console.log('Submit function called');  // Check if this is logged

  //   const form = this.shadowRoot.querySelector('form');
    
  //   if (!form.reportValidity()) {
  //     return;
  //   }
    
  //   if (this.employeeId) {
  //     store.dispatch(editEmployee({
  //       ...this.employee,
  //       id: parseInt(this.employeeId)
  //     }));
  //   } else {
  //     store.dispatch(addEmployee({
  //       ...this.employee,
  //       id: Date.now() // Yeni kayıt için unique ID
  //     }));
  //   }
    
  //   const event = new CustomEvent('location-changed', {
  //     detail: { path: '/' },
  //     bubbles: true,
  //     composed: true
  //   });
  //   this.dispatchEvent(event);
  // }

  _handleSubmit(e) {
    e.preventDefault(); // Prevent the default form submission behavior
  
    const form = this.shadowRoot.querySelector('form');
    if (!form.reportValidity()) {
      return;
    }
  
    if (this.employeeId) {
      store.dispatch(editEmployee({
        ...this.employee,
        id: parseInt(this.employeeId)
      }));
    } else {
      store.dispatch(addEmployee({
        ...this.employee,
        id: Date.now() // Unique ID for new record
      }));
    }
  
    // Custom event without navigating away
    const event = new CustomEvent('location-changed', {
      detail: { path: '/' },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }
  
}

customElements.define('employee-form', EmployeeForm);