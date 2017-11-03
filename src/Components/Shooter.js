import Shooter from './Shooter.html';
import ShootType from '../ValueObjects/ShootType'

const ShooterComponent = new Shooter({
  target: document.querySelector('.shooter'),
});

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
  if (ShooterComponent._state.type === ShootType.add) {
    ShooterComponent.set({ count: count++});
  } else {
    ShooterComponent.set({ count: count--});
  } 
});

export default ShooterComponent;
