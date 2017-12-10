import * as PubSub from 'pubsub-js'
import database from './firebaseDatabase'
import EventType from './ValueObjects/EventType'

export default class GameObserver {
  constructor() {
    this.gameRound;
  }

  nowGameRound(){
    return this.gameRound;
  }

  observe() {
    database.ref(`/currentGame`).on('value', snapshot => {
      console.log(snapshot.val());
      let currentGame = snapshot.val();
      this.gameRound = currentGame.id;

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
