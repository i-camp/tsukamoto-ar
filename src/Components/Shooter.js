import Shooter from './Shooter.html';
import ShootType from '../ValueObjects/ShootType'
import database from '../firebaseDatabase.js';

const ShooterComponent = new Shooter({
  target: document.querySelector('.shooter'),
});

let attack   = 0;
let recovery = 0;

ShooterComponent.set({
  type: ShootType.add,
  addClass: true,
  removeClass: false,
  count: attack - recovery
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
  if (ShooterComponent._state.type === ShootType.add) {
    attack++;
  } else {
    recovery++;
  }
  ShooterComponent.set({ count: attack - recovery });
});

// 1秒間隔で送る
setInterval(
  () => {
  // 変更がない場合
  if (attack === 0 && recovery === 0) {
    return;
  }

  // TODO 格納するユーザーを可変にする
  database.ref('/0/tsukamotota').push().set({
    attack: attack,
    recovery: recovery
  });

  // reset
  attack   = 0;
  recovery = 0;
  
}, 1000);

export default ShooterComponent;
