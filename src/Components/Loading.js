import Loading from './Loading.html'
import * as PubSub from 'pubsub-js'
import EventType from '../ValueObjects/EventType'

const LoadingComponent = new Loading({
  target: document.querySelector('.load'),
});

PubSub.subscribe(EventType.isLoaded, e => {
  LoadingComponent.set({
    isLoading: false
  });  
});

export default LoadingComponent;
