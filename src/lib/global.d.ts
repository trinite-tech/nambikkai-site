export {}

declare global {
  interface Window {
    testStrapiConnection?: () => Promise<void>
  }
}
