// Vitest + jsdom setup for components that depend on browser-only APIs.
// Keep this file minimal and deterministic.

// Headless UI uses ResizeObserver in some cases; jsdom doesn't provide it.
if (typeof (globalThis as any).ResizeObserver === 'undefined') {
  ;(globalThis as any).ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
}
