
import { getSong } from '../data.mjs';

export const DataHelpers = {
  /**
   * Find most frequent item in an array
   */
  mostFrequent: (items) => {
    const freq = {};
    items.forEach(item => freq[item] = (freq[item] || 0) + 1);
    return Object.keys(freq).reduce((a, b) => freq[a] >= freq[b] ? a : b);
  },

  /**
   * Find key with highest value in an object
   */
  maxByValue: (obj) => {
    return Object.keys(obj).reduce((a, b) => obj[a] >= obj[b] ? a : b);
  },

  /**
   * Group items and sum values by key
   */
  sumByKey: (items, getKey, getValue) => {
    const groups = {};
    items.forEach(item => {
      const key = getKey(item);
      const value = getValue(item);
      groups[key] = (groups[key] || 0) + value;
    });
    return groups;
  },

  /**
   * Format a song as "Artist - Title"
   */
  formatSong: (songID) => {
    const { artist, title } = getSong(songID);
    return `${artist} - ${title}`;
  },

  /**
   * Check if a timestamp is Friday night (5pm-4am)
   */
  isFridayNight: (timestamp) => {
    const d = new Date(timestamp);
    const day = d.getDay();
    const hour = d.getHours();
    return (day === 5 && hour >= 17) || (day === 6 && hour < 4);
  },

  /**
   * Convert timestamp to date string
   */
  toDateString: (timestamp) => new Date(timestamp).toDateString()
};