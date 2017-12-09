export default class ScoreCollection {
  constructor() {
    this.scores = {};
  }

  scores() {
    return this.scores;
  }

  score(name) {
    return this.scores[name];
  }

  _setName(name) {
    if (typeof this.scores[name] === "undefined") {
      this.scores[name] = {
        plus: 0,
        minus: 0
      };
    }
  }

  add(name) {
    this._setName(name);
    this.scores[name].plus++;
  }

  remove(name) {
    this._setName(name);
    this.scores[name].minus++;
  }

  refresh() {
    this.scores = {};
  }
}
