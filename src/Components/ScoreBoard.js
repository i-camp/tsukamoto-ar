import ScoreBoard from './ScoreBoard.html'
import * as PubSub from 'pubsub-js'
import EventType from '../ValueObjects/EventType'
import Shuffle from 'shufflejs'

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

const sortByOrder = element => {
  return element.getAttribute('data-order');
}

const options = {
  buffer: 0, // Useful for percentage based heights when they might not always be exactly the same (in pixels).
  columnThreshold: 0.01, // Reading the width of elements isn't precise enough and can cause columns to jump between values.
  columnWidth: 0, // A static number or function that returns a number which tells the plugin how wide the columns are (in pixels).
  delimeter: null, // If your group is not json, and is comma delimeted, you could set delimeter to ','.
  easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)', // CSS easing function to use.
  filterMode: Shuffle.FilterMode.ANY, // When using an array with filter(), the element passes the test if any of its groups are in the array. With "all", the element only passes if all groups are in the array.
  group: Shuffle.ALL_ITEMS, // Initial filter group.
  gutterWidth: 0, // A static number or function that tells the plugin how wide the gutters between columns are (in pixels).
  initialSort: null, // Shuffle can be initialized with a sort object. It is the same object given to the sort method.
  isCentered: false, // Attempt to center grid items in each row.
  itemSelector: '.target', // e.g. '.picture-item'.
  roundTransforms: false, // Whether to round pixel values used in translate(x, y). This usually avoids blurriness.
  sizer: null, // Element or selector string. Use an element to determine the size of columns and gutters.
  speed: 500, // Transition/animation speed (milliseconds).
  staggerAmount: 15, // Transition delay offset for each item in milliseconds.
  staggerAmountMax: 150, // Maximum stagger delay in milliseconds.
  throttleTime: 300, // How often shuffle can be called on resize (in milliseconds).
  useTransforms: false, // Whether to use transforms or absolute positioning.
};

PubSub.subscribe(EventType.openGame, (e, data) => {
  ScoreBoardComponent.set({
    targets:  Object.values(data.targets)
  });

  let shuffle = new Shuffle(document.querySelector('.targets'), options);
  shuffle.sort({
    by: sortByOrder
  });
});

PubSub.subscribe(EventType.closeGame, (e, data) => {
  ScoreBoardComponent.set({
    targets:  Object.values(data.targets)
  });
  
  let shuffle = new Shuffle(document.querySelector('.targets'), options);
  shuffle.sort({
    by: sortByOrder
  });
});

export default ScoreBoardComponent;
