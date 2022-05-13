window.addEventListener("DOMContentLoaded", () => {
    const loader = document.querySelector(".loader"),
        spinner = document.querySelector(".lds-spinner");
    setTimeout(() => {
        loader.style.display = "none";
        setTimeout(() => {
            spinner.style.display = "none";
        }, 500);
    }, 2000);

    const tabcontent = document.querySelectorAll(".tabcontent"),
        tabheaderItems = document.querySelector(".tabheader__items"),
        tabheaderItem = document.querySelectorAll(".tabheader__item");
    let i = 0;

    function hideContent() {
        tabcontent.forEach((element) => {
            element.style.display = "none";
        });

        tabheaderItem.forEach((item) => {
            item.classList.remove("tabheader__item_active");
        });
    }

    function showContent(i = 0) {
        tabcontent[i].style.display = "block";
        tabheaderItem[i].classList.add("tabheader__item_active");
    }

    hideContent();
    showContent();

    tabheaderItems.addEventListener("click", (event) => {
        if (event.target && event.target.classList.contains("tabheader__item")) {
            tabheaderItem.forEach((elem, i) => {
                if (event.target == elem) {
                    hideContent();
                    showContent(i);
                }
            });
        }
    });

    // =============== Modal ====================
    const btnFeedback = document.querySelectorAll("[data-modal]"),
        openBtn = document.querySelector(".modal"),
        closeBtn = document.querySelector(".modal__close");
    btnFeedback.forEach((elem) => {
        elem.addEventListener("click", () => {
            openModal();
        });
    });

    closeBtn.addEventListener("click", closeModal);

    openBtn.addEventListener("click", (e) => {
        if (e.target === openBtn) {
            closeModal();
        }
    });

    function openModal() {
        openBtn.style.display = "block";
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        openBtn.style.display = "none";
        document.body.style.overflow = "";
    }

    function showMymodalByScroll() {
        if (
            window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight
        ) {
            openModal();
            window.removeEventListener("scroll", showMymodalByScroll);
        }
    }

    window.addEventListener("scroll", showMymodalByScroll);
    // Data
    const deadLine = "2022-08-11";

    function getTime(endTime) {
        const total = Date.parse(endTime) - Date.parse(new Date()),
            days = Math.floor(total / (1000 * 60 * 60 * 24)),
            seconds = Math.floor((total / 1000) % 60),
            hours = Math.floor((total / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((total / (1000 * 60)) % 60);
        return {
            total: total,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };
    }

    function getZero(num) {
        if(num>=0 && num<10) {
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            timerInterval = setInterval(update,1000);
            update();
            function update() {
                const time = getTime(endTime);
                days.innerHTML = getZero(time.days);
                hours.innerHTML = getZero(time.hours);
                minutes.innerHTML = getZero(time.minutes);
                seconds.innerHTML = getZero(time.seconds);
            }
    }

    setClock('.timer', deadLine);

    // Slider 
    const slides = document.querySelectorAll(".offer__slide"),
        prev = document.querySelector(".offer__slider-prev"),
        next = document.querySelector(".offer__slider-next"),
        current = document.querySelector("#current"),
        offer__inline_wrapper = document.querySelector(".offer__inline-wrapper"),
        sliderWrapper = document.querySelector(".offer__slider-wrapper"),
        width = window.getComputedStyle(sliderWrapper).width;

    offer__inline_wrapper.style.display = 'flex';
    offer__inline_wrapper.style.width = `400%`;
    sliderWrapper.style.overflow = "hidden";
    offer__inline_wrapper.style.transition = '.5s all linear'
    let slideIndex = 0;
    current.innerHTML = '0' + `${slideIndex + 1}`;
    next.addEventListener('click', nextious);
    function nextious() {
        slideIndex++;
        if (slideIndex > 3) {
            slideIndex = 0;
        }
        offer__inline_wrapper.style.transform = `translate(-${
          slideIndex * +width.slice(0, 3)
        }px)`;
        current.innerHTML = "0" + `${slideIndex + 1}`;
        dots.forEach(elem => elem.style.opacity = '.5');
        dots[slideIndex].style.opacity = 1;
    }
    prev.addEventListener("click", previous);
    function previous(){
        slideIndex--;
        if (slideIndex < 0) {
            slideIndex = 3;
        }
        offer__inline_wrapper.style.transform = `translate(-${
          slideIndex * +width.slice(0, 3)
        }px)`;
        current.innerHTML = "0" + `${slideIndex + 1}`;
        dots.forEach((elem) => (elem.style.opacity = ".5"));
        dots[slideIndex].style.opacity = 1;
    }

    // Navigation Slider
    const offerSlider = document.querySelector(".offer__slider");
    offerSlider.style.position = 'relative';
    let indicator = document.createElement('ol'),
        dots = [];
    indicator.style.cssText = `
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        list-style: none;
        display: flex;
        align-items: center;
    `;
    offerSlider.append(indicator);
    for (let i = 0; i < slides.length; i++) {
        const element = document.createElement('li');
        element.setAttribute('data', i);
        element.style.cssText = `
            width: 50px;
            height: 5px;
            background-color: white;
            margin: 0 5px;
            cursor: pointer;
            opacity: .5;
            trabsition: opacity .6s ease;
        `;
        if(i==0) {
            element.style.opacity = 1;
        }
        dots.push(element);
        indicator.append(element);
    }

    dots.forEach((nav,index) => {
        nav.addEventListener('click', ()=> {
            slideIndex = index;
            offer__inline_wrapper.style.transform = `translate(-${
              slideIndex * +width.slice(0, 3)
            }px)`;
            current.innerHTML = "0" + `${slideIndex + 1}`;
            dots.forEach((elem) => (elem.style.opacity = ".5"));
            dots[slideIndex].style.opacity = 1;
        })
    });
    // prev.addEventListener("click", () => {
    //     if (slideIndex <= 1) {
    //         slideIndex = slides.length + 1;
    //     }
    //     slideIndex--;
    //     showSlide(slideIndex);
    // });
    // next.addEventListener("click", () => {
    //     if (slideIndex > slides.length - 1) {
    //         slideIndex = 0;
    //     }
    //     slideIndex++;
    //     showSlide(slideIndex);
    // });
    // showSlide(slideIndex);
    // function showSlide(j) {
    //     slides.forEach((item) => (item.style.display = "none"));
    //     slides[j - 1].style.display = "block";
    //     current.innerHTML = `0${j}`;
    // }
});
