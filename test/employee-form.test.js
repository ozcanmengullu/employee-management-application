import { html, fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';
import '../components/employee-form.js';

describe('EmployeeForm', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<employee-form></employee-form>`);
  });

  it('should render the form correctly', () => {
    const form = element.shadowRoot.querySelector('form');
    expect(form).to.exist;

    const inputs = form.querySelectorAll('input');
    const selects = form.querySelectorAll('select');
    const button = form.querySelector('button');

    expect(inputs.length).to.equal(6);
    expect(selects.length).to.equal(2);
    expect(button).to.exist;
  });

  it('should update employee object when input values change', async () => {
    const firstNameInput = element.shadowRoot.querySelector('input[type="text"]');
    const newFirstName = 'John';
  
    await element.updateComplete;
  
    if (firstNameInput) {
      firstNameInput.value = newFirstName;
      firstNameInput.dispatchEvent(new Event('input'));
    }
  
    expect(element.employee.firstName).to.equal(newFirstName);
  });
  

  it('should call _handleSubmit on button click', async () => {
    const button = element.shadowRoot.querySelector('.submit-button');
    
    element.employee = {
      firstName: 'Jane',
      lastName: 'Doe',
      dateOfEmployment: '2022-01-01',
      dateOfBirth: '1990-01-01',
      phone: '123456789',
      email: 'jane.doe@example.com',
      department: 'Tech',
      position: 'Medior'
    };
  
    const submitSpy = sinon.spy(element, '_handleSubmit');
    
    button.click();
  
    await element.updateComplete;
  
    expect(submitSpy.calledOnce).to.be.true;
    
    submitSpy.restore();
  });
  
  

  it('should show validation errors if required fields are empty', async () => {
    const form = element.shadowRoot.querySelector('form');
    const button = element.shadowRoot.querySelector('button');

    element.employee = {
      firstName: '',
      lastName: '',
      dateOfEmployment: '',
      dateOfBirth: '',
      phone: '',
      email: '',
      department: 'Analytics',
      position: 'Senior'
    };

    button.click();
    await element.updateComplete;

    expect(form.reportValidity()).to.be.false;
  });

  it('should dispatch location-changed event after successful submission', async () => {
    const button = element.shadowRoot.querySelector('button');
    const eventSpy = sinon.spy();
  
    element.addEventListener('location-changed', eventSpy);
  
    element.employee = {
      firstName: 'Jane',
      lastName: 'Doe',
      dateOfEmployment: '2022-01-01',
      dateOfBirth: '1990-01-01',
      phone: '123456789',
      email: 'jane.doe@example.com',
      department: 'Tech',
      position: 'Medior'
    };
  
    await element.updateComplete;
  
    const inputs = element.shadowRoot.querySelectorAll('input');
    const selects = element.shadowRoot.querySelectorAll('select');
  
    inputs[0].value = 'Jane';
    inputs[1].value = 'Doe';
    inputs[2].value = '2022-01-01';
    inputs[3].value = '1990-01-01';
    inputs[4].value = '123456789';
    inputs[5].value = 'jane.doe@example.com';
  
    selects[0].value = 'Tech';
    selects[1].value = 'Medior';
  
    inputs.forEach(input => input.dispatchEvent(new Event('input')));
    selects.forEach(select => select.dispatchEvent(new Event('change')));
  
    button.click();
  
    await element.updateComplete;
  
    expect(eventSpy.calledOnce).to.be.true;
  
    const eventDetail = eventSpy.getCall(0).args[0].detail;
    expect(eventDetail.path).to.equal('/');
  });
  
  
});


