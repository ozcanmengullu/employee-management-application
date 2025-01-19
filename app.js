import { LitElement, html } from 'https://cdn.skypack.dev/lit';
import { Router } from 'https://cdn.jsdelivr.net/npm/@lit-labs/router@0.1.3/+esm';
import { i18n } from './services/i18n-service.js';
import './components/navigation-menu.js';
import './mixins/localization-mixin.js';

import './components/employee-list.js';
import './components/employee-form.js';

class AppRoot extends LitElement {
  constructor() {
    super();
    this.router = new Router(this, [
      {
        path: '/',
        render: () => html`<employee-list></employee-list>`
      },
      {
        path: '/add',
        render: () => html`<employee-form></employee-form>`
      },
      {
        path: '/edit/:id',
        render: ({id}) => html`<employee-form .employeeId=${id}></employee-form>`
      }
    ]);
  }

  render() {
    return html`
      <main>
        ${this.router.outlet()}
      </main>
    `;
  }
}

customElements.define('app-root', AppRoot);

// Event listener'ı
const appRoot = document.querySelector('app-root');
window.addEventListener('root-language-changed', () => {
  appRoot.requestUpdate();
});
window.addEventListener('location-changed', (e) => {
  window.history.pushState({}, '', e.detail.path);
  window.dispatchEvent(new PopStateEvent('popstate'));
});