import { dictionary } from './dictionary.js';

const handleKeyboardEvents = (e) => {
    
    if(e.code === 'KeyL' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
    
        const languages = document.querySelectorAll('[data-lang]');
        const langArray = Array.prototype.slice.call(languages);
        const notActiveLang = langArray.filter(item => !item.classList.contains('lang_active'))[0];
        const notActiveLangCode = notActiveLang.dataset.lang;

        document.querySelector('.lang_active').classList.remove('lang_active');
        notActiveLang.classList.add('lang_active');
        localStorage.setItem('current-lang', notActiveLangCode);

        const textNodes = document.querySelectorAll('[data-key]');

        textNodes.forEach(item => {
            const wordKey = item.dataset.key;
            if(item.localName === 'input') {
                item.setAttribute('placeholder', `${dictionary[notActiveLangCode][wordKey]}`);
            } 
            item.innerHTML = dictionary[notActiveLangCode][wordKey];
        });
    }

    if(e.code === 'KeyQ' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        window.location.pathname = '/users/logout';
    }

    if(e.code === 'KeyD' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        window.location.pathname = '/dashboard';
    }

};

const initKeyBoardEvents = () => {
    document.addEventListener('keydown', (e) => handleKeyboardEvents(e));
};

initKeyBoardEvents();
