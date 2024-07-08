function createAndAppendElement(tag, parent, attributes = {}, classes = [], eventListeners = []) {
  const element = document.createElement(tag);

  for (const key in attributes) {
    if (attributes.hasOwnProperty(key)) {
      if (key in element) {
        element[key] = attributes[key];
      } else {
        element.setAttribute(key, attributes[key]);
      }
    }
  }

  if (classes.length > 0) {
    element.classList.add(...classes);
  }

  eventListeners.forEach(({ event, handler }) => {
    element.addEventListener(event, handler);
  });

  parent.appendChild(element);
  return element;
}