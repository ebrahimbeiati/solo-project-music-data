import { getSong } from "./data.mjs";

//Checking if a listen event happened on Friday night between 17:00 - Saturday  4:00
function isFridayNight(date) {
  const day = date.getDay(); //0 = sun, 5= fri, 6 = sat
  const hour = date.getHours();

  if (day === 5 && hour >= 17) return true; // Friday after 17:00
  if (day === 6 && hour < 4) return true; // Saturday before 4:00
  return false;
}

// question 1: How many listen events happened on Friday night between 17:00 - Saturday  4:00?

function mostListenedSongByCount(listenEvents) {
  const songCount = {};

  listenEvents.forEach((e) => {
    songCount[e.song_id] = (songCount[e.song_id] || 0) + 1;
  });

  let mostListenedSong = null;
  let maxCount = 0;

  for (const id in songCount) {
    if (songCount[id] > maxCount) {
      maxCount = songCount[id];
      mostListenedSong = id;
    }
  }
  return mostListenedSong
    ? { song: getSong(mostListenedSong), count: maxCount }
    : null;
}

// question 2 Most listened artist (by count)
function mostListenedArtistByCount(listenEvents) {
  const artistCount = {};

  listenEvents.forEach((e) => {
    const artist = getSong(e.song_id).artist;
    artistCount[artist] = (artistCount[artist] || 0) + 1;
  });

  let mostListenedArtist = null;
  let maxCount = 0;

  for (const artist in artistCount) {
    if (artistCount[artist] > maxCount) {
      maxCount = artistCount[artist];
      mostListenedArtist = artist;
    }
  }

  return mostListenedArtist;
}

// question 3: How many listen events happened on Friday night by count?
function mostListenedSongFridayByCount(listenEvents) {
  const counts = {};

  listenEvents.forEach((e) => {
    const date = new Date(e.timestamp);
    if (isFridayNight(date)) {
      counts[e.song_id] = (counts[e.song_id] || 0) + 1;
    }
  });

  let mostListenedSong = null;
  let maxCount = 0;

  for (const song_id in counts) {
    if (counts[song_id] > maxCount) {
      maxCount = counts[song_id];
      mostListenedSong = song_id;
    }
  }

  return mostListenedSong 
  ? { song: getSong(mostListenedSong), count: maxCount } 
  : null;
}
//for friday night by time
function mostListenedSongFridayByTime(listenEvents) {
  const counts = {};

  listenEvents.forEach((e) => {
    const date = new Date(e.timestamp);
    if(isFridayNight(date)) {
      const duration = getSong(e.song_id).duration_seconds;
      counts[e.song_id] = (counts[e.song_id] || 0) + duration;
    }
  });
  let bestSong = null;
  let maxTime = 0;
  
  for (const song_id in counts) {
    if (counts[song_id] > maxTime) {
      maxTime = counts[song_id];
      bestSong = song_id;
    }
  }
  return bestSong ? {song: getSong(bestSong), time: maxTime} : null;
}

// question 4: most listened song by time

function mostListenedSongByTime(listenEvents) {
  const totalTime = {};

  listenEvents.forEach((e) => {
    const duration = getSong(e.song_id).duration_seconds;
    totalTime[e.song_id] = (totalTime[e.song_id] || 0) + duration;
  });

  let mostListenedSong = null;
  let maxTime = 0;

  for (const song_id in totalTime) {
    if (totalTime[song_id] > maxTime) {
      maxTime = totalTime[song_id];
      mostListenedSong = song_id;
    }
  }
  return mostListenedSong ? {song: getSong(mostListenedSong), time: maxTime} 
   : null;
}

// question 5: most listened artist by time

function mostListenedArtistByTime(listenEvents) {
  const artistTime = {};

  listenEvents.forEach((e) => {
    const song = getSong(e.song_id);
    artistTime[song.artist] =
      (artistTime[song.artist] || 0) + song.duration_seconds;
  });

  let mostListenedArtist = null;
  let maxTime = 0;

  for (const artist in artistTime) {
    if (artistTime[artist] > maxTime) {
      maxTime = artistTime[artist];
      mostListenedArtist = artist;
    }
  }

  return mostListenedArtist;
}
//question 6: Longest streak (same song played consecutively)
function longestSongStreak(listenEvents) {
  let maxStreak = 0;
  let currentStreak = 0;
  let lastSong = null;
  let streakSong = null;

  listenEvents.forEach((e) => {
    if (e.song_id === lastSong) {
      currentStreak++;
    } else {
      currentStreak = 1;
      lastSong = e.song_id;
    }

    if (currentStreak > maxStreak) {
      maxStreak = currentStreak;
      streakSong = e.song_id;
    }
  });

  return streakSong ? { song: getSong(streakSong), count: maxStreak } : null;
}

// question 7: Songs listened to every day the user listened

function songsListenedEveryDay(listenEvents) {
  const days = {};
  const songDays = {};

  listenEvents.forEach((e) => {
    const date = new Date(e.timestamp).toDateString();
    days[date] = true;

    songDays[e.song_id] = songDays[e.song_id] || new Set();
    songDays[e.song_id].add(date);
  });

  const totalDays = Object.keys(days).length;
  
  return Object.keys(songDays)
    .filter((song_id) => songDays[song_id].size === totalDays)
    .map((id) => getSong(id));
}

//  user's top three genres

function topThreeGenres(listenEvents) {
  const genreCount = {};

  listenEvents.forEach((e) => {
    const genre = getSong(e.song_id).genre;
    genreCount[genre] = (genreCount[genre] || 0) + 1;
  });

  return Object.entries(genreCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([genre]) => genre);
}

//// This function takes all individual analysis functions.
//  It takes the user's listening events, runs each calculation (like top song, top artist, etc.), and returns a single object containing all the answers.
//  This keeps the logic modular, while providing a simple interface for the rest of the code to access all results at once.

export function computeAnswers(listenEvents) {
  return {
    mostListenedSongByCount: mostListenedSongByCount(listenEvents),
    mostListenedArtistByCount: mostListenedArtistByCount(listenEvents),
    mostListenedSongFridayByCount: mostListenedSongFridayByCount(listenEvents),
    mostListenedSongFridayByTime: mostListenedSongFridayByTime(listenEvents),
    mostListenedSongByTime: mostListenedSongByTime(listenEvents),
    mostListenedArtistByTime: mostListenedArtistByTime(listenEvents),
    longestSongStreak: longestSongStreak(listenEvents),
    songsListenedEveryDay: songsListenedEveryDay(listenEvents),
    topThreeGenres: topThreeGenres(listenEvents),
  };
}

// Exporting individual functions for testing purposes
export default { 
    mostListenedSongByCount,
    mostListenedArtistByCount,
    mostListenedSongFridayByCount,
    mostListenedSongByTime,
    mostListenedArtistByTime,
    longestSongStreak,
    songsListenedEveryDay,
    topThreeGenres,
    computeAnswers,
    getSong
};
