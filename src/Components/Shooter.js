import Shooter from './Shooter.html';

const ShooterComponent = new Shooter({
  target: document.querySelector('.shooter'),
});

ShooterComponent.observe('count', count => {
  console.log(`the actual count is ${count}`);
});

export default ShooterComponent;
