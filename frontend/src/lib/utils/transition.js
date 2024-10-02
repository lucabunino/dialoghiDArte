// Easing
import { quadInOut } from 'svelte/easing'

// Transitions to be used across app
export function mockTransition(node, { delay, duration }) {
  return {
    delay,
    duration
  };
}

export function pageIn(node, { delay, duration }) {
  return {
    delay,
    duration,
    css: (t) => {
      return ``;
    }
  };
}

export function pageOut(node, { delay, duration, marginTop }) {
  return {
    delay,
    duration,
    css: (t) => {
      return `
        position: absolute;
        margin-top: -${marginTop}px;
      `;
    }
  };
}

export function slideIn(node, { delay, duration }) {
  return {
    delay,
    duration,
    css: (t) => {
      const eased = quadInOut(t);
      return `
        -webkit-transform: rotate3d(1, 1, .25, ${(1 - eased) * 180}deg) scale(${eased}) translateZ(0);
        -moz-transform: rotate3d(1, 1, .25, ${(1 - eased) * 180}deg) scale(${eased}) translateZ(0);
        -ms-transform: rotate3d(1, 1, .25, ${(1 - eased) * 180}deg) scale(${eased}) translateZ(0);
        transform: rotate3d(1, 1, .25, ${(1 - eased) * 180}deg) scale(${eased}) translateZ(0);
        transform-origin: center;
      `;
    }
  };
}

export function slideOut(node, { delay, duration }) {
  return {
    delay,
    duration,
    css: (t) => {
      const eased = quadInOut(t);
      return `
        -webkit-transform: translateY(${(1 - eased) * 100}vh) scale(${eased}) translateZ(0);
        -moz-transform: translateY(${(1 - eased) * 100}vh) scale(${eased}) translateZ(0);
        -ms-transform: translateY(${(1 - eased) * 100}vh) scale(${eased}) translateZ(0);
        transform: translateY(${(1 - eased) * 100}vh) scale(${eased}) translateZ(0);
        transform-origin: bottom;
      `;
    }
  };
}

export function privacyIn(node, { delay, duration }) {
  return {
    delay,
    duration,
    css: (t) => {
      const eased = quadInOut(t);
      return `
        -webkit-transform: translateY(calc(${-(1 - eased) * 100}vh - 50%)) translateX(-50%) scale(${eased}) translateZ(0);
        transform: rotate3d(1, 0, 0, ${(1 - eased) * 180}deg) translateY(calc(${(1 - eased) * 70}vh - 50%)) translateX(-50%) scale(${eased}) translateZ(0);
        transform-origin: top;
      `;
    }
  };
}

export function privacyOut(node, { delay, duration }) {
  return {
    delay,
    duration,
    css: (t) => {
      const eased = quadInOut(t);
      return `
      -webkit-transform: translateY(calc(${(1 - eased) * 100}vh - 50%)) translateX(-50%) scale(${eased}) translateZ(0);
      transform: rotate3d(1, 0, 0, ${(1 - eased) * 180}deg) translateY(calc(${-(1 - eased) * 70}vh - 50%)) translateX(-50%) scale(${eased}) translateZ(0);
      transform-origin: bottom;
      `;
    }
  };
}

export function contactsInOut(node, { delay, duration }) {
  return {
    delay,
    duration,
    css: (t) => {
      const eased = quadInOut(t);
      return `
        -webkit-transform: translateX(${-(1 - eased) * 270}px) translateZ(0);
        -moz-transform: translateX(${-(1 - eased) * 270}px) translateZ(0);
        -ms-transform: translateX(${-(1 - eased) * 270}px) translateZ(0);
        transform: translateX(${-(1 - eased) * 270}px) translateZ(0);
      `;
    }
  };
}

export function prevInOut(node, { delay, duration }) {
  return {
    delay,
    duration,
    css: (t) => {
      const eased = quadInOut(t);
      return `
        -webkit-transform: translateX(${-(1 - eased) * 100}px) translateY(-50%) translateZ(0);
        -moz-transform: translateX(${-(1 - eased) * 100}px) translateY(-50%) translateZ(0);
        -ms-transform: translateX(${-(1 - eased) * 100}px) translateY(-50%) translateZ(0);
        transform: translateX(${-(1 - eased) * 100}px) translateY(-50%) translateZ(0);
      `;
    }
  };
}

export function nextInOut(node, { delay, duration }) {
  return {
    delay,
    duration,
    css: (t) => {
      const eased = quadInOut(t);
      return `
        -webkit-transform: translateX(${(1 - eased) * 100}px) translateY(-50%) translateZ(0);
        -moz-transform: translateX(${(1 - eased) * 100}px) translateY(-50%) translateZ(0);
        -ms-transform: translateX(${(1 - eased) * 100}px) translateY(-50%) translateZ(0);
        transform: translateX(${(1 - eased) * 100}px) translateY(-50%) translateZ(0);
      `;
    }
  };
}

export function workIn(node, { delay, duration }) {
  return {
    delay,
    duration,
    css: (t) => {
      const eased = quadInOut(t);
      return `
        -webkit-transform: rotate3d(1, 1, .25, ${(1 - eased) * 180}deg) scale(${eased}) translateZ(0);
        -moz-transform: rotate3d(1, 1, .25, ${(1 - eased) * 180}deg) scale(${eased}) translateZ(0);
        -ms-transform: rotate3d(1, 1, .25, ${(1 - eased) * 180}deg) scale(${eased}) translateZ(0);
        transform: rotate3d(1, 1, .25, ${(1 - eased) * 180}deg) scale(${eased}) translateZ(0);
      `;
    }
  };
}

export function workOut(node, { delay, duration }) {
  return {
    delay,
    duration,
    css: (t) => {
      const eased = quadInOut(t);
      return `
        -webkit-transform: translateY(${(1 - eased) * 100}vh) scale(${eased}) translateZ(0);
        -moz-transform: translateY(${(1 - eased) * 100}vh) scale(${eased}) translateZ(0);
        -ms-transform: translateY(${(1 - eased) * 100}vh) scale(${eased}) translateZ(0);
        transform: translateY(${(1 - eased) * 100}vh) scale(${eased}) translateZ(0);
      `;
    }
  };
}

export function aboutIn(node, { delay, duration }) {
  return {
    delay,
    duration,
    css: (t) => {
      const eased = quadInOut(t);
      return `
        -webkit-transform: translateY(${-(1 - eased) * 140}vh) translateZ(0);
        -moz-transform: translateY(${-(1 - eased) * 140}vh) translateZ(0);
        -ms-transform: translateY(${-(1 - eased) * 140}vh) translateZ(0);
        transform: translateY(${-(1 - eased) * 140}vh) translateZ(0);
      `;
    }
  };
}

export function aboutOut(node, { delay, duration }) {
  return {
    delay,
    duration,
    css: (t) => {
      const eased = quadInOut(t);
      return `
        -webkit-transform: translateY(${(1 - eased) * 140}vh) scale(${eased}) translateZ(0);
        -moz-transform: translateY(${(1 - eased) * 140}vh) scale(${eased}) translateZ(0);
        -ms-transform: translateY(${(1 - eased) * 140}vh) scale(${eased}) translateZ(0);
        transform: translateY(${(1 - eased) * 140}vh) scale(${eased}) translateZ(0);
        transform-origin: bottom left;
      `;
    }
  };
}

export function workInfoInOut(node, { delay, duration }) {
  return {
    delay,
    duration,
    css: (t) => {
      const eased = quadInOut(t);
      return `
        left: ${-(1 - eased) * 100}%;
      `;
    }
  };
}

export function readMoreInOut(node, { delay, duration }) {
  return {
    delay,
    duration,
    css: (t) => {
      const eased = quadInOut(t);
      return `
        left: ${-(1 - eased) * 100}%;
      `;
    }
  };
}

export function titleInOut(node, { delay, duration }) {
  return {
    delay,
    duration,
    css: (t) => {
      const eased = quadInOut(t);
      return `
        -webkit-transform: translateY(${-(1 - eased) * 200}px) translateZ(0);
        -moz-transform: translateY(${-(1 - eased) * 200}px) translateZ(0);
        -ms-transform: translateY(${-(1 - eased) * 200}px) translateZ(0);
        transform: translateY(${-(1 - eased) * 200}px) translateZ(0);
      `;
    }
  };
}

export function mediaIn(node, { delay, duration }) {
  return {
    delay,
    duration,
    css: (t) => {
      const eased = quadInOut(t);
      return `
        -webkit-transform: translateY(${(1 - eased) * 100}vh) translateZ(0);
        -moz-transform: translateY(${(1 - eased) * 100}vh) translateZ(0);
        -ms-transform: translateY(${(1 - eased) * 100}vh) translateZ(0);
        transform: translateY(${(1 - eased) * 100}vh) translateZ(0);
      `;
    }
  };
}

export function mediaOut(node, { delay, duration, pageHeight }) {
  return {
    delay,
    duration,
    css: (t) => {
      const eased = quadInOut(t);
      return `
        -webkit-transform: translateY(${(1 - eased) * pageHeight}px) scale(${eased}) translateZ(0);
        -moz-transform: translateY(${(1 - eased) * pageHeight}px) scale(${eased}) translateZ(0);
        -ms-transform: translateY(${(1 - eased) * pageHeight}px) scale(${eased}) translateZ(0);
        transform: translateY(${(1 - eased) * pageHeight}px) scale(${eased}) translateZ(0);
      `;
    }
  };
}

export function UISwitchInOut(node, { delay, duration }) {
  return {
    delay,
    duration,
    css: (t) => {
      const eased = quadInOut(t);
      return `
        margin-bottom: ${-(1-eased) * 40}px;
      `;
    }
  };
}