import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { VapiClient } from "./vapi.js";
import dotenv from "dotenv";

dotenv.config();

console.error("[Vapi MCP] Initializing server...");

const vapi = new VapiClient(process.env.VAPI_API_KEY);

console.error("[Vapi MCP] VapiClient initialized. Registering tools...");

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
            model: z.record(z.any()).optional(),
            voice: z.record(z.any()).optional(),
            transcriber: z.record(z.any()).optional(),
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
            data: z.record(z.any())
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
            customer: z.record(z.any()).optional()
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
    "vapi_get_tool",
    {
        description: "Get a specific Vapi tool",
        inputSchema: {
            id: z.string()
        }
    },
    async ({ id }) => ({
        content: [{ type: "text", text: JSON.stringify(await vapi.getTool(id)) }]
    })
);

server.registerTool(
    "vapi_create_tool",
    {
        description: "Create a new Vapi tool",
        inputSchema: {
            type: z.string(),
            messages: z.array(z.record(z.any())).optional(),
            function: z.record(z.any()).optional(),
            server: z.record(z.any()).optional()
        }
    },
    async (args) => ({
        content: [{ type: "text", text: JSON.stringify(await vapi.createTool(args)) }]
    })
);

server.registerTool(
    "vapi_update_tool",
    {
        description: "Update an existing Vapi tool",
        inputSchema: {
            id: z.string(),
            data: z.record(z.any())
        }
    },
    async ({ id, data }) => ({
        content: [{ type: "text", text: JSON.stringify(await vapi.updateTool(id, data)) }]
    })
);

server.registerTool(
    "vapi_delete_tool",
    {
        description: "Delete a Vapi tool",
        inputSchema: {
            id: z.string()
        }
    },
    async ({ id }) => ({
        content: [{ type: "text", text: JSON.stringify(await vapi.deleteTool(id)) }]
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
    "vapi_get_knowledge_base",
    {
        description: "Get a specific Vapi knowledge base",
        inputSchema: {
            id: z.string()
        }
    },
    async ({ id }) => ({
        content: [{ type: "text", text: JSON.stringify(await vapi.getKnowledgeBase(id)) }]
    })
);

server.registerTool(
    "vapi_create_knowledge_base",
    {
        description: "Create a new Vapi knowledge base",
        inputSchema: {
            name: z.string(),
            provider: z.string(),
            config: z.record(z.any())
        }
    },
    async (args) => ({
        content: [{ type: "text", text: JSON.stringify(await vapi.createKnowledgeBase(args)) }]
    })
);

server.registerTool(
    "vapi_delete_knowledge_base",
    {
        description: "Delete a Vapi knowledge base",
        inputSchema: {
            id: z.string()
        }
    },
    async ({ id }) => ({
        content: [{ type: "text", text: JSON.stringify(await vapi.deleteKnowledgeBase(id)) }]
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
    "vapi_get_squad",
    {
        description: "Get a specific Vapi squad",
        inputSchema: {
            id: z.string()
        }
    },
    async ({ id }) => ({
        content: [{ type: "text", text: JSON.stringify(await vapi.getSquad(id)) }]
    })
);

server.registerTool(
    "vapi_create_squad",
    {
        description: "Create a new Vapi squad",
        inputSchema: {
            name: z.string().optional(),
            members: z.array(z.record(z.any()))
        }
    },
    async (args) => ({
        content: [{ type: "text", text: JSON.stringify(await vapi.createSquad(args)) }]
    })
);

server.registerTool(
    "vapi_update_squad",
    {
        description: "Update an existing Vapi squad",
        inputSchema: {
            id: z.string(),
            data: z.record(z.any())
        }
    },
    async ({ id, data }) => ({
        content: [{ type: "text", text: JSON.stringify(await vapi.updateSquad(id, data)) }]
    })
);

server.registerTool(
    "vapi_delete_squad",
    {
        description: "Delete a Vapi squad",
        inputSchema: {
            id: z.string()
        }
    },
    async ({ id }) => ({
        content: [{ type: "text", text: JSON.stringify(await vapi.deleteSquad(id)) }]
    })
);

server.registerTool(
    "vapi_get_analytics",
    {
        description: "Get Vapi analytics",
        inputSchema: {
            queries: z.array(z.record(z.any()))
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

server.registerTool(
    "vapi_list_workflows",
    {
        description: "List all Vapi workflows"
    },
    async () => ({
        content: [{ type: "text", text: JSON.stringify(await vapi.listWorkflows()) }]
    })
);

server.registerTool(
    "vapi_get_workflow",
    {
        description: "Get a specific Vapi workflow",
        inputSchema: {
            id: z.string()
        }
    },
    async ({ id }) => ({
        content: [{ type: "text", text: JSON.stringify(await vapi.getWorkflow(id)) }]
    })
);

server.registerTool(
    "vapi_create_workflow",
    {
        description: "Create a new Vapi workflow",
        inputSchema: {
            name: z.string(),
            nodes: z.array(z.record(z.any())),
            edges: z.array(z.record(z.any())).optional()
        }
    },
    async (args) => ({
        content: [{ type: "text", text: JSON.stringify(await vapi.createWorkflow(args)) }]
    })
);

server.registerTool(
    "vapi_update_workflow",
    {
        description: "Update an existing Vapi workflow",
        inputSchema: {
            id: z.string(),
            data: z.record(z.any())
        }
    },
    async ({ id, data }) => ({
        content: [{ type: "text", text: JSON.stringify(await vapi.updateWorkflow(id, data)) }]
    })
);

server.registerTool(
    "vapi_delete_workflow",
    {
        description: "Delete a Vapi workflow",
        inputSchema: {
            id: z.string()
        }
    },
    async ({ id }) => ({
        content: [{ type: "text", text: JSON.stringify(await vapi.deleteWorkflow(id)) }]
    })
);

server.registerTool(
    "vapi_chat",
    {
        description: "Send a message to an assistant or continue a chat session",
        inputSchema: {
            assistantId: z.string().optional(),
            sessionId: z.string().optional(),
            input: z.string().optional()
        }
    },
    async (args) => ({
        content: [{ type: "text", text: JSON.stringify(await vapi.chat(args)) }]
    })
);

async function runServer() {
    console.error("[Vapi MCP] Connecting with StdioServerTransport...");
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("[Vapi MCP] Server connected and ready.");
}

runServer().catch(err => {
    console.error("[Vapi MCP] FATAL ERROR during startup:", err);
    process.exit(1);
});
