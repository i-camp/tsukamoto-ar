import * as PubSub from 'pubsub-js'
import database from './firebaseDatabase'
import EventType from './ValueObjects/EventType'

class GameObserver {
  constructor() {
    this.now;
    this.observe();
  }

  nowGame(){
    return this.now;
  }

  observe() {
    database.ref(`/currentGame`).on('value', snapshot => {
      console.log(snapshot.val());
      let currentGame = snapshot.val();
      this.now = currentGame;

      // ゲームが開始されているかどうか
      if (
        currentGame.openedAt !== undefined
        && currentGame.closedAt === undefined
      ) {
        console.log("openGame");
        PubSub.publish(EventType.openGame, currentGame);
      } else if (
        currentGame.closedAt !== undefined
      ) {
        console.log("closeGame");
        PubSub.publish(EventType.closeGame, currentGame);
      }

    });
  }
}

export default new GameObserver();
