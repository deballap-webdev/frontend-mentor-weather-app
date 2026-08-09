export const dropDownDisplay = (event) => {
  event.currentTarget
    .querySelector('img[data-dropDown="true"]')
    .classList.toggle("rotate-180");
  event.currentTarget.nextElementSibling.classList.toggle("hidden");
  event.currentTarget.nextElementSibling.classList.toggle("flex");
};
