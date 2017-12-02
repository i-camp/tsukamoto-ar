import database from './firebaseDatabase'
import ScoreCollection from './ScoreCollection'
import ShootType from './ValueObjects/ShootType'
import EventType from './ValueObjects/EventType'

export default class ScoreObserver {

  constructor() {
    this.collection = new ScoreCollection();
    this.shotType   = ShootType.add;
  }

  add() {
    this.shotType = ShootType.add;
  }

  remove() {
    this.shotType = ShootType.remove;
  }

  observe() {

    PubSub.subscribe(EventType.isHit, (e, data) => {
      if (this.shotType === ShootType.add) {
        this.collection.add(data.name);
      } else {
        this.collection.remove(data.name);
      }
      console.log(this.collection.score(data.name));
    });
    
    // 1秒間隔で送る
    setInterval(
      () => {
      Object.keys(this.collection.scores).forEach(name => {
        let score = this.collection.score(name);
        if (score.attack !== 0 || score.recovery !== 0) {
          database.ref(`/0/${name}`).push().set({
            attack: score.attack,
            recovery: score.recovery
          });
        }
      });
      this.collection.refresh();
    }, 1000);

  }
}
