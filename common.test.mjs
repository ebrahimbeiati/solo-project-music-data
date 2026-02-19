import assert from 'node:assert/strict';
import { Questions } from './components/question-solvers.mjs';
import { DataHelpers } from './components/data-helpers.mjs';

/**
 * Stub formatSong so the test is deterministic
 */
DataHelpers.formatSong = (id) => `Song ${id}`;

function testLongestStreak() {
  const listens = [
    { song_id: 'a' },
    { song_id: 'a' },
    { song_id: 'b' },
    { song_id: 'b' },
    { song_id: 'b' },
    { song_id: 'a' },
  ];

  const result = Questions.longestStreak(listens);

  assert.strictEqual(
    result,
    'Song b (length: 3)',
    'Expected longest streak to be song b with length 3'
  );
}

// Run test
try {
  testLongestStreak();
  console.log('PASS: longestStreak returns correct result');
} catch (error) {
  console.error('FAIL: longestStreak test failed');
  console.error(error.message);
  process.exit(1);
}
