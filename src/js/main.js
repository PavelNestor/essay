"use strict";

const _$ = document.querySelector.bind(document);
const _$$ = document.querySelectorAll.bind(document);

const faqs = _$$('.faq-item');

document.addEventListener('DOMContentLoaded', createSelect, false);

function createSelect() {
  let select = _$$('select'),
    liElement,
    ulElement,
    optionValue,
    iElement,
    optionText,
    selectDropdown,
    elementParentSpan;

  for (var select_i = 0, len = select.length; select_i < len; select_i++) {
    select[select_i].style.display = 'none';
    wrapElement(_$(`#${select[select_i].id}`), document.createElement("div"), select_i);

    for (var i = 0; i < select[select_i].options.length; i++) {
      liElement = document.createElement("li");
      optionValue = select[select_i].options[i].value;
      optionText = document.createTextNode(select[select_i].options[i].text);
      liElement.className = 'select-dropdown__list-item';
      liElement.setAttribute('data-value', optionValue);
      liElement.appendChild(optionText);
      ulElement.appendChild(liElement);

      liElement.addEventListener('click', function () {
        displyUl(this);
      }, false);
    }
  }
  function wrapElement(el, wrapper, i) {
    const firstElName = el.querySelector('option').getAttribute('name');
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);

    var buttonElement = document.createElement("div"),
      spanElement = document.createElement("span"),
      spanText = document.createTextNode(firstElName);
    ulElement = document.createElement("ul");

    wrapper.className = 'select-dropdown select-dropdown--' + i;
    buttonElement.className = 'select-dropdown__button select-dropdown__button--' + i;
    buttonElement.setAttribute('data-value', '');
    spanElement.className = 'select-dropdown select-dropdown--' + i;
    ulElement.className = 'select-dropdown__list select-dropdown__list--' + i;
    ulElement.id = 'select-dropdown__list-' + i;

    wrapper.appendChild(buttonElement);
    spanElement.appendChild(spanText);
    buttonElement.appendChild(spanElement);
    wrapper.appendChild(ulElement);
  }

  function displyUl(element) {
    if (element.tagName == 'DIV') {
      selectDropdown = element.parentNode.getElementsByTagName('ul');
      for (var i = 0, len = selectDropdown.length; i < len; i++) {
        selectDropdown[0].classList.toggle("active");
      }
    } else if (element.tagName == 'LI') {
      var selectId = element.parentNode.parentNode.getElementsByTagName('select')[0];
      selectElement(selectId.id, element.getAttribute('data-value'));
      elementParentSpan = element.parentNode.parentNode.getElementsByTagName('span');
      element.parentNode.classList.toggle("active");
      elementParentSpan[0].textContent = element.textContent;
      elementParentSpan[0].parentNode.setAttribute('data-value', element.getAttribute('data-value'));
    }

  }
  function selectElement(id, valueToSelect) {
    var element = document.getElementById(id);
    element.value = valueToSelect;
    element.setAttribute('selected', 'selected');
  }
  var buttonSelect = document.getElementsByClassName('select-dropdown__button');
  for (var i = 0, len = buttonSelect.length; i < len; i++) {
    buttonSelect[i].addEventListener('click', function () {
      displyUl(this);
    }, false);
  }
}

// OWL carousel
$(document).ready(function () {
  const feddbackSlider = $(".owl-carousel");
  feddbackSlider.owlCarousel({
    stagePadding: 30,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      640: {
        items: 2
      },
      1000: {
        items: 3
      }
    }
  });

  // Custom Button
  $('.feedback__slide-btn_next').click(function (event) {
    event.preventDefault()
    feddbackSlider.trigger('next.owl.carousel');
  });

  $('.feedback__slide-btn_prev').click(function (event) {
    event.preventDefault()
    feddbackSlider.trigger('prev.owl.carousel');
  });

  // Menu toggle
  burgerOpen.addEventListener('click', openMenu);
  burgerClose.addEventListener('click', closeMenu);

});

// faq
const toogleFaqs = item => {
  item.classList.toggle("active");

  const faqContent = item.nextElementSibling;

  faqContent.style.maxHeight
    ? (faqContent.style.maxHeight = null)
    : (faqContent.style.maxHeight = faqContent.scrollHeight + 25 + "px");
}

faqs.forEach(faq => faq.addEventListener("click", () => toogleFaqs(faq)));

// form validation

// form validation
var form = _$("#contact-form");
var email = _$("#contact-email");
var formName = _$("#contact-name");
var errorEmail = _$(".form-email-error");
var errorName = _$(".form-name-error");

email.addEventListener(
  "input",
  function (event) {
    errorEmail.innerHTML = "";
    errorEmail.className = "form-email-error";
  },
  false
);

formName.addEventListener(
  "input",
  function (event) {
    errorName.innerHTML = "";
    errorName.className = "form-name-error";
  },
  false
);

form.addEventListener(
  "submit",
  function (event) {
    var emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var isEmail = email.value.length !== 0 && emailRegExp.test(email.value);
    var isName = formName.value.length === 0;

    if (!isEmail) {
      errorEmail.innerHTML = "error";
      errorEmail.className = "form-email-error form-error_active";
      event.preventDefault();
      return false;
    } else {
      errorEmail.innerHTML = "";
      errorEmail.className = "form-email-error";
    }
    debugger;
    if (isName) {
      errorName.innerHTML = "error";
      errorName.className = "form-name-error form-error_active";
      event.preventDefault();
      return false;
    } else {
      errorName.innerHTML = "";
      errorName.className = "form-name-error";
    }
  },
  false
);


// menu-togler
const burgerOpen = _$('#burger');
const burgerClose = _$('#burger-close');
const menuMobile = _$('#menu-mobile');
const menuMobileLinks = _$$('.menu-mobile__link');

const openMenu = () => {
  menuMobile.classList.add('menu-mobile_visible');
};

const closeMenu = () => {
  menuMobile.classList.remove('menu-mobile_visible');
};

menuMobileLinks.forEach(link => link.addEventListener('click', closeMenu));

(function () {
  const essayDots = _$$('.essay-page__dots');
  const essayMoreText = _$$('.essay-page__more');

  essayDots.forEach((dot, index) => dot.addEventListener('click', () => showMore(index)))

  const showMore = (index) => {
    const essayDot = essayDots[index];
    const essayMore = essayMoreText[index];

    essayDot.classList.toggle('hidden');
    essayMore.classList.toggle('active');
  }
})();

// Topics TAB
(function() {
  const tabcontents = _$$('.tab__content');
  const tablinks = _$$('.tab__links');

  if (tabcontents.length < 1 || tablinks.length < 1) {
    return;
  };

  const tabToggler = index => {
    tabcontents.forEach(tabContent => tabContent.style.display = "none");
    tablinks.forEach(tabLink => tabLink.classList.remove('active'));

    tabcontents[index].style.display = "flex";
    tablinks[index].classList.add('active');
  };

  tablinks.forEach((tabLink, index) => tabLink.addEventListener('click', () => tabToggler(index)));

  tablinks[0].click();

})();

// Upload

$(".upload").upload({
  action: '#', // TODO change to real handler
  label: 'Drop Your File Here or Click to Upload',
  autoUpload: true
});
