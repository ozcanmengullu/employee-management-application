import { i18n } from '../services/i18n-service.js';

export const LocalizeMixin = (superClass) => class extends superClass {
  t(key) {
    return i18n.t(key);
  }
  
  static get properties() {
    return {
      ...super.properties,
      locale: { type: String }
    };
  }
};