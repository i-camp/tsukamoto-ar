import Shooter from './Shooter.html';
import ShootType from '../ValueObjects/ShootType'
import database from '../firebaseDatabase.js';

const ShooterComponent = new Shooter({
  target: document.querySelector('.shooter'),
});

const isVibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
let count = 0;

ShooterComponent.set({
  type: ShootType.add,
  addClass: true,
  removeClass: false,
  count: count
});

ShooterComponent.on('switch', e => {
  ShooterComponent.set({
    type: e.type
  });
  let flg = {};
  if (e.type === ShootType.add) {
    flg = {
      addClass: true,
      removeClass: false
    };
  } else {
    flg = {
      addClass: false,
      removeClass: true
    };
  }
  ShooterComponent.set(flg);
});

ShooterComponent.on('shoot', e => {
  if (isVibrate){
    navigator.vibrate(100);
  }

  if (ShooterComponent._state.type === ShootType.add) {
    count++;
    // TODO pathとvalueの動的指定
    database.ref('/0/tsukamotota').push().set({
      attack: 0,
      recovery: 1
    });
  } else {
    count--;
    // TODO pathとvalueの動的指定
    database.ref('/0/tsukamotota').push().set({
      attack: 1,
      recovery: 0
    });
  }
  ShooterComponent.set({ count: count });
});

export default ShooterComponent;
