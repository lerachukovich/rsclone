
class Header {

    renderHeader() {
        const appHeader = document.createElement('header');
        appHeader.classList.add('app_header');
        appHeader.innerHTML=`
        <div class="header_left-part" >
            <div class="header_logo"></div>
            <div class="header_name">OpenTable</div>
        </div>
        `;

        const headerRightPart = document.createElement('div');
        headerRightPart.classList.add('header_right-part');

        appHeader.appendChild(headerRightPart);
        return appHeader;
    }

}

export default Header;