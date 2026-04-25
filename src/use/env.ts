export const useEnv = () => {
  const version = () => import.meta.env.PACKAGE_VERSION

  return { version }
}