window.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabheader__item');
    const tabsContent = document.querySelectorAll('.tabcontent');
    const tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = 'none';
        });
    
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    })

    const deadline = '2023-12-24';

    function getTimeRemaining(endtime) {
        const tmp = Date.parse(endtime) - Date.parse(new Date());
        const days = Math.floor(tmp / (1000 * 60 * 60 * 24));
        const hours = Math.floor((tmp / (1000 * 60 * 60) % 24));
        const minutes = Math.floor((tmp / 1000 / 60) % 60);
        const seconds = Math.floor((tmp / 1000) % 60);

        return {
            'total': tmp,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function getZero(num) {
        if (num >=0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function getClock(selector, endtime) {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');

        const timeInterval = setInterval(updateClock, 1000);

        updateClock()

        function updateClock() {
            const tmp = getTimeRemaining(endtime);

            days.innerHTML = getZero(tmp.days);
            hours.innerHTML = getZero(tmp.hours);
            minutes.innerHTML = getZero(tmp.minutes);
            seconds.innerHTML = getZero(tmp.seconds);

            if (tmp.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    getClock('.timer', deadline);

    // create modal window

    const triggerModalWindow = document.querySelectorAll('[data-modal]');
    const closeModalWindowBtn = document.querySelector('[data-close]');
    const modalWindow = document.querySelector('.modal');

    function openModalWindow() {
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }

    function closeModalWindow() {
        modalWindow.classList.add('hide');
        modalWindow.classList.remove('show');
        document.body.style.overflow = '';
    }

    triggerModalWindow.forEach(btn => {
        btn.addEventListener('click', openModalWindow)
    })

    closeModalWindowBtn.addEventListener('click', closeModalWindow)

    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow) {
            closeModalWindow();
        }
    })

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
            closeModalWindow();
        }
    })

    // const modalTimerId = setTimeout(openModalWindow, 5000);

    class MenuCard {
        constructor(
            src, alt, title, descr, price, parentSelector, ...classes
        ) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.transfer = 37.5;
            this.parent = document.querySelector(parentSelector);
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.elem = 'menu_item';
                element.classList.add(this.elem);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">
                    ${this.descr}
                </div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total">
                        <span>${this.price}</span> грн/день
                    </div>
                </div>
            `

            this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. 
        Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и 
        высоким качеством!`,
        "9",
        ".menu .container",
        'menu__item'
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню "Премиум"',
        `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное 
        исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в 
        ресторан!`,
        "12",
        ".menu .container",
        'menu__item'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов 
        животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное 
        количество белков за счет тофу и импортных вегетарианских стейков. `,
        "10",
        ".menu .container",
        'menu__item'
    ).render();

})