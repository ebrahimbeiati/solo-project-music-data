export const UI = {
Section: (heading, content) => {
    const section = document.createElement('section');
    
    if (heading) {
      const h2 = document.createElement('h2');
      h2.textContent = heading;
      section.appendChild(h2);
    }
    
    if (typeof content === 'string') {
      const p = document.createElement('p');
      p.textContent = content;
      section.appendChild(p);
    } else if (content) {
      section.appendChild(content);
    }
    
    return section;
  },

  /**
   * Create an unordered list
   */
  List: (items) => {
    const ul = document.createElement('ul');
    items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      ul.appendChild(li);
    });
    return ul;
  },

  /**
   * Create a select option element
   */
  Option: (value, label) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    return option;
  }
};