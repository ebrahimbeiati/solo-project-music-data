import assert from "node:assert";
import test from "node:test";
import questions from "./questions.mjs";

// Sample listen events using REAL song IDs
const listenEvents = [
  { user_id: 1, song_id: "song-1", timestamp: "2024-01-01T18:00:00Z" },
  { user_id: 1, song_id: "song-1", timestamp: "2024-01-02T18:00:00Z" },
  { user_id: 1, song_id: "song-2", timestamp: "2024-01-03T18:00:00Z" },
  { user_id: 2, song_id: "song-1", timestamp: "2024-01-01T18:00:00Z" },
  { user_id: 2, song_id: "song-3", timestamp: "2024-01-02T18:00:00Z" },
  { user_id: 2, song_id: "song-3", timestamp: "2024-01-03T18:00:00Z" },
  { user_id: 3, song_id: "song-4", timestamp: "2024-01-01T18:00:00Z" },
  { user_id: 3, song_id: "song-4", timestamp: "2024-01-02T18:00:00Z" },
  { user_id: 3, song_id: "song-4", timestamp: "2024-01-03T18:00:00Z" },
  { user_id: 4, song_id: "song-99", timestamp: "2024-01-01T18:00:00Z" },
  { user_id: 4, song_id: "song-99", timestamp: "2024-01-02T18:00:00Z" },
  { user_id: 4, song_id: "song-99", timestamp: "2024-01-03T18:00:00Z" },
  
];

test("mostListenedSongByCount returns the correct most listened song", () => {
  const result = questions.mostListenedSongByCount(listenEvents);

  assert.ok(result, "Function should not return null");
  assert.strictEqual(result.count, 3, "Count should be 3");

  // song-1 and song-4 both appear 3 times, i expect either of them to be returned as the most listened song
  const expectedIds = ["song-1", "song-4"];

  //song-99 appears 3 times but it should not show up as the most listened song because it is not a real song in the dataset.
  assert.ok(expectedIds.includes(result.song.id));
});
