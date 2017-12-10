import ScoreBoard from './ScoreBoard.html'
import * as PubSub from 'pubsub-js'
import EventType from '../ValueObjects/EventType'

const ScoreBoardComponent = new ScoreBoard({
  target: document.querySelector('.scoreboard'),
});

const score =  (plus, minus) => {
  if (plus === 0 && minus === 0) {
    return 50;
  }
  return (plus / (plus + minus) * 100 || 0);
}

ScoreBoardComponent.set({
  score: score
});

PubSub.subscribe(EventType.openGame, (e, data) => {
  ScoreBoardComponent.set({
    targets:  Object.values(data.targets)
  });
});

PubSub.subscribe(EventType.closeGame, (e, data) => {
  ScoreBoardComponent.set({
    targets:  Object.values(data.targets)
  });
});

export default ScoreBoardComponent;
