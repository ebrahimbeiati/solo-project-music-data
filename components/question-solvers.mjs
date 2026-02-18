import { getSong } from "../data.mjs";
import { DataHelpers } from "./data-helpers.mjs";

export const Questions = {
  /**
   * Q1: Most listened song by count
   */
  mostSongByCount: (listens) => {
    if (!listens.length) return null;
    const songID = DataHelpers.mostFrequent(listens.map((l) => l.song_id));
    return DataHelpers.formatSong(songID);
  },

  /**
   * Q4a: Most listened song by time
   */
  mostSongByTime: (listens) => {
    if (!listens.length) return null;
    const totals = DataHelpers.sumByKey(
      listens,
      (l) => l.song_id,
      (l) => getSong(l.song_id).duration,
    );
    return DataHelpers.formatSong(DataHelpers.maxByValue(totals));
  },

  /**
   * Q2: Most listened artist by count
   */
  mostArtistByCount: (listens) => {
    if (!listens.length) return null;
    const artists = listens.map((l) => getSong(l.song_id).artist);
    return DataHelpers.mostFrequent(artists);
  },

  /**
   * Q4b: Most listened artist by time
   */
  mostArtistByTime: (listens) => {
    if (!listens.length) return null;
    const totals = DataHelpers.sumByKey(
      listens,
      (l) => getSong(l.song_id).artist,
      (l) => getSong(l.song_id).duration,
    );
    return DataHelpers.maxByValue(totals);
  },

  /**
   * Q5: Longest streak of same song
   */
  longestStreak: (listens) => {
    if (!listens.length) return null;

    let bestSongID = listens[0].song_id;
    let bestLength = 1;

    let currentSongID = listens[0].song_id;
    let currentLength = 1;

    for (let i = 1; i < listens.length; i++) {
      if (listens[i].song_id === currentSongID) {
        currentLength++;
        if (currentLength > bestLength) {
          bestLength = currentLength;
          bestSongID = currentSongID;
        }
      } else {
        currentSongID = listens[i].song_id;
        currentLength = 1;
      }
    }

    return `${DataHelpers.formatSong(bestSongID)} (length: ${bestLength})`;
  },

  /**
   * Q6: Songs listened to every day
   */
  everyDaySongs: (listens) => {
    if (!listens.length) return null;

    // Group songs by date
    const songsByDate = {};
    listens.forEach((l) => {
      const date = DataHelpers.toDateString(l.timestamp);
      songsByDate[date] ??= new Set();
      songsByDate[date].add(l.song_id);
    });

    // Find songs that appear on all days
    const allDays = Object.values(songsByDate);
    const commonSongs = allDays.reduce(
      (common, daySongs) =>
        new Set([...common].filter((id) => daySongs.has(id))),
      allDays[0],
    );

    if (!commonSongs.size) return null;

    return [...commonSongs].map(DataHelpers.formatSong).join(", ");
  },

  /**
   * Q7: Top 3 genres by count
   */
  topGenres: (listens) => {
    if (!listens.length) return null;

    const genreCounts = DataHelpers.sumByKey(
      listens,
      (l) => getSong(l.song_id).genre,
      () => 1,
    );

    return Object.entries(genreCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([genre]) => genre);
  },
};
