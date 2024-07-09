/*==================== toggle icon navbar ====================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
}
/*==================== scroll sections active link ====================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute(`id`)

        // top = la distancia en px entre el inicio del body y el borde de la ventana superior (cuanto hemos scrolleado). 
        // offset = la distancia entre el inicio del body y el inicio de la nueva seccion.
        // height = el tamaño en px de la seccion.

        if (top >= offset && top < offset + height) {
            // top >= offset -> se asegura que hemos llegado a la seccion scrolleando.
            // top < offset + height -> si el top (lo q scrolleamos) es menor al offset (la distancia entre la seccion y el inicio) + la altura (tamaño de la seccion), significa que no llegamos al final de la seccion
            navLinks.forEach(links => {
                links.classList.remove(`active`);
                document.querySelector(`header nav a[href*=` + id + `]`).classList.add(`active`)
            })
        }

    })

    /*==================== sticky navbar ====================*/

    let header = document.querySelector("header")

    header.classList.toggle("sticky", window.scrollY > 50);

    /*==================== remove toggle icon and navbar when click navbar link (scroll) ====================*/
    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");
};

/*==================== color palette pick ====================*/

let imgs = document.querySelectorAll(`.imgSwap`);
let colorLinks = document.querySelectorAll(`header div button`);


function changeColor(colorButtons) {
    imgs.forEach(el => {
        if (el.id == "imgHome") {
            el.src = `./images/home${colorButtons.id}.png`;
        } else if (el.id == "imgAbout") {
            el.src = `./images/about${colorButtons.id}.png`;
        }
    });

    let colorPalette = colorButtons.getAttribute("data-first-color");

    document.documentElement.style.setProperty("--first-color", colorPalette);

    localStorage.setItem('selectedColor', colorButtons.id);
    localStorage.setItem('colorPalette', colorPalette);
}

colorLinks.forEach(colorButtons => {
    colorButtons.onclick = () => {
        changeColor(colorButtons);
    }
});

function applySavedColor() {
    let savedColor = localStorage.getItem('selectedColor');
    let savedColorPalette = localStorage.getItem('colorPalette');

    if (savedColor && savedColorPalette) {
        let savedButton = Array.from(colorLinks).find(button => button.id === savedColor);

        if (savedButton) {
            changeColor(savedButton);
        }
    }
}

document.addEventListener('DOMContentLoaded', applySavedColor);




/*==================== scroll reveal ====================*/

ScrollReveal({
    reset: true,
    distance: "80px",
    duration: 2000,
    delay: 50
})

ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(".home-img, .skills-container, .portfolio-box, .contact form", { origin: "bottom" });
ScrollReveal().reveal(".home-content h1, .about-img", { origin: "left" });
ScrollReveal().reveal(".home-content p, .about-content", { origin: "right" });


/*==================== typed js ====================*/
const typed = new Typed(".multiple-text", {
    strings: ["Marketing Analyst", "Marketing Strategist", "Blockchain Advocate", "Frontend Developer"],
    typeSpeed: 40,
    backSpeed: 10,
    backDelay: 500,
    loop: true
})


/*==================== dark mode ====================*/

let btnDarkClear = document.getElementById("toggle-dark-mode")
let secondBgClearColor = getComputedStyle(document.documentElement).getPropertyValue('--second-bg-clear-color').trim();
let secondBgDarkColor = getComputedStyle(document.documentElement).getPropertyValue('--second-bg-dark-color').trim();
let bgColor = getComputedStyle(document.documentElement).getPropertyValue('--bg-color').trim();
let bgClearColor = getComputedStyle(document.documentElement).getPropertyValue('--bg-clear-color').trim();
let navBarBtn = document.querySelectorAll("navbar-btn");
let navBar = document.querySelector("body header nav");
let header = document.querySelector("header");


btnDarkClear.onclick = () => {
    document.body.classList.toggle("dark-mode");
    let lsCurrentMode = document.body.classList.contains("dark-mode");

    navBarBtn.forEach(el => {
        el.classList.toggle("dark-mode")
    })
    if (lsCurrentMode) {
        document.documentElement.style.setProperty("--second-bg-color", secondBgClearColor)
        btnDarkClear.style.backgroundColor = bgClearColor;
        navBar.style.backgroundColor = bgClearColor;
        header.style.backgroundColor = bgClearColor;
        menuIcon.style.color = bgColor;
    } else {
        document.documentElement.style.setProperty("--second-bg-color", secondBgDarkColor)
        btnDarkClear.style.backgroundColor = bgColor;
        navBar.style.backgroundColor = bgColor;
        header.style.backgroundColor = bgColor;
        menuIcon.style.color = bgClearColor;
    }

    localStorage.setItem("darkMode", lsCurrentMode);
}

document.addEventListener('DOMContentLoaded', () => {
    let lsDarkMode = localStorage.getItem("darkMode");
    if (lsDarkMode === "true") {
        document.body.classList.add("dark-mode");
        document.documentElement.style.setProperty("--second-bg-color", secondBgClearColor)
        btnDarkClear.style.backgroundColor = bgClearColor;
        navBar.style.backgroundColor = bgClearColor;
        header.style.backgroundColor = bgClearColor;
        menuIcon.style.color = bgColor;
        document.getElementById('color-mode').checked = true;
    } else {
        document.body.classList.remove("dark-mode");
        document.documentElement.style.setProperty("--second-bg-color", secondBgDarkColor)
        btnDarkClear.style.backgroundColor = bgColor;
        navBar.style.backgroundColor = bgColor;
        header.style.backgroundColor = bgColor;
        menuIcon.style.color = bgClearColor;
        document.getElementById('color-mode').checked = false;
    }
});


/*==================== active layer for mobile ====================*/
let mediaQuery991 = window.matchMedia("(max-width: 991px)")

function mediaQueryLayer(mquery) {
    if (mquery.matches) {
        let portfolioClickBoxes = document.getElementsByClassName("portfolio-box");
        let portfolioLayers = document.getElementsByClassName("portfolio-layer");

        console.log(portfolioClickBoxes, portfolioLayers)
        if (portfolioClickBoxes.length === portfolioLayers.length) {
            for (let i = 0; i < portfolioClickBoxes.length; i++) {
                portfolioClickBoxes[i].onclick = () => {
                    if (portfolioLayers[i].classList.contains("active")) {
                        portfolioLayers[i].classList.remove("active");
                    } else {
                        portfolioLayers[i].classList.add("active");
                    }

                };
            }
        }
    }
}

mediaQueryLayer(mediaQuery991)

mediaQuery991.addEventListener("change", mediaQueryLayer);


/*==================== functional form ====================*/

let form = document.querySelector("form");
let fullName = document.getElementById("name");
let phone = document.getElementById("phone");
let email = document.getElementById("email");
let subject = document.getElementById("subject");
let mess = document.getElementById("message");
let text = document.getElementById("text");

function sendEmail() {
    let bodyMessage = `Full Name: ${fullName.value}<br>Phone Number: ${phone.value}<br>Email:${email.value}<br>Message:${mess.value}`;
    Email.send({
        SecureToken : "03f82d1f-511b-4f12-b0a2-779cd06d32ab",
        To: 'lautaroflorindo@gmail.com',
        From: "lautaroflorindo@gmail.com",
        Subject: subject.value,
        Body: bodyMessage,
    }).then(
        message => {
            if (message == "OK") {
                Swal.fire({
                    title: "Excellent!",
                    text: "You will hear from me soon!",
                    icon: "success"
                });
            }
        }
    );

}

function checkInputs() {
    let items = document.querySelectorAll(".item-contact");

    for (let item of items) {
        if (item.value == "") {
            item.classList.add("error");
            item.parentElement.classList.add("error")
        }

        if(items[1].value != ""){
            checkEmail()
        }

        items[1].addEventListener("keyup", () => {
            checkEmail()
        })

        item.addEventListener("keyup", () => {
            if (item.value != "") {
                item.classList.remove("error");
                item.parentElement.classList.remove("error")
            }else{
                item.classList.add("error");
                item.parentElement.classList.add("error")
            }
        })
    }
}

function checkEmail(){
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;

    const errorTxtEmail = document.querySelector(".error-txt-contact.email")

    if(!email.value.match(emailRegex)){
        email.classList.add("error");
        email.parentElement.classList.add("error");

        if(email.value != ""){
            errorTxtEmail.innerText = "Enter a valid email address."
        }else{
            errorTxtEmail.innerText = "Email Address can't be blank."
        }
    }else{
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();
    
    if(!fullName.classList.contains("error") && !email.classList.contains("error") && !phone.classList.contains("error") && !subject.classList.contains("error") && !mess.classList.contains("error")){
        sendEmail();

        form.reset();
        return false;
    }
})
