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
    if (this.scores[name] === undefined) {
      this.scores[name] = {
        attack: 0,
        recovery: 0
      };
    }
  }

  add(name) {
    this._setName(name);
    this.scores[name].attack++;
  }

  remove(name) {
    this._setName(name);
    this.scores[name].recovery--;
  }

  refresh() {
    this.scores = {};
  }
}
