import { fixture, expect, html } from '@open-wc/testing';
import '../components/employee-list.js';
import store from '../store/store.js';

describe('EmployeeList', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<employee-list></employee-list>`);
  });

  it('renders with initial mock data', () => {
    const rows = element.shadowRoot.querySelectorAll('tbody tr');
    expect(rows.length).to.be.greaterThan(0);
  });

  it('displays correct number of items per page', () => {
    const rows = element.shadowRoot.querySelectorAll('tbody tr');
    expect(rows.length).to.be.at.most(element.pageSize);
  });

  it('updates pagination when page changes', async () => {
    const initialPage = element.currentPage;
    element._changePage(2);
    await element.updateComplete;
    expect(element.currentPage).to.equal(2);
  });

  it('shows confirmation modal when delete button is clicked', async () => {
    const deleteButton = element.shadowRoot.querySelector('.actions button:last-child');
    deleteButton.click();
    await element.updateComplete;

    const modal = element.shadowRoot.querySelector('.modal-overlay');
    expect(modal).to.exist;
  });

  it('deletes employee from store and DOM when confirmed', async () => {
    const initialCount = store.getState().employeeData.length;
    const deleteButton = element.shadowRoot.querySelector('.actions button:last-child');
    deleteButton.click();
    await element.updateComplete;

    const confirmButton = element.shadowRoot.querySelector('.proceed-button');
    confirmButton.click();
    
    await new Promise(resolve => setTimeout(resolve, 0));
    await element.updateComplete;

    const finalStoreCount = store.getState().employeeData.length;
    const rows = element.shadowRoot.querySelectorAll('tbody tr');
    expect(finalStoreCount).to.equal(initialCount - 1);
    expect(rows.length).to.equal(finalStoreCount);
});

it('does not delete employee when cancelled', async () => {
    await element.updateComplete;
    const initialCount = store.getState().employeeData.length;

    const deleteButton = element.shadowRoot.querySelector('.actions button:last-child');
    deleteButton.click();
    await element.updateComplete;

    const afterDeleteCount = store.getState().employeeData.length;
    console.log('After delete count:', afterDeleteCount);

    const cancelButton = element.shadowRoot.querySelector('.cancel-button');
    cancelButton.click();
    await element.updateComplete;

    const afterCancelCount = store.getState().employeeData.length;
    console.log('After cancel count:', afterCancelCount);

    const rows = element.shadowRoot.querySelectorAll('tbody tr');
    console.log('Row count in DOM:', rows.length);

    expect(afterDeleteCount).to.equal(initialCount - 1);
    expect(afterCancelCount).to.equal(initialCount);
    expect(rows.length).to.equal(initialCount);
});




  it('navigates to edit page when edit button is clicked', async () => {
    let navigatedPath = '';
    element.addEventListener('location-changed', (e) => {
      navigatedPath = e.detail.path;
    });
    
    const firstEditButton = element.shadowRoot.querySelector('.actions button');
    firstEditButton.click();
    expect(navigatedPath).to.include('/edit/');
  });
}); 