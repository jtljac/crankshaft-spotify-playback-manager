import { SMM } from '@crankshaft/types';

export const load = (smm: SMM) => {
  console.info('Template plugin loaded!');
};

export const unload = (smm: SMM) => {
  console.info('Template plugin unloaded!');
};
