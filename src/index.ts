import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { VapiClient } from "./vapi.js";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.VAPI_API_KEY;
if (!API_KEY) {
    throw new Error("VAPI_API_KEY environment variable is required");
}

const vapi = new VapiClient(API_KEY);

const server = new McpServer({
    name: "vapi-mcp-server",
    version: "1.0.0",
});

server.registerTool(
    "vapi_list_assistants",
    {
        description: "List all Vapi assistants"
    },
    async () => ({
        content: [{ type: "text", text: JSON.stringify(await vapi.listAssistants()) }]
    })
);

server.registerTool(
    "vapi_get_assistant",
    {
        description: "Get a specific Vapi assistant",
        inputSchema: {
            id: z.string()
        }
    },
    async ({ id }) => ({
        content: [{ type: "text", text: JSON.stringify(await vapi.getAssistant(id)) }]
    })
);

server.registerTool(
    "vapi_create_assistant",
    {
        description: "Create a new Vapi assistant",
        inputSchema: {
            name: z.string(),
            model: z.any().optional(),
            voice: z.any().optional(),
            transcriber: z.any().optional(),
            firstMessage: z.string().optional(),
            serverUrl: z.string().optional()
        }
    },
    async (args) => ({
        content: [{ type: "text", text: JSON.stringify(await vapi.createAssistant(args)) }]
    })
);

server.registerTool(
    "vapi_update_assistant",
    {
        description: "Update an existing Vapi assistant",
        inputSchema: {
            id: z.string(),
            data: z.any()
        }
    },
    async ({ id, data }) => ({
        content: [{ type: "text", text: JSON.stringify(await vapi.updateAssistant(id, data)) }]
    })
);

server.registerTool(
    "vapi_delete_assistant",
    {
        description: "Delete a Vapi assistant",
        inputSchema: {
            id: z.string()
        }
    },
    async ({ id }) => ({
        content: [{ type: "text", text: JSON.stringify(await vapi.deleteAssistant(id)) }]
    })
);

server.registerTool(
    "vapi_list_calls",
    {
        description: "List all Vapi calls"
    },
    async () => ({
        content: [{ type: "text", text: JSON.stringify(await vapi.listCalls()) }]
    })
);

server.registerTool(
    "vapi_get_call",
    {
        description: "Get a specific Vapi call",
        inputSchema: {
            id: z.string()
        }
    },
    async ({ id }) => ({
        content: [{ type: "text", text: JSON.stringify(await vapi.getCall(id)) }]
    })
);

server.registerTool(
    "vapi_create_call",
    {
        description: "Initiate a new Vapi call",
        inputSchema: {
            assistantId: z.string(),
            phoneNumberId: z.string().optional(),
            customer: z.any().optional()
        }
    },
    async (args) => ({
        content: [{ type: "text", text: JSON.stringify(await vapi.createCall(args)) }]
    })
);

server.registerTool(
    "vapi_end_call",
    {
        description: "End an active Vapi call",
        inputSchema: {
            id: z.string()
        }
    },
    async ({ id }) => ({
        content: [{ type: "text", text: JSON.stringify(await vapi.endCall(id)) }]
    })
);

server.registerTool(
    "vapi_evaluate_call",
    {
        description: "Evaluate a Vapi call",
        inputSchema: {
            id: z.string()
        }
    },
    async ({ id }) => ({
        content: [{ type: "text", text: JSON.stringify(await vapi.evaluateCall(id)) }]
    })
);

server.registerTool(
    "vapi_list_phone_numbers",
    {
        description: "List all Vapi phone numbers"
    },
    async () => ({
        content: [{ type: "text", text: JSON.stringify(await vapi.listPhoneNumbers()) }]
    })
);

server.registerTool(
    "vapi_get_phone_number",
    {
        description: "Get a specific Vapi phone number",
        inputSchema: {
            id: z.string()
        }
    },
    async ({ id }) => ({
        content: [{ type: "text", text: JSON.stringify(await vapi.getPhoneNumber(id)) }]
    })
);

server.registerTool(
    "vapi_buy_phone_number",
    {
        description: "Buy a new Vapi phone number",
        inputSchema: {
            areaCode: z.string().optional(),
            phoneNumber: z.string().optional(),
            assistantId: z.string().optional()
        }
    },
    async (args) => ({
        content: [{ type: "text", text: JSON.stringify(await vapi.buyPhoneNumber(args)) }]
    })
);

server.registerTool(
    "vapi_import_phone_number",
    {
        description: "Import a phone number to Vapi",
        inputSchema: {
            number: z.string(),
            provider: z.string(),
            providerId: z.string(),
            providerToken: z.string()
        }
    },
    async (args) => ({
        content: [{ type: "text", text: JSON.stringify(await vapi.importPhoneNumber(args)) }]
    })
);

server.registerTool(
    "vapi_list_tools",
    {
        description: "List all Vapi tools"
    },
    async () => ({
        content: [{ type: "text", text: JSON.stringify(await vapi.listTools()) }]
    })
);

server.registerTool(
    "vapi_create_tool",
    {
        description: "Create a new Vapi tool",
        inputSchema: {
            type: z.string(),
            messages: z.array(z.any()).optional(),
            function: z.any().optional(),
            server: z.any().optional()
        }
    },
    async (args) => ({
        content: [{ type: "text", text: JSON.stringify(await vapi.createTool(args)) }]
    })
);

server.registerTool(
    "vapi_list_knowledge_bases",
    {
        description: "List all Vapi knowledge bases"
    },
    async () => ({
        content: [{ type: "text", text: JSON.stringify(await vapi.listKnowledgeBases()) }]
    })
);

server.registerTool(
    "vapi_create_knowledge_base",
    {
        description: "Create a new Vapi knowledge base",
        inputSchema: {
            name: z.string(),
            provider: z.string(),
            config: z.any()
        }
    },
    async (args) => ({
        content: [{ type: "text", text: JSON.stringify(await vapi.createKnowledgeBase(args)) }]
    })
);

server.registerTool(
    "vapi_list_squads",
    {
        description: "List all Vapi squads"
    },
    async () => ({
        content: [{ type: "text", text: JSON.stringify(await vapi.listSquads()) }]
    })
);

server.registerTool(
    "vapi_get_analytics",
    {
        description: "Get Vapi analytics",
        inputSchema: {
            queries: z.array(z.any())
        }
    },
    async (args) => ({
        content: [{ type: "text", text: JSON.stringify(await vapi.getAnalytics(args)) }]
    })
);

server.registerTool(
    "vapi_list_logs",
    {
        description: "List Vapi logs"
    },
    async () => ({
        content: [{ type: "text", text: JSON.stringify(await vapi.listLogs()) }]
    })
);

async function runServer() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

runServer().catch(console.error);
