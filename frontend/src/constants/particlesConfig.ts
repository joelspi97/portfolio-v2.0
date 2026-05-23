import type { ILoadParams } from "@tsparticles/engine";

export const PARTICLES_CONFIG: ILoadParams = {
  id: "tsparticles",
  options: {
    particles: {
      move: { enable: true },
      number: { density: { enable: true }, value: 35 },
      opacity: { value: 0.75 },
      shape: { type: "circle" },
      size: { value: 3 }
    },
    fpsLimit: 35,
    fullScreen: false,
    pauseOnOutsideViewport: true
  }
};
