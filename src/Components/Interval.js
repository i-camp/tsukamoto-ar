import Interval from './Interval.html'
import * as PubSub from 'pubsub-js'
import EventType from '../ValueObjects/EventType'

const IntervalComponent = new Interval({
  target: document.querySelector('.interval'),
});

IntervalComponent.set({
  isOpend: false,
  isClosed: true
});

PubSub.subscribe(EventType.openGame, e => {
  IntervalComponent.set({
    isOpend: true,
    isClosed: false
  });  
});

PubSub.subscribe(EventType.closeGame, e => {
  IntervalComponent.set({
    isOpend: false,
    isClosed: true
  });  
});

export default IntervalComponent;
