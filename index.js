const URL_CSS_INFO = `./data.json`;
const CSS_RESET = "cssResets";
const CSS_FRAMEWORKS = "cssFrameworks";

const init = function () {
  const stylesheet = document.getElementById("stylesheet");
  const selectCss = document.getElementById("select-css");
  const selectCssResets = document.getElementById("select-css-resets");
  const selectCssFrameworks = document.getElementById("select-css-frameworks");
  const customCssForm = document.getElementById("custom-css-form");

  const getDataPromise = () => {
    return fetch(URL_CSS_INFO).then((res) => {
      if (!res.ok) {
        throw new Error(`fetch fail about css json data`);
      }
      return res.json();
    });
  };

  const populateSelect = async (list, target) => {
    try {
      const data = await getDataPromise();
      if (!data || !data[list]) return;
      data[list].forEach((item) => {
        const option = document.createElement("option");
        option.textContent = item.name;
        option.value = item.link;
        target.appendChild(option);
      });
    } catch (err) {  
      console.error(`fetch fail about ${err}`);
    }
  };
  

  populateSelect(CSS_RESET, selectCssResets);
  populateSelect(CSS_FRAMEWORKS, selectCssFrameworks);

  const changeCss = (link) => stylesheet.setAttribute("href", link);
  selectCss.addEventListener("change", (e) => changeCss(e.target.value));
  customCssForm.addEventListener("submit", (e) => {
    e.preventDefault();
    changeCss(e.target[0].value);
  });
};

document.addEventListener("DOMContentLoaded", init);
