function forms() {
  const message = {
    //набор сообщений
    successua: "Дякуємо! Чекайте на дзвінок менеджера!",
    successru: "Спасибо! Ожидайте звонка менеджера!",
    failureua: "Спробуйте відправити повідомлення через декілька хвилин",
    failureru: "Попробуйте отправить сообщение через несколько минут",
  };

  const lang = document.location.pathname.substring(0, 4);

  const toastLive = document.querySelector("#liveToast");
  if (toastLive != null) {
    const toast = new bootstrap.Toast(toastLive);
    setTimeout(() => {
      toast.show();
    }, 7000);
  }

  document.addEventListener("click", ({ target }) => {
    if (!target.classList.contains("btn")) {
      clearPopup();
    }
  });

  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", bindPostData);

    async function bindPostData(e) {
      e.preventDefault(); //убираем действия по умолчанию
      clearPopup();

      let prefix = "";
      const TOKEN = process.env.TOKEN;
      const CHAT_ID = process.env.CHAT_ID;
      const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
      const data = new FormData(form); //получаем данные

      if (data.has("userNameModal")) {
        //Устанавливаем префикс имени поля для модального окна
        prefix = "Modal";
      }

      const name = data.get("userName" + prefix);
      const telephone = data.get("telephone" + prefix);
      const direction = data.get("direction" + prefix);
      const city = data.get("city" + prefix);

      if (name.trim().length < 2) {
        const textContent =
          lang === "/ru/" ? "Слишком короткое имя" : "Занадто коротке ім'я";
        showPopup("userName" + prefix, textContent);
        return;
      }

      if (telephone.length < 18) {
        const textContent =
          lang === "/ru/"
            ? "Слишком короткий номер телефона"
            : "Занадто короткий номер телефону";
        showPopup("telephone" + prefix, textContent);
        return;
      }

      if (!direction) {
        const textContent =
          lang === "/ru/"
            ? "Выберите один из пунктов списка"
            : "Виберіть один з пунктів списку";
        showPopup("direction" + prefix, textContent);
        return;
      }

      if (city.trim().length < 2) {
        const textContent =
          lang === "/ru/"
            ? "Слишком короткое название города"
            : "Занадто коротка назва міста";
        showPopup("city" + prefix, textContent);
        return;
      }

      if (localStorage.getItem("dispatchTime")) {
        const wait = 1000 * 60 * 15; //время ожидания между отправками
        const diff = new Date().getTime() - localStorage.getItem("dispatchTime");
        if (diff < wait) {
          const minute = Math.ceil((wait - diff) / (1000 * 60));
          const textContent =
            lang === "/ru/"
              ? `Попробуйте отправить следующую заявку через ${minute} минут`
              : `Спробуйте відправити наступну заявку через ${minute} хвилин`;
          showPopup("sendRequest" + prefix, textContent);
          return;
        }
      }

      form.classList.add("sending");

      let telnospaces = telephone.replace(/\s/g, '');

      let siteMessage = `<b>Заявка с сайта bianchiprof.com</b>\n`;
      siteMessage += `<b>Отправитель: </b> ${name}\n`;
      siteMessage += `<b>Телефон: </b> ${telnospaces}\n`;
      siteMessage += `<b>Направление: </b> ${direction}\n`;
      siteMessage += `<b>Город: </b> ${city}`;

      axios.post(URL_API, {
          chat_id: CHAT_ID,
          parse_mode: 'html',
          text: siteMessage
      })
          .then((res) => {
              const messageSuccess = (lang === '/ru/') ? message.successru : message.successua;
              showThanksModal(prefix, messageSuccess);
              localStorage.setItem('dispatchTime', new Date().getTime());
          })
          .catch((err) => {
              const messageFailure = (lang === '/ru/') ? message.failureru : message.failureua;
              showThanksModal(prefix, messageFailure);
          })
          .finally(() => {
              form.classList.remove('sending');
              resetForm();
          })

      //Дублируем сообщения с сайта на почту
      fetch("../sendmail.php", {
        method: "POST",
        body: data,
      });

      //let response = await fetch('sendmail.php', {
      //       method: 'POST',
      //       body: data
      //   });

      // if (response.ok) {
      //     form.classList.remove('sending');
      //     showThanksModal(prefix, message.success);
      //     localStorage.setItem('dispatchTime', new Date().getTime());
      //     resetForm();

      // } else {
      //     form.classList.remove('sending');
      //     showThanksModal(prefix, message.failure);
      // };
    }
  });

  function clearPopup() {
    const popups = document.querySelectorAll(".popup");
    popups.forEach((element) => {
      element.remove();
    });
  }

  function showPopup(trigger, text) {
    const popup = document.createElement("div");
    const element = document.getElementsByName(trigger);
    popup.className = "popup";
    popup.innerHTML = `<span class="popuptext show">${text}</span>`;

    element[0].before(popup);
  }

  function closeWindow(selector) {
    const modalWindow = document.querySelector(selector);
    const backdrop = document.querySelector(".modal-backdrop");
    const body = document.querySelector("body");
    modalWindow.classList.add("hide");
    modalWindow.classList.remove("show");
    backdrop.className = "hide";
    body.removeAttribute("style");
  }

  function showThanksModal(prefix, message) {
    //отображаем новое модальное окно пользователю после ввода данных
    if (prefix === "Modal") {
      closeWindow("#Modal");
    }
    document.querySelector("body").className = "modal-open";
    document.querySelector("body").style.setProperty("overflow", "hidden");
    document.querySelector("body").style.setProperty("padding-right", "17px");

    const fade = document.createElement("div");

    fade.innerHTML = `
            <div class="modal-backdrop fade show">
            `;
    document.querySelector("body").append(fade);
    const thanksModal = document.createElement("div"); //формируем html нового окна

    thanksModal.innerHTML = `
            <div class="modal fade show" id="thanksModal" tabindex="-1" aria-labelledby="exampleThanksModalLabel" aria-modal="true" role="dialog" style="display: block">
                <div class="modal-dialog">
                    <div class="modal-content text-center green">
                        <form action="">
                            <h4 class="modal-title" id="exampleThanksModalLabel">${message}</h4>
                        </form>
                    </div>
                </div>
            </div>
        `;
    document.querySelector("body").append(thanksModal);
    setTimeout(() => {
      closeWindow("#thanksModal"); //закрываем модальное окно
      thanksModal.remove();
      resetForm();
    }, 3000);
  }

  function resetForm() {
    const resetForms = document.querySelectorAll("form");
    resetForms.forEach((e) => {
      e.reset();
    });
  }

  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);
    const minLength =
      selector === "#validationTelephone" || selector === "#validationTelephoneModal"
        ? 13
        : 2;
    input.addEventListener("input", () => {
      if (input.value.trim().length < minLength) {
        input.style.border = "1px solid red";
      } else {
        input.style.border = null;
      }
    });
  }

  try {
    getDynamicInformation("#validationName");
    getDynamicInformation("#validationTelephone");
  } catch {
    ///////
  }

  getDynamicInformation("#validationNameModal");
  getDynamicInformation("#validationTelephoneModal");
}

export default forms;
