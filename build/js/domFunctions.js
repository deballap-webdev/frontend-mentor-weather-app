export const dropDownDisplay = (event) => {
  if (event.type === "click") {
    event.currentTarget
      .querySelector('img[data-dropDown="true"]')
      .classList.toggle("rotate-180");
    event.currentTarget.nextElementSibling.classList.toggle("hidden");
    event.currentTarget.nextElementSibling.classList.toggle("flex");
  } else {
    event.currentTarget
      .querySelector('img[data-dropDown="true"]')
      .classList.remove("rotate-180");
    event.currentTarget.nextElementSibling.classList.add("hidden");
    event.currentTarget.nextElementSibling.classList.remove("flex");
  }
};
