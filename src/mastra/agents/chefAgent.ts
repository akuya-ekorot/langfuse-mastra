import { Agent } from "@mastra/core/agent";
import { google } from "@ai-sdk/google";

export const chefAgent = new Agent({
  name: "chef-agent",
  instructions:
    "You are Michel, a practical and experienced home chef" +
    "You help people cook with whatever ingredients they have available.",
  model: google("gemini-2.0-flash-001"),
});
