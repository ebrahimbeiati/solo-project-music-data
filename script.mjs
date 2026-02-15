// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.


import { getUserIDs, getListenEvents } from './data.mjs';
import { UI } from './components/ui-components.mjs';
import { Display } from './components/display.mjs';

// Get page elements
const userSelect = document.getElementById('user-select');
const answersContainer = document.getElementById('answer');

// Populate the user dropdown
function setupDropdown() {
  getUserIDs().forEach(userID => {
    userSelect.appendChild(UI.Option(userID, userID));
  });
}

// Handle when user selects a user
function handleUserChange(event) {
  const userID = event.target.value;
  
  if (!userID) {
    answersContainer.innerHTML = '';
    return;
  }
  
  // Get data and display it
  const listens = getListenEvents(userID);
  const sections = Display.buildAllSections(listens);
  Display.renderToPage(answersContainer, sections);
}

// Initialize the app


function init() {
  setupDropdown();
  userSelect.addEventListener('change', handleUserChange);
}

// Start the app
init();