import { Mastra } from "@mastra/core";
import { LangfuseExporter } from "langfuse-vercel";
import { chefAgent } from "./agents/chefAgent";

// mastra instance
export const mastra = new Mastra({
  agents: { chefAgent },
  telemetry: {
    serviceName: "ai", // this must be set to "ai" so that the LangfuseExporter thinks it's an AI SDK trace
    enabled: true,
    export: {
      type: "custom",
      exporter: new LangfuseExporter({
        publicKey: process.env.LANGFUSE_PUBLIC_KEY,
        secretKey: process.env.LANGFUSE_SECRET_KEY,
        baseUrl: process.env.LANGFUSE_BASEURL,
      }),
    },
  },
});
