import { LitElement, html, css } from 'https://cdn.skypack.dev/lit';
import { LocalizeMixin } from '../mixins/localization-mixin.js';
import { i18n } from '../services/i18n-service.js';

class NavigationMenu extends LocalizeMixin(LitElement) {
  static styles = css`
    :host {
      display: block;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      // background-color: #ff9800;
      background-color: white;
      color: white;
      height: 10px;
    }
    header .logo {
      display: flex;
      align-items: center;
    }
    header .logo img {
      height: 30px;
      margin-right: 10px;
      object-fit: contain;
    }
    .logo span {
      font-size: 20px;
      font-weight: bold;
      color: #000;
    }
    header select {
      background-color: transparent;
      color: white;
      border: none;
      padding: 5px;
      font-size: 14px;
    }
    button {
      background-color: white;
      color: #ff5722;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    button:hover {
      background-color: #f57c00;
    }
  `;

  static properties = {
    selectedLanguage: { type: String }
  };

  constructor() {
    super();
    const savedLanguage = localStorage.getItem('preferred-language');
    this.selectedLanguage = savedLanguage || i18n.locale;
    if (savedLanguage) {
      i18n.setLocale(savedLanguage);
    }
    this._handleLanguageChange = this._handleLanguageChange.bind(this);
  }

  _handleLanguageChange() {
    this.selectedLanguage = i18n.locale;
    this.requestUpdate();
  }

  _changeLanguage(event) {
    const newLang = event.target.value;
    this.selectedLanguage = newLang;
    
    i18n.setLocale(newLang);
    localStorage.setItem('preferred-language', newLang);
    
    window.location.reload();
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('language-changed', this._handleLanguageChange);
    window.addEventListener('root-language-changed', this._handleLanguageChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('language-changed', this._handleLanguageChange);
    window.removeEventListener('root-language-changed', this._handleLanguageChange);
  }

  _addEmployee() {
    const event = new CustomEvent('location-changed', {
      detail: { path: '/add' },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }
  _showEmployees() {
    const event = new CustomEvent('location-changed', {
      detail: { path: '/' },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }
  render() {
    return html`
      <header>
        <div class="logo">
        <img src="../assets/images.png" alt="ING Bank Logo">
        <span>ING</span>
        </div>
        <div>
        <button @click="${this._showEmployees}">
            <span class="material-icons"></span>
            ${this.t('navigationEmployee')}
          </button>
          <button @click="${this._addEmployee}">
            <span>+</span>
            ${this.t('navigationAdd')}
          </button>
          <select class="language-select" @change="${this._changeLanguage}">
            <option class="language-option-tr" value="tr" ?selected="${this.selectedLanguage === 'tr'}">🇹🇷</option>
            <option class="language-option-en" value="en" ?selected="${this.selectedLanguage === 'en'}">🇬🇧</option>
          </select>
        </div>
      </header>
    `;
  }
}
customElements.define('navigation-menu', NavigationMenu);