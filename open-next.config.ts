import { defineCloudflareConfig } from "@opennextjs/cloudflare";

const cloudflareConfig = defineCloudflareConfig();

export default {
  ...cloudflareConfig,
  // Use build:next so the opennextjs-cloudflare build command does not
  // recursively call itself via the top-level "build" npm script.
  buildCommand: "npm run build:next",
};
