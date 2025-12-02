import pkg from "../../package.json";

export const APP_VERSION = pkg?.version || "0.0.0";

export const TRACKING_CODE = `TRK-${APP_VERSION.replace(/\./g, "")}`;
