import { fixture, expect, html } from '@open-wc/testing';
import '../components/navigation-menu.js';

describe('NavigationMenu', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<navigation-menu></navigation-menu>`);
  });

  describe('Language selection', () => {
    it('should have Turkish selected by default', async () => {
        await element.updateComplete;
        const select = element.shadowRoot.querySelector('.language-select');
        expect(select.value).to.equal('tr');
      });
  
      it('changes language when selecting English', async () => {
        await element.updateComplete;
        const select = element.shadowRoot.querySelector('.language-select');
        
        select.value = 'en';
        select.dispatchEvent(new Event('change'));
        
        await element.updateComplete;
        expect(element.selectedLanguage).to.equal('en');
      });
  });
}); 