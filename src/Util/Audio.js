export default class Audio {

  constructor(url) {
    this.url = url;
    this.context;
    this.buffer;
    this._bufferLoad();
  }

  play() {
    let source = this.context.createBufferSource();
    source.buffer = this.buffer;
    source.connect(this.context.destination);
    source.start(0);
  }

  _bufferLoad() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;  
    this.context = new AudioContext();

    let request = new XMLHttpRequest();
    request.open('GET', this.url, true);
    request.responseType = 'arraybuffer';
  
    // Decode asynchronously
    request.onload = () => {
      this.context.decodeAudioData(request.response, buffer => {
        this.buffer = buffer;
      }, onError);
    }
    request.send();
  }
}
