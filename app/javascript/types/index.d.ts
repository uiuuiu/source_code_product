import { AppBridgeState, ClientApplication } from "@shopify/app-bridge/client";

export { };

declare global {
  interface Window {
    app: ClientApplication<AppBridgeState>;
    sessionToken: string;
  }
}