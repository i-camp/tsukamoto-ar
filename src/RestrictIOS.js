/* 上下スクロール無効 */
window.addEventListener('touchmove', event => {
  event.preventDefault();
});
/* ピッチインピッチアウトによる拡大縮小を禁止 */
document.documentElement.addEventListener('touchstart', (e) => {
  if (e.touches.length >= 2) {e.preventDefault();}
}, false);
/* ダブルタップによる拡大を禁止 */
let t = 0;
document.documentElement.addEventListener('touchend', (e) => {
  let now = new Date().getTime();
  if ((now - t) < 350){
    e.preventDefault();
  }
  t = now;
}, false);
