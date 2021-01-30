
import {dictionary} from './dictionary.js';
import {statesList} from './inputListsData.js';

class EditProfilePage {
    constructor(parenElement, usersName, usersEmail) {
        this.currentLanguage = localStorage.getItem('current-lang') || 'en';
        this.parentElement = parenElement;
        this.usersName = usersName;
        this.usersEmail = usersEmail;
    }

    renderProgressBar(percent) {
        if(this.progressBar) {
            this.progressBar.remove();
        }

        this.progressBar = document.createElement('div');
        this.progressBar.classList.add('bar-wrapper');

        const progressPart = document.createElement('div');
        progressPart.classList.add('bar-progress');

        progressPart.style.width = percent + '%';

        const restPart = document.createElement('div');
        restPart.classList.add('bar-rest');

        this.progressBar.appendChild(progressPart);
        this.progressBar.appendChild(restPart);

        document.querySelector('.edit-page_header').appendChild(this.progressBar);
    }

    countCompletePercentage() {
        const questionsToAnswer = document.querySelectorAll('[data-edit="true"]');
        const questionsAmount = questionsToAnswer.length;

        const questionsToAnswerArray = Array.prototype.slice.call(questionsToAnswer);

        const completedQuestions = questionsToAnswerArray.filter(item => {
            return item.value !== '';
        });

        const profileCompletedPercent = parseInt((completedQuestions.length * 100) / questionsAmount);

        document.querySelector('.profile-percent').textContent = profileCompletedPercent + '%';
        this.renderProgressBar(profileCompletedPercent);
    }

    saveInfoToLocalStorage() {
        const nameValue = document.querySelector('#edit-name').value;
        const surnameValue = document.querySelector('#edit-surname').value;
        const mailValue = document.querySelector('[name="email"]').value;
        const phoneValue = document.querySelector('[name="phone"]').value;
        const locationValue = document.querySelector('#edit-location').value;
        const birthValue = document.querySelector('#edit-birth').value;
        const reviewValue = document.querySelector('#edit-review-name').value;
        const requestValue = document.querySelector('[data-key="edit-requests-placeholder"]').value;

        const usersInfo = {
            'name': nameValue,
            'surname': surnameValue,
            'mail': mailValue,
            'phone': phoneValue,
            'location': locationValue,
            'birth': birthValue,
            'reviewName': reviewValue,
            'requests': requestValue,
        };

        window.localStorage.setItem('users-info', JSON.stringify(usersInfo));
    }

    getUserInfoFromLocalStorage() {
        const defaultUsersInfo = {
            'name': '',
            'surname': '',
            'mail': '',
            'phone': '',
            'location': '',
            'birth': '',
            'reviewName': '',
            'requests': '',
        };

        const usersInfo = JSON.parse(window.localStorage.getItem('users-info')) || defaultUsersInfo ;
        return usersInfo;

    }

    renderEditProfilePage() {
        const { name, surname, mail, phone, location, birth, reviewName, requests } = this.getUserInfoFromLocalStorage();

        const editProfilePageWrapper = document.createElement('div');
        editProfilePageWrapper.classList.add('edit-page');

        const statesSelect = document.createElement('select');
        statesSelect.classList.add('edit-select');
        statesSelect.dataset.edit = 'true';
        statesSelect.id = 'edit-location';
        statesList.forEach(state => {
            const stateItem = document.createElement('option');
            stateItem.textContent = state;

            if(state === location) {
                stateItem.setAttribute('selected', 'true');
            }

            statesSelect.appendChild(stateItem);
        });

        const locationDescr = document.createElement('p');
        locationDescr.classList.add('edit-description');
        locationDescr.dataset.key = 'edit-location-descr';
        locationDescr.textContent = dictionary[this.currentLanguage]['edit-location-descr'];

        const specialRequestsLabel = document.createElement('label');
        specialRequestsLabel.setAttribute('for', 'edit-requests');
        specialRequestsLabel.dataset.key = 'edit-requests';
        specialRequestsLabel.textContent = dictionary[this.currentLanguage]['edit-requests'];
        
        const specialRequestsArea = document.createElement('textarea');
        specialRequestsArea.dataset.key = 'edit-requests-placeholder';
        specialRequestsArea.dataset.edit = 'true';
        specialRequestsArea.value = requests;
        specialRequestsArea.setAttribute('value', `${dictionary[this.currentLanguage]['edit-requests-placeholder']}`);

        const specialRequestsDescr = document.createElement('p');
        specialRequestsDescr.classList.add('edit-description');
        specialRequestsDescr.dataset.key = 'edit-requests-descr';
        specialRequestsDescr.textContent = dictionary[this.currentLanguage]['edit-requests-descr'];

        const editSubmitButton = document.createElement('button');
        editSubmitButton.classList.add('edit-submit-button');
        editSubmitButton.dataset.key = 'edit-submit-button';
        editSubmitButton.textContent = dictionary[this.currentLanguage]['edit-submit-button'];

        const editPageContent = document.createElement('div');
        editPageContent.classList.add('edit-page_content');

        editPageContent.innerHTML = `
            <div class="edit-page_header">
                    <div>${this.usersName}</div>
                    <div>
                        <span data-key="edit-percents">${dictionary[this.currentLanguage]['edit-percents']} </span>
                        <span class="profile-percent">0 %</span>
                    </div>
            </div>
        `;

        const editPageForm = document.createElement('form');
        editPageForm.classList.add('edit-page_form');

        editPageForm.innerHTML = `
            <h2 data-key="edit-about">${dictionary[this.currentLanguage]['edit-about']}</h2>
            <label for="edit-name" data-key="edit-name">${dictionary[this.currentLanguage]['edit-name']}</label>
            <input data-edit="true" value="${name}"  id="edit-name" data-key="edit-name" placeholder="${dictionary[this.currentLanguage]['edit-name']}"/>

            <label for="edit-surname" data-key="edit-surname">${dictionary[this.currentLanguage]['edit-surname']}</label>
            <input data-edit="true" value="${surname}" id="edit-surname" data-key="edit-surname" placeholder="${dictionary[this.currentLanguage]['edit-surname']}"/>

            <label for="edit-birth" data-key="edit-birth">${dictionary[this.currentLanguage]['edit-birth']}</label>
            <input data-edit="true" value="${birth}" id="edit-birth" type="date" name="birth">

            <label for="edit-mail" data-key="edit-email">${dictionary[this.currentLanguage]['edit-email']}</label>
            <input data-edit="true" value="${mail}" id="edit-mail" type="email" name="email" value="${this.usersEmail}" >
            
            <label for="edit-review-name" data-key="edit-review-name">${dictionary[this.currentLanguage]['edit-review-name']}</label>
            <input data-edit="true" value="${reviewName}" id="edit-review-name" data-key="edit-review-name" type="text" name="review-name" placeholder="${dictionary[this.currentLanguage]['edit-review-name']}">
            <p data-key="edit-review-descr" class="edit-description">${dictionary[this.currentLanguage]['edit-review-descr']}</p>

            <label for=""edit-phone" data-key="edit-phone">${dictionary[this.currentLanguage]['edit-phone']}</label>
            <input data-edit="true" value="${phone}" id="edit-phone" data-key="edit-phone" type="tel" name="phone" placeholder="${dictionary[this.currentLanguage]['edit-phone']}">

            <label for="edit-location" data-key="edit-location">${dictionary[this.currentLanguage]['edit-location']}</label>
        `;

        editPageContent.appendChild(editPageForm);

        editPageForm.appendChild(statesSelect);
        editPageForm.appendChild(locationDescr);

        editPageForm.appendChild(specialRequestsLabel);
        editPageForm.appendChild(specialRequestsArea);
        editPageForm.appendChild(specialRequestsDescr);

        editPageForm.appendChild(editSubmitButton);

        editPageForm.addEventListener('click', (e) => {
            this.saveInfoToLocalStorage();
            this.countCompletePercentage();
        });
        
        editProfilePageWrapper.appendChild(editPageContent);

        this.parentElement.appendChild(editProfilePageWrapper);

        this.countCompletePercentage();
    }
}

export default EditProfilePage;