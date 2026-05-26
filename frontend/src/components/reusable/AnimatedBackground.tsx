import { type ReactElement } from 'react';

import { Particles } from '@tsparticles/react';
import { type IOptions, type RecursivePartial } from '@tsparticles/engine';

import { PARTICLES_CONFIG } from '../../constants/particlesConfig';

type AnimatedBackgroundProps = {
  id: string;
};

export function AnimatedBackground(props: AnimatedBackgroundProps): ReactElement {
  const { id } = props;
  
  return (
    <Particles
      className='animated-background'
      id={id}
      options={PARTICLES_CONFIG.options as RecursivePartial<IOptions>}
    />
  );
}
