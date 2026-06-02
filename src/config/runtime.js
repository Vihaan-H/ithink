export const isDemoMode = import.meta.env.VITE_DEMO_MODE === "true";

export const appCopy = {
  name: "Bathroom Pass",
  tagline: isDemoMode
    ? "Demo-ready bathroom sign-out and sign-in tracking"
    : "Bathroom sign-out and sign-in tracking",
  modeLabel: isDemoMode ? "Demo mode" : "Live mode",
};
