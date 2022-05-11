// TODO: in future use types package
type SMM = any;

export const load = (smm: SMM) => {
  console.info('Template plugin loaded!');
};

export const unload = () => {
  console.info('Template plugin unloaded!');
}