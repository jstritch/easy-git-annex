export function cloneEnv(): NodeJS.ProcessEnv {
  return Object.assign({}, process.env);
}
