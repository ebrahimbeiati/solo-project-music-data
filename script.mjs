// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getListenEvents, getUserIDs } from "./data.mjs";
import { computeAnswers } from "./questions.mjs";


// DOM elements
const selectUser = document.getElementById("select-user");
const answerContainer = document.getElementById("answer-container");

//Dropdown to select user
getUserIDs().forEach(id => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = `User ${id}`;
    selectUser.appendChild(option);
});

// Rendering all answers in the dropdown and show in the <select id="answer"> element
function displayResults(results) {
  answerContainer.innerHTML = ""; 
// p = paragraph element to show each answer in a new line
  const add = text => {
    const p = document.createElement("p");
    p.textContent = text;
    answerContainer.appendChild(p);
  };

// check for Question 1: Most listened song by count
  const mostByCount = results.mostListenedSongByCount;
if(mostByCount?.song){
  add(
    `Most listened song: ${mostByCount.song.title} by ${mostByCount.song.artist} (${mostByCount.count} listens)`
  );
}

// check for Question 2: Most listened artist by count
if(results.mostListenedArtistByCount){
    add(`Most listened artist (count): ${results.mostListenedArtistByCount}`);
}

// check for Question 3: Most listened song on Fridays by count
const mostFriday = results.mostListenedSongFridayByCount;
if(mostFriday?.song){
  add(
    `Most listened song on Fridays: ${mostFriday.song.title} by ${mostFriday.song.artist} (${mostFriday.count} listens)`
  );
}

// check for Question 4: Most listened song by time
const mostByTime = results.mostListenedSongByTime;
if(mostByTime?.song){
  add(
    `Most listened song by time: ${mostByTime.song.title} by ${mostByTime.song.artist} (${mostByTime.time} seconds listened)`
  );
}

// check for Question 5: Most listened artist by time
if(results.mostListenedArtistByTime){
  add(`Most listened artist by time: ${results.mostListenedArtistByTime}`);
}

// check for Question 6: Longest song streak
// streak = number of times the same song was listened to in a row
const longestStreak = results.longestSongStreak;
if(longestStreak?.song){
  add(
    `Longest song streak: ${longestStreak.song.title} by ${longestStreak.song.artist} (${longestStreak.count} listens in a row)`
  );
}

// check for Question 7: Songs listened to every day the user listened
if(results.songsListenedEveryDay?.length){
  results.songsListenedEveryDay.forEach(song => {
    add(`Song listened to every day: ${song.title} by ${song.artist}`);
  });
}

// check for Question 8: User's top three genres
if(results.topThreeGenres?.length){
  add(
    `Top ${results.topThreeGenres.length} genres: ${results.topThreeGenres.join(", ")}`
  );
}
}

// Event listener for user selection
selectUser.addEventListener("change",  (e) => {
  const userId = e.target.value;
  if(!userId) {
    answerContainer.innerHTML = "";
    return;
  };

  const listenEvents = getListenEvents(userId);
  if(!listenEvents.length) {
    answerContainer.innerHTML = "<p>This user didn’t listen to any songs.</p>";
    return;
  }
  const results = computeAnswers(listenEvents);
  displayResults(results);
});