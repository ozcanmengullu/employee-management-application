import { LitElement, html, css } from 'https://cdn.skypack.dev/lit';
import store from '../store/store.js';
import { LocalizeMixin } from '../mixins/localization-mixin.js';
import { i18n } from '../services/i18n-service.js';
import './navigation-menu.js';
import { addEmployee, editEmployee, deleteEmployee } from '../store/employeeSlice.js';

class EmployeeList extends LocalizeMixin(LitElement) {
  static styles = css`
  :host {
    display: block;
    padding: 24px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: #f8f9fa;
    min-height: 100vh;
  }
  navigation-menu {
      margin-bottom: 15px;
    }
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  .page-title {
    font-size: 24px;
    color: #ff5722;
    font-weight: 500;
    margin-left: 45px;
  }

  .header-actions {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  .add-new {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: #ff5722;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }

  table {
    width: 95%;
    max-width: 1200px;
    margin: 0 auto;
    background: white;
    border-radius: 8px;
    border-collapse: separate;
    border-spacing: 0;
    margin-top: 16px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  tr:hover {
    background-color: #f0f0f0;
  }

  th {
    text-align: left;
    padding: 12px 8px;
    font-weight: 500;
    color: #ff5722;
    border-bottom: 1px solid #eee;
    font-size: 13px;
  }

  td {
    padding: 10px 8px;
    color: #333;
    border-bottom: 1px solid #eee;
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 150px;
  }

  .checkbox-cell {
    width: 40px;
    padding-left: 16px;
  }

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    border-radius: 4px;
    border: 2px solid #ddd;
  }

  .actions-cell {
    text-align: right;
    padding-right: 16px;
  }

  .action-button {
    padding: 4px;
    background: none;
    border: none;
    cursor: pointer;
    color: #666;
    margin-left: 8px;
  }
  .actions button {
      padding: 4px;
      background: transparent;
      border: none;
      color: #ff5722;
      margin-left: 8px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s ease;
    }

  .actions button:hover {
    color: #ff8a65;
  }

  .actions button svg {
    width: 16px;
    height: 16px;
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 24px;
    gap: 4px;
  }

  .pagination button {
    min-width: 32px;
    height: 32px;
    padding: 0 8px;
    border: 1px solid #ddd;
    background: white;
    color: #666;
    cursor: pointer;
    border-radius: 20px;
    font-size: 14px;
    
  }
  .pagination-button {
    color: #ff5722;
    border: none;
  }

  .pagination button.active {
    background: #ff5722;
    color: white;
    border-color: #ff5722;
  }

  .pagination button:hover:not(.active) {
    background: #f8f9fa;
  }

  .view-toggle {
    display: flex;
    gap: 8px;
  }

  .view-toggle button {
    padding: 8px;
    background: none;
    border: none;
    cursor: pointer;
    color: #666;
  }

  .view-toggle button:hover {
    color: #ff5722;
  }
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal {
    background: white;
    padding: 24px;
    border-radius: 8px;
    text-align: center;
    min-width: 300px;
  }

  .modal-title {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 16px;
    color: #ff5722;
    text-align: left;
  }

  .modal-content {
    margin-bottom: 24px;
    color: #666;
    line-height: 1.5;
  }

  .modal-buttons {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .modal-buttons button {
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    width: 100%;
  }

  .proceed-button {
    background: #ff5722;
    color: white;
  }

  .cancel-button {
    background: #e0e0e0;
    color: #333;
  }

  @media (max-width: 768px) {
    .table-container {
      overflow-x: auto;
    }

    :host {
      padding: 16px;
    }
  }

  @media (max-width: 768px) {
    table, thead, tbody, th, td, tr {
      display: block;
    }
    navigation-menu {
      margin-bottom: none;
    }
    .page-title {
      margin-left: 7.5px;
    }
    thead tr {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }
    input[type="checkbox"] {
      display: none;
  }
    tr {
      margin-bottom: 16px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    td {
      position: relative;
      padding: 12px 12px 12px 50%;
      border: none;
      border-bottom: 1px solid #eee;
    }

    td:before {
      position: absolute;
      left: 12px;
      width: 45%;
      padding-right: 10px;
      white-space: nowrap;
      font-weight: 500;
      color: #666;
    }

    /* Her hücre için başlık ekleme */
    td:nth-of-type(2):before { content: "Ad:"; }
    td:nth-of-type(3):before { content: "Soyad:"; }
    td:nth-of-type(4):before { content: "İşe Giriş:"; }
    td:nth-of-type(5):before { content: "Doğum Tarihi:"; }
    td:nth-of-type(6):before { content: "Telefon:"; }
    td:nth-of-type(7):before { content: "E-posta:"; }
    td:nth-of-type(8):before { content: "Departman:"; }
    td:nth-of-type(9):before { content: "Pozisyon:"; }

    .checkbox-cell {
      display: none;
    }

    .actions {
      text-align: center;
      padding-left: 25px;
      justify-content: center;
      display: flex;
    }


    .page-header {
      flex-direction: column;
      gap: 16px;
    }

    .header-actions {
      width: 100%;
      justify-content: space-between;
    }

    .pagination {
      flex-wrap: wrap;
      gap: 8px;
    }

    .pagination button {
      flex: 1;
      min-width: auto;
    }
  }
`;

  static properties = {
    employees: { type: Array },
    currentPage: { type: Number },
    totalPages: { type: Number },
    selectedLanguage: { type: String },
    showModal: { type: Boolean },
    selectedEmployeeId: { type: String }
  };

  constructor() {
    super();
    this.employees = store.getState().employeeData;
    this.currentPage = 1;
    this.pageSize = 10;
    this.totalPages = Math.ceil(this.employees.length / this.pageSize);
    this.selectedLanguage = i18n.locale;
    this.showModal = false;
    this.selectedEmployeeId = null;

    store.subscribe(() => {
      this.employees = store.getState().employeeData;
      this.totalPages = Math.ceil(this.employees.length / this.pageSize);
      this.requestUpdate();
    });
  }

  _changeLanguage(event) {
    this.selectedLanguage = event.target.value;
    i18n.setLocale(event.target.value);
    this.requestUpdate();
  }

  _editEmployee(id) {
    const employee = store.getState().employeeData.find(emp => emp.id === id);
    if (employee) {
      localStorage.setItem('editingEmployee', JSON.stringify(employee));
      
      const event = new CustomEvent('location-changed', {
        detail: { path: `/edit/${id}` },
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(event);
    } else {
      alert(this.t('list.employeeNotFound'));
    }
  }

_deleteEmployee(id) {
  this.selectedEmployeeId = id;
  const employee = this.employees.find(emp => emp.id === id);
  this.selectedEmployeeName = `${employee.firstName} ${employee.lastName}`;
  this.showModal = true;
  console.log(store.getState().employeeData.length)
}

_confirmDelete() {
  store.dispatch(deleteEmployee({ id: this.selectedEmployeeId }));
  this.showModal = false;
  console.log(store.getState().employeeData.length)

}
_handleCancel() {
  this.showModal = false;
  console.log(store.getState().employeeData.length)
  this.showCancelConfirmation = false;
}


  addEmployee() {
    const event = new CustomEvent('location-changed', {
      detail: { path: '/add' },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  _changePage(page) {
    this.currentPage = page;
  }

  render() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const currentEmployees = this.employees.slice(startIndex, startIndex + this.pageSize);

    return html`
    ${this.showModal ? html`
      <div class="modal-overlay">
        <div class="modal">
          <div class="modal-title">${this.t('modal.areYouSure')}</div>
          <div class="modal-content">
            ${this.t('modal.selectedEmployeeWillBeDeleted')} ${this.selectedEmployeeName} ${this.t('modal.willBeDeleted')}
          </div>
          <div class="modal-buttons">
            <button class="proceed-button" @click=${this._confirmDelete}>
              ${this.t('modal.proceed')}
            </button>
            <button class="cancel-button" @click=${this._handleCancel}>
              ${this.t('modal.cancel')}
            </button>

          </div>
        </div>
      </div>
    ` : ''}
      <navigation-menu></navigation-menu>
      <span class="page-title">${this.t('employeeListHeader')}</span>
      <table>
        <thead>
          <tr>
            <th><input type="checkbox"></th>
            <th>${this.t('firstName')}</th>
            <th>${this.t('lastName')}</th>
            <th>${this.t('dateOfEmployment')}</th>
            <th>${this.t('dateOfBirth')}</th>
            <th>${this.t('phone')}</th>
            <th>${this.t('email')}</th>
            <th>${this.t('department')}</th>
            <th>${this.t('position')}</th>
            <th>${this.t('actions')}</th>
          </tr>
        </thead>
        <tbody>
          ${currentEmployees.map((employee) => html`
            <tr>
              <td><input type="checkbox"></td>
              <td>${employee.firstName}</td>
              <td>${employee.lastName}</td>
              <td>${employee.dateOfEmployment}</td>
              <td>${employee.dateOfBirth}</td>
              <td>${employee.phone}</td>
              <td>${employee.email}</td>
              <td>${employee.department}</td>
              <td>${employee.position}</td>
              <td class="actions">
                <button @click="${() => this._editEmployee(employee.id)}" title="${this.t('list.edit')}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                  </svg>
                </button>
                <button @click="${() => this._deleteEmployee(employee.id)}" title="${this.t('list.delete')}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                  </svg>
                </button>
              </td>
            </tr>
          `)}
        </tbody>
      </table>

      <div class="pagination">
        <button class="pagination-button" ?disabled="${this.currentPage <= 1}" @click="${() => this._changePage(this.currentPage - 1)}" title="${this.t('previous')}">
          «
        </button>
        ${Array.from({ length: this.totalPages }, (_, i) => i + 1).map(
          page => html`
            <button 
              ?disabled="${page === this.currentPage}"
              class="${page === this.currentPage ? 'active' : ''}"
              @click="${() => this._changePage(page)}"
            >
              ${page}
            </button>
          `
        )}
        <button class="pagination-button" ?disabled="${this.currentPage >= this.totalPages}" @click="${() => this._changePage(this.currentPage + 1)}" title="${this.t('next')}">
          »
        </button>
      </div>
    `;
  }
}

customElements.define('employee-list', EmployeeList);
