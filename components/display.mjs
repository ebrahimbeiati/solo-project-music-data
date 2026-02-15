
import { UI } from './ui-components.mjs';
import { DataHelpers } from './data-helpers.mjs'
import { Questions } from './question-solvers.mjs';

export const Display = {

  questionAnswer: (question, answer) => {
    return answer ? UI.Section(question, answer) : null;
  },
genreList: (genres) => {
    if (!genres?.length) return null;
    
    // Choose heading based on number of genres
    let heading;
    if (genres.length === 1) {
      heading = 'Top Genre';
    } else if (genres.length === 2) {
      heading = 'Top 2 Genres';
    } else {
      heading = 'Top 3 Genres';
    }
    
    return UI.Section(heading, UI.List(genres));
  },

  /**
   * Display "no data" message
   */
  noDataMessage: () => {
    return UI.Section(null, 'This user didn\'t listen to any songs.');
  },

  /**
   * Build all sections for a user
   */
  buildAllSections: (listens) => {
    // If no listens, show message
    if (!listens.length) {
      return [Display.noDataMessage()];
    }

    // Filter Friday night listens
    const fridayListens = listens.filter(l => DataHelpers.isFridayNight(l.timestamp));

    // Build all sections
    return [
      Display.questionAnswer(
        'Most Listened Song (by count)', 
        Questions.mostSongByCount(listens)
      ),
      Display.questionAnswer(
        'Most Listened Song (by time)', 
        Questions.mostSongByTime(listens)
      ),
      Display.questionAnswer(
        'Most Listened Artist (by count)', 
        Questions.mostArtistByCount(listens)
      ),
      Display.questionAnswer(
        'Most Listened Artist (by time)', 
        Questions.mostArtistByTime(listens)
      ),
      
      // Only show Friday questions if there are Friday listens
      fridayListens.length && Display.questionAnswer(
        'Most Listened Song on Friday Nights (by count)',
        Questions.mostSongByCount(fridayListens)
      ),
      fridayListens.length && Display.questionAnswer(
        'Most Listened Song on Friday Nights (by time)',
        Questions.mostSongByTime(fridayListens)
      ),
      
      Display.questionAnswer(
        'Longest Listening Streak', 
        Questions.longestStreak(listens)
      ),
      Display.questionAnswer(
        'Songs Listened to Every Day', 
        Questions.everyDaySongs(listens)
      ),
      Display.genreList(Questions.topGenres(listens))
    ];
  },

  /**
   * Render sections to container
   */
  renderToPage: (container, sections) => {
    container.innerHTML = '';
    sections.filter(Boolean).forEach(section => {
      container.appendChild(section);
    });
  }
};