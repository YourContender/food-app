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
})