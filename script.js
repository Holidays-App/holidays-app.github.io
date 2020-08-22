const { default: defaultDictinory, us: usDictinory, ru: ruDictinory } = {
  ru: {
    description:
      "«Holidays» — простой путеводитель по праздникам на каждый день 📅<br><br>Приложение напоминит и расскажет о всех праздниках, так что вы никогда не будете в стороне 🎉",
    downloadTitle: 'Скачать <i class="fas fa-cloud-download-alt"></i>',
    contactsText: "Связь: help.holidaysapp@gmail.com",
    screenshotsTitle: 'Скриншоты <i class="fas fa-mobile-alt"></i>',
    soonText: "Скоро...",
  },
  us: {
    description:
      "«Holidays» - a simple holiday guide for every day 📅<br><br>The application will remind and tell you about all the holidays, so you will never be on the sidelines 🎉",
    downloadTitle: 'Download <i class="fas fa-cloud-download-alt"></i>',
    contactsText: "Contact: help.holidaysapp@gmail.com",
    screenshotsTitle: 'Screenshots <i class="fas fa-mobile-alt"></i>',
    soonText: "Soon...",
  },
  default: {
    appName: "Holidays",
    githubLink: "Github: github.com/Holidays-App/Holidays-App",
  },
};

function setLanguage(language) {
  let dictinory = {};
  if (language == "ru") {
    Object.assign(dictinory, ruDictinory, defaultDictinory);
  } else {
    Object.assign(dictinory, usDictinory, defaultDictinory);
  }

  for (let key in dictinory) {
    if (dictinory.hasOwnProperty(key)) {
      let elements = document.getElementsByClassName(key);
      console.log(elements, key);
      for (let index = 0; index < elements.length; index++) {
        elements[index].innerHTML = dictinory[key];
      }
    }
  }

  document.querySelector("#ruFlag").src =
    language == "ru"
      ? "assets/flags/ruFlagSelect.png"
      : "assets/flags/ruFlag.png";

  document.querySelector("#usFlag").src =
    language == "ru"
      ? "assets/flags/usFlag.png"
      : "assets/flags/usFlagSelect.png";

  document.querySelector(
    "#upcomingHolidaysScreenScreenshot"
  ).src = `assets/screenshots/${language}/upcomingHolidaysScreenScreenshot.png`;

  document.querySelector(
    "#categoriesScreenScreenshot"
  ).src = `assets/screenshots/${language}/categoriesScreenScreenshot.png`;

  document.querySelector(
    "#settingsScreenScreenshot"
  ).src = `assets/screenshots/${language}/settingsScreenScreenshot.png`;
}

function scrollToTargetAdjusted(selector, offset = 0) {
  var element = document.querySelector(selector);
  var elementPosition = element.getBoundingClientRect().top;
  var offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}

const onLoadFunc = () => {
  setLanguage(
    (window.navigator.language || navigator.userLanguage) == "ru-RU" ||
      (window.navigator.language || navigator.userLanguage) == "ru"
      ? "ru"
      : "us"
  );
  document
    .querySelector("#ruFlag")
    .addEventListener("click", () => setLanguage("ru"));
  document
    .querySelector("#usFlag")
    .addEventListener("click", () => setLanguage("us"));
  document
    .querySelector("#goToDownloadButton")
    .addEventListener("click", () =>
      scrollToTargetAdjusted("#downloadTitle", 40)
    );
};

if (document.readyState == "loading") {
  window.addEventListener("load", onLoadFunc);
} else {
  onLoadFunc();
}
