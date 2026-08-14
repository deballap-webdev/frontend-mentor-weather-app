import { filterHourlyData } from "./dataFunctions.js";

export const buildIcon = (iconName, extension, width, height) => {
  const img = document.createElement("img");
  img.alt = iconName + " icon";
  img.title = iconName + " icon";
  img.src = `images/icon-${iconName}.${extension}`;
  if (width) img.width = width;
  if (height) img.height = height;
  return img;
};

export const createCard = (cardClass, childrenArray) => {
  const cardContainer = createElem([cardClass]);
  childrenArray.forEach((child) => {
    cardContainer.append(child);
  });
  return cardContainer;
};

export const createElem = (classListArray, textContent) => {
  const div = document.createElement("div");
  if (classListArray.length) {
    classListArray.forEach((className) => {
      div.classList.add(className);
    });
  }
  if (textContent) {
    div.textContent = textContent;
  }
  return div;
};

export const clearElem = (elem) => {
  while (elem.lastElementChild) {
    elem.lastElementChild.remove();
  }
};

export const hide = (elem) => {
  elem.classList.add("hidden");
  elem.classList.remove("flex");
};

export const show = (elem) => {
  elem.classList.add("flex");
  elem.classList.remove("hidden");
};
