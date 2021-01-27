import LanguageSwitcher from './LanguageSwitcher.js';
class Footer {

    renderFooter() {
        const footer = document.createElement('footer');
        footer.classList.add('app_footer');

        const languageSwitcher = new LanguageSwitcher().renderLanguageSwitcher();
        footer.appendChild(languageSwitcher);

        return footer;
    }

}

export default Footer;