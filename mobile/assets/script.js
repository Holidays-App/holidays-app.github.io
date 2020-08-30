const { default: defaultDictinory, us: usDictinory, ru: ruDictinory } = {
  ru: {
    description:
      "«Holidays» - простой путеводитель по праздникам на каждый день 📅<br><br>Приложение напоминит и расскажет о всех праздниках, так что вы никогда не будете в стороне 🎉",
    download: 'Скачать <i class="fas fa-cloud-download-alt"></i>',
    contacts: "Связь: help.holidaysapp@gmail.com",
    screenshots: 'Скриншоты <i class="fas fa-mobile-alt"></i>',
    soon: "Скоро...",
  },
  us: {
    description:
      "«Holidays» - a simple holiday guide for every day 📅<br><br>The application will remind and tell you about all the holidays, so you will never be on the sidelines 🎉",
    download: 'Download <i class="fas fa-cloud-download-alt"></i>',
    contacts: "Contact: help.holidaysapp@gmail.com",
    screenshots: 'Screenshots <i class="fas fa-mobile-alt"></i>',
    soon: "Soon...",
  },
  default: {
    appName: "Holidays",
    github: "Github",
  },
};

function initMobileSwiper() {
  function closestNum(number, data) {
    const closestRight = Math.min(...data.filter((v) => v >= number));
    const closestLeft = Math.max(...data.filter((v) => v <= number));

    if (Math.abs(closestRight - number) > Math.abs(closestLeft - number)) {
      return closestLeft;
    } else {
      return closestRight;
    }
  }

  document.querySelectorAll(".screenshotContainer").forEach((element) => {
    element.addEventListener("transitionend", () =>
      element.classList.toggle("screenshotSwipeAnimating")
    );
  });

  let x, y;
  let translateX = 0;

  document
    .querySelector(".screenshotsSwiper")
    .addEventListener("touchstart", (event) => {
      let touch = event.changedTouches[0];
      x = touch.pageX;
      y = touch.pageY;
    });

  document
    .querySelector(".screenshotsSwiper")
    .addEventListener("touchmove", (event) => {
      let touch = event.changedTouches[0];
      let newX = touch.pageX;
      let newY = touch.pageY;

      if (Math.abs(x - newX) > Math.abs(y - newY) * 2) {
        event.preventDefault();
        let delta = x - touch.pageX;
        translateX -= delta;

        document.querySelectorAll(".screenshotContainer").forEach((element) => {
          element.style.transform = `translateX(${translateX}px)`;
        });
      }

      x = newX;
      y = newY;
    });

  function touchEndFunc() {
    const screenShotsTranslatesX = [
      0,
      -1 * document.querySelector(".screenshotsSwiper").offsetWidth,
      -2 * document.querySelector(".screenshotsSwiper").offsetWidth,
    ];

    translateX = closestNum(translateX, screenShotsTranslatesX);

    document.querySelectorAll(".screenshotContainer").forEach((element) => {
      element.classList.toggle("screenshotSwipeAnimating");
      element.style.transform = `translateX(${translateX}px)`;
    });

    document
      .querySelectorAll(".screenshotNavigationTab")
      .forEach((element, index) => {
        if (screenShotsTranslatesX.indexOf(translateX) == index) {
          element.classList.add("screenshotNavigationSelectedTab");
        } else {
          element.classList.remove("screenshotNavigationSelectedTab");
        }
      });
  }

  document
    .querySelector(".screenshotsSwiper")
    .addEventListener("touchend", touchEndFunc);

  document
    .querySelector(".screenshotsSwiper")
    .addEventListener("touchcansel", touchEndFunc);
}

function initMobileLanguageSwitcher() {
  function setUsLanguage() {
    removeAllListeners();
    document.querySelector(".flagButtons").classList.remove("flagButtonsFull");
    setLanguage("us");
  }
  function setRuLanguage() {
    removeAllListeners();
    document.querySelector(".flagButtons").classList.remove("flagButtonsFull");
    setLanguage("ru");
  }
  function showFlagButtons() {
    removeAllListeners();
    document.querySelector(".flagButtons").classList.add("flagButtonsFull");
  }

  function removeAllListeners() {
    document
      .querySelector("#ruFlag")
      .removeEventListener("click", setRuLanguage);
    document
      .querySelector("#usFlag")
      .removeEventListener("click", setUsLanguage);
    document
      .querySelector(".flagButtons")
      .removeEventListener("click", showFlagButtons);
  }

  document
    .querySelector(".flagButtons")
    .addEventListener("transitionend", () => {
      if (
        document
          .querySelector(".flagButtons")
          .classList.contains("flagButtonsFull")
      ) {
        document
          .querySelector("#ruFlag")
          .addEventListener("click", setRuLanguage);
        document
          .querySelector("#usFlag")
          .addEventListener("click", setUsLanguage);
      } else {
        document
          .querySelector(".flagButtons")
          .addEventListener("click", showFlagButtons);
      }
    });

  document
    .querySelector(".flagButtons")
    .addEventListener("click", showFlagButtons);
}

function initMobileScrollToDownloadButton() {
  function scrollToTargetAdjusted(selector, offset = 0) {
    var element = document.querySelector(selector);
    var elementPosition = element.getBoundingClientRect().top + window.scrollY;
    var offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }

  document
    .querySelector(".scrollToDownloadButton")
    .addEventListener("click", () =>
      scrollToTargetAdjusted(".downloadTitle", 40)
    );

  window.addEventListener("scroll", () => {
    let element = document.querySelector(".scrollToDownloadButton");
    if (window.scrollY >= 150) {
      if (!element.classList.contains("scrollToDownloadButtonHidden"))
        element.classList.add("scrollToDownloadButtonHidden");
    } else {
      if (element.classList.contains("scrollToDownloadButtonHidden"))
        element.classList.remove("scrollToDownloadButtonHidden");
    }
  });
}

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
      for (let index = 0; index < elements.length; index++) {
        elements[index].innerHTML = dictinory[key];
      }
    }
  }

  {
    let element = document.querySelector("#ruFlag");

    element.src =
      language == "ru"
        ? "assets/flags/ruFlagSelect.png"
        : "assets/flags/ruFlag.png";

    if (language == "ru") {
      element.classList.add("selectedLanguageFlag");
    } else {
      element.classList.remove("selectedLanguageFlag");
    }
  }

  {
    let element = document.querySelector("#usFlag");

    element.src =
      language == "us"
        ? "assets/flags/usFlagSelect.png"
        : "assets/flags/usFlag.png";

    if (language == "us") {
      element.classList.add("selectedLanguageFlag");
    } else {
      element.classList.remove("selectedLanguageFlag");
    }
  }

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

const onLoadFunc = () => {
  initMobileSwiper();
  initMobileLanguageSwitcher();
  initMobileScrollToDownloadButton();

  setLanguage(
    (window.navigator.language || navigator.userLanguage) == "ru-RU" ||
      (window.navigator.language || navigator.userLanguage) == "ru"
      ? "ru"
      : "us"
  );
};

if (document.readyState == "loading") {
  window.addEventListener("load", onLoadFunc);
} else {
  onLoadFunc();
}
