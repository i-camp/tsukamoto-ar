window.AudioContext = window.AudioContext || window.webkitAudioContext;  
const context = new AudioContext();

class Audio {

  playAudio(url) {
    this._getAudioBuffer(url, buffer => {
      this._play(buffer);
    });
  }

  _getAudioBuffer(url, fn) {
    let req = new XMLHttpRequest();
    req.responseType = 'arraybuffer';
    
      req.onreadystatechange = () => {
        if (req.readyState === 4) {
          if (req.status === 0 || req.status === 200) {
            // array buffer を audio buffer に変換
            context.decodeAudioData(req.response, buffer => {
              // コールバックを実行
              fn(buffer);
            });
          }
        }
      };
    
      req.open('GET', url, true);
      req.send('');
  }

  _play(buffer) {
    // source を作成
    let source = context.createBufferSource();
    // buffer をセット
    source.buffer = buffer;
    // context に connect
    source.connect(context.destination);
    // 再生
    source.start(0);
  }
}

export default new Audio();
