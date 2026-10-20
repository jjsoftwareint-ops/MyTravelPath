import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** false on the server and during hydration, true afterwards (and at once under createRoot).
 *  Gate anything that depends on the device (navigator, window size) so the first client
 *  render matches the pre-rendered HTML. */
export const useHydrated = () => useSyncExternalStore(noop, () => true, () => false);
