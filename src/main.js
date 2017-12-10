import Loading from './Components/Loading.js'
import Interval from './Components/Interval.js'
import Shooter from './Components/Shooter.js'
import * as PubSub from 'pubsub-js'
import EventType from './ValueObjects/EventType'
import * as IndexAR from './indexAR.js'
import * as RestrictIOS from './RestrictIOS.js'
import GameObserver from './GameObserver'

const gameObserver = new GameObserver();
gameObserver.observe();

/**
 * @fileoverview serviceWorker register
 */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js', {scope: './'})
      .then(registration => {
          // Success
          console.log('Service Worker Registered');
      }).catch(error => {
          // Error
          console.error(error);
  });
}

// 手元で強制的に確認できるようにコメントアウトで残しておきます。
// setTimeout(() => {
//   PubSub.publish(EventType.openGame);
// }, 5000);

// setTimeout(() => {
//   PubSub.publish(EventType.closeGame);
// }, 8000);
