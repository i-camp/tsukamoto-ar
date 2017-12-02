import audio from '../Util/Audio'
import * as PubSub from 'pubsub-js'
import Shooter from './Shooter.html'
import ScoreObserver from '../ScoreObserver'
import ShootType from '../ValueObjects/ShootType'
import EventType from '../ValueObjects/EventType'

const ShooterComponent = new Shooter({
  target: document.querySelector('.shooter'),
});

const Observer = new ScoreObserver();
Observer.observe();

const ChangeSound = new Audio("./assets/change.mp3");
const ShotSound   = new Audio("./assets/shot.mp3");

ShooterComponent.set({
  type: ShootType.add,
  addClass: true,
  removeClass: false
});

ShooterComponent.on('switch', e => {
  ChangeSound.play();
  ShooterComponent.set({
    type: e.type
  });
  let flg = {};
  if (e.type === ShootType.add) {
    flg = {
      addClass: true,
      removeClass: false
    };
    Observer.add();
  } else {
    flg = {
      addClass: false,
      removeClass: true
    };
    Observer.remove();
  }
  ShooterComponent.set(flg);
});

ShooterComponent.on('shoot', e => {
  ShotSound.play();
  PubSub.publish(EventType.shot);
});

export default ShooterComponent;
