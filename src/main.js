import Shooter from './Components/Shooter.js'
import * as PubSub from 'pubsub-js'
import EventType from './ValueObjects/EventType'
import * as IndexAR from 'indexAR.js'

PubSub.subscribe(EventType.shot, e => {
  // TODO オブジェクトの中心判定
  //PubSub.publish(EventType.isHit, {name: "tsukamotota"});
});
