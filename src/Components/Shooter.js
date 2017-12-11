import audio from '../Util/Audio'
import * as PubSub from 'pubsub-js'
import Shooter from './Shooter.html'
import ScoreObserver from '../ScoreObserver'
import ShootType from '../ValueObjects/ShootType'
import EventType from '../ValueObjects/EventType'

const isVibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

const ShooterComponent = new Shooter({
  target: document.querySelector('.shooter'),
});

const ChangeSound = new Audio("./assets/change.mp3");
const ShotSound   = new Audio("./assets/shot.mp3");

ShooterComponent.set({
  type: ShootType.add
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
    ScoreObserver.add();
  } else {
    flg = {
      addClass: false,
      removeClass: true
    };
    ScoreObserver.remove();
  }
  ShooterComponent.set(flg);
});

ShooterComponent.on('shoot', e => {
  if (!ShooterComponent._state.enableShot) {
    return;
  }
  ShooterComponent.set({enableShot: false});
  setTimeout(() => {
    ShooterComponent.set({enableShot: true});
  }, 350);

  if (isVibrate){
    navigator.vibrate(100);
  }

  ShotSound.play();
  ShooterComponent.set({fire: true});
  setTimeout(() => {
    ShooterComponent.set({fire: false});
  }, 100);
  PubSub.publish(EventType.shot);
});

// ゲームタイトル
PubSub.subscribe(EventType.openGame, (e, data) => {
  if (data) {
    ShooterComponent.set({title: data.name});
  }
});

// ヒット
PubSub.subscribe(EventType.isHit, (e, data) => {
  ShooterComponent.set({hit: true});
  setTimeout(() => {
    ShooterComponent.set({hit: false});
  }, 250);
});

export default ShooterComponent;
