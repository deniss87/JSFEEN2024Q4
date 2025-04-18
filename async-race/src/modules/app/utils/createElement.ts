function createElement(
    elementName: string, 
    parentNode: HTMLElement, 
    params: {}) {

    const element = document.createElement(elementName);
    for (const [key, value] of Object.entries(params)) {
        if (key === 'id') element.setAttribute("id", String(value));
        if (key === 'text') element.innerText = String(value);
        if (key === 'className') element.classList.add(String(value));

        if (key === 'event' && Array.isArray(value)) {
        element.addEventListener(value[0], value[1]);
        }
    }

    // this.htmlElements.push([element, parentNode]);
    return [element, parentNode];
}

export default createElement;