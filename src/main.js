import Loading from './Components/Loading.js'
import Shooter from './Components/Shooter.js'
import * as PubSub from 'pubsub-js'
import EventType from './ValueObjects/EventType'
import * as IndexAR from './indexAR.js'


// sample is loaded
setTimeout(() => {
  PubSub.publish(EventType.isLoaded);
}, 5000);
