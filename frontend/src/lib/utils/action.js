// longpress.js
export function longpress(node, duration = 500) {
  let timer;
  let startX, startY;
  let isDragging = false;

  const handleTouchStart = (event) => {
      if (event.touches.length > 1) {
          return;
      }

      const touch = event.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;

      timer = setTimeout(() => {
          node.dispatchEvent(new CustomEvent('longpress'));
      }, duration);
  };

  const handleTouchMove = (event) => {
      const touch = event.touches[0];
      const dx = Math.abs(touch.clientX - startX);
      const dy = Math.abs(touch.clientY - startY);

      if (dx > 10 || dy > 10) {
          clearTimeout(timer);
          isDragging = true;
      }
  };

  const handleTouchEnd = (event) => {
      if (event.touches.length > 1 || isDragging) {
          isDragging = false;
          clearTimeout(timer);
          return;
      }
      clearTimeout(timer);
  };

  node.addEventListener('touchstart', handleTouchStart);
  node.addEventListener('touchmove', handleTouchMove);
  node.addEventListener('touchend', handleTouchEnd);
  node.addEventListener('touchcancel', handleTouchEnd);

  return {
      destroy() {
          node.removeEventListener('touchstart', handleTouchStart);
          node.removeEventListener('touchmove', handleTouchMove);
          node.removeEventListener('touchend', handleTouchEnd);
          node.removeEventListener('touchcancel', handleTouchEnd);
      }
  };
}
