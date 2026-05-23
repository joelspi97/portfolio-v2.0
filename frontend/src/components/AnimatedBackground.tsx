import { useCallback, type ReactElement } from 'react';

import { loadSlim } from '@tsparticles/slim';
import { Particles, ParticlesProvider } from '@tsparticles/react';
import { type Engine, type IOptions, type RecursivePartial } from '@tsparticles/engine';

import { PARTICLES_CONFIG } from '../constants/particlesConfig';

export function AnimatedBackground(): ReactElement {
  const particlesInit = useCallback(async (engine: Engine): Promise<void> => {
    await loadSlim(engine);
  }, []);

  return (
    <ParticlesProvider init={particlesInit}>
      <Particles
        className='animated-background'
        id='tsparticles'
        options={PARTICLES_CONFIG.options as RecursivePartial<IOptions>}
      />
    </ParticlesProvider>
  );
}
