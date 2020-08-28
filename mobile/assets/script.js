const { default: defaultDictinory, us: usDictinory, ru: ruDictinory } = {
  ru: {
    description:
      "«Holidays» - простой путеводитель по праздникам на каждый день 📅<br><br>Приложение напоминит и расскажет о всех праздниках, так что вы никогда не будете в стороне 🎉",
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
    githubLink: "Github",
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

  document.querySelectorAll(".swipeContainer").forEach((element) => {
    element.addEventListener("transitionend", () =>
      element.classList.toggle("swipePageAnimating")
    );
  });

  let x, y;
  let translateX = 0;

  document.querySelector("#swiper").addEventListener("touchstart", (event) => {
    let touch = event.changedTouches[0];
    x = touch.pageX;
    y = touch.pageY;
  });

  document.querySelector("#swiper").addEventListener("touchmove", (event) => {
    let touch = event.changedTouches[0];
    let newX = touch.pageX;
    let newY = touch.pageY;

    if (Math.abs(x - newX) > Math.abs(y - newY) * 2) {
      event.preventDefault();
      let delta = x - touch.pageX;
      translateX -= delta;

      document.querySelectorAll(".swipeContainer").forEach((element) => {
        element.style.transform = `translateX(${translateX}px)`;
      });
    }

    x = newX;
    y = newY;
  });

  const touchEndFunc = () => {
    translateX = closestNum(translateX, [
      0,
      -1 * window.innerWidth * 0.95,
      -2 * window.innerWidth * 0.95,
    ]);

    document.querySelectorAll(".swipeContainer").forEach((element) => {
      element.classList.toggle("swipePageAnimating");
      element.style.transform = `translateX(${translateX}px)`;
    });

    document.querySelectorAll(".screenshotNum").forEach((element, index) => {
      if (
        [
          0,
          -1 * window.innerWidth * 0.95,
          -2 * window.innerWidth * 0.95,
        ].indexOf(translateX) == index
      ) {
        element.style.backgroundColor = "#14aa46";
      } else {
        element.style.backgroundColor = "#8a929e";
      }
    });
  };

  document.querySelector("#swiper").addEventListener("touchend", touchEndFunc);

  document
    .querySelector("#swiper")
    .addEventListener("touchcansel", touchEndFunc);
}

function initMobileLanguageSwitcher() {
  const maxFlagButtonsW = "118px",
    minFlagButtonsW = "63px";

  const setUsLanguage = () => {
    removeAllListeners();
    document.querySelector(".flagButtons").style.width = minFlagButtonsW;
    setLanguage("us");
  };
  const setRuLanguage = () => {
    removeAllListeners();
    document.querySelector(".flagButtons").style.width = minFlagButtonsW;
    setLanguage("ru");
  };
  const showFlagButtons = () => {
    removeAllListeners();
    document.querySelector(".flagButtons").style.width = maxFlagButtonsW;
  };

  const removeAllListeners = () => {
    document
      .querySelector("#ruFlag")
      .removeEventListener("click", setRuLanguage);
    document
      .querySelector("#usFlag")
      .removeEventListener("click", setUsLanguage);
    document
      .querySelector(".flagButtons")
      .removeEventListener("click", showFlagButtons);
  };

  document
    .querySelector(".flagButtons")
    .addEventListener("transitionend", () => {
      let elementW = document.querySelector(".flagButtons").style.width;
      if (elementW == maxFlagButtonsW) {
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

    element.classList.add(
      language == "ru" ? "selectedLanguageFlag" : "unselectedLanguageFlag"
    );

    element.classList.remove(
      language == "ru" ? "unselectedLanguageFlag" : "selectedLanguageFlag"
    );
  }

  {
    let element = document.querySelector("#usFlag");

    element.src =
      language == "us"
        ? "assets/flags/usFlagSelect.png"
        : "assets/flags/usFlag.png";

    element.classList.add(
      language == "us" ? "selectedLanguageFlag" : "unselectedLanguageFlag"
    );

    element.classList.remove(
      language == "us" ? "unselectedLanguageFlag" : "selectedLanguageFlag"
    );
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

function scrollToTargetAdjusted(selector, offset = 0) {
  var element = document.querySelector(selector);
  var elementPosition = element.getBoundingClientRect().top + window.scrollY;
  var offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}

const onLoadFunc = () => {
  initMobileSwiper();
  initMobileLanguageSwitcher();

  document
    .querySelector("#goToDownloadButton")
    .addEventListener("click", () =>
      scrollToTargetAdjusted("#downloadTitle", 40)
    );

  window.addEventListener("scroll", () => {
    if (window.scrollY >= 150) {
      if (
        document.querySelector("#goToDownloadButton").style.transform !=
        "translateX(200%)"
      )
        document.querySelector("#goToDownloadButton").style.transform =
          "translateX(200%)";
    } else {
      if (
        document.querySelector("#goToDownloadButton").style.transform != "none"
      )
        document.querySelector("#goToDownloadButton").style.transform = "none";
    }
  });

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
