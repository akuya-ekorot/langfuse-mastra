# Langfuse-Mastra Integration

> Observability & Tracing for [Mastra](https://mastra.ai) with [Langfuse](https://langfuse.com)

This repository provides a simple integration between Mastra, a TypeScript agent framework, and Langfuse, an observability platform for AI applications.

## What is this?

- **Mastra**: A TypeScript agent framework that provides primitives for building AI applications with memory, tool-calling, deterministic LLM workflows, and RAG capabilities.
- **Langfuse**: An open-source observability and analytics platform designed for LLM applications.
- **This integration**: Enables tracing, monitoring, and debugging of Mastra agents through the Langfuse dashboard.

## Quick Start

### Setup

1. **Create a Mastra project** (if you don't have one)

```bash
npx create-mastra
cd your-mastra-project
```

2. **Set up Langfuse**

Create a project in [Langfuse](https://cloud.langfuse.com) and get your API keys from the project settings page.

3. **Add environment variables**

Create or update your `.env.development` file:

```bash
# Your LLM API key
OPENAI_API_KEY=your-api-key

# Langfuse credentials
LANGFUSE_SECRET_KEY=sk-lf-...
LANGFUSE_PUBLIC_KEY=pk-lf-...
LANGFUSE_HOST=https://cloud.langfuse.com # Optional
```

4. **Install the package**

```bash
npm install langfuse-vercel
```

5. **Configure your Mastra instance**

```typescript
// agents/chefAgent.ts
import { Agent } from "@mastra/core/agent";
import { openai } from "@ai-sdk/openai";

export const chefAgent = new Agent({
  name: "chef-agent",
  instructions:
    "You are Michel, a practical and experienced home chef " +
    "You help people cook with whatever ingredients they have available.",
  model: openai("gpt-4o-mini"),
});
```

Update your Mastra configuration to include the Langfuse exporter:

```typescript
import { Mastra } from "@mastra/core";
import { LangfuseExporter } from "langfuse-vercel";
import { chefAgent } from "./agents/chefAgent";

export const mastra = new Mastra({
  agents: { chefAgent },
  telemetry: {
    serviceName: "ai", // must be "ai" for Langfuse compatibility
    enabled: true,
    export: {
      type: "custom",
      exporter: new LangfuseExporter({
        publicKey: process.env.LANGFUSE_PUBLIC_KEY,
        secretKey: process.env.LANGFUSE_SECRET_KEY,
        baseUrl: process.env.LANGFUSE_HOST,
      }),
    },
  },
});
```

6. **Start your dev server**

```bash
npm run dev
```

7. **View traces in Langfuse**

Head to your [Langfuse dashboard](https://cloud.langfuse.com) to see the traces from your agent interactions.

## Documentation

For more information, check out:
- [Mastra Documentation](https://mastra.ai/docs)
- [Langfuse Documentation](https://langfuse.com/docs)
- [langfuse-vercel package](https://www.npmjs.com/package/langfuse-vercel)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
