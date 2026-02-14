import fetch from "node-fetch";

export class VapiClient {
    private apiKey: string;
    private baseUrl: string = "https://api.vapi.ai";

    constructor(apiKey?: string) {
        this.apiKey = apiKey || "";
    }

    private async request(method: string, endpoint: string, body?: any) {
        if (!this.apiKey) {
            throw new Error("VAPI_API_KEY environment variable is required. Please check your MCP configuration.");
        }

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method,
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Content-Type": "application/json"
            },
            body: body ? JSON.stringify(body) : undefined
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Vapi API error: ${response.status} ${response.statusText} - ${errorText}`);
        }

        return response.json();
    }

    async listAssistants() {
        return this.request("GET", "/assistant");
    }

    async getAssistant(id: string) {
        return this.request("GET", `/assistant/${id}`);
    }

    async createAssistant(data: any) {
        return this.request("POST", "/assistant", data);
    }

    async updateAssistant(id: string, data: any) {
        return this.request("PATCH", `/assistant/${id}`, data);
    }

    async deleteAssistant(id: string) {
        return this.request("DELETE", `/assistant/${id}`);
    }

    async listCalls() {
        return this.request("GET", "/call");
    }

    async getCall(id: string) {
        return this.request("GET", `/call/${id}`);
    }

    async createCall(data: any) {
        return this.request("POST", "/call", data);
    }

    async endCall(id: string) {
        return this.request("POST", `/call/${id}/end`);
    }

    async evaluateCall(id: string) {
        return this.request("POST", `/call/${id}/evaluate`);
    }

    async listPhoneNumbers() {
        return this.request("GET", "/phone-number");
    }

    async getPhoneNumber(id: string) {
        return this.request("GET", `/phone-number/${id}`);
    }

    async createPhoneNumber(data: any) {
        return this.request("POST", "/phone-number", data);
    }

    async updatePhoneNumber(id: string, data: any) {
        return this.request("PATCH", `/phone-number/${id}`, data);
    }

    async deletePhoneNumber(id: string) {
        return this.request("DELETE", `/phone-number/${id}`);
    }

    async buyPhoneNumber(data: any) {
        return this.request("POST", "/phone-number/buy", data);
    }

    async importPhoneNumber(data: any) {
        return this.request("POST", "/phone-number/import", data);
    }

    async listTools() {
        return this.request("GET", "/tool");
    }

    async getTool(id: string) {
        return this.request("GET", `/tool/${id}`);
    }

    async createTool(data: any) {
        return this.request("POST", "/tool", data);
    }

    async updateTool(id: string, data: any) {
        return this.request("PATCH", `/tool/${id}`, data);
    }

    async deleteTool(id: string) {
        return this.request("DELETE", `/tool/${id}`);
    }

    async listKnowledgeBases() {
        return this.request("GET", "/knowledge-base");
    }

    async getKnowledgeBase(id: string) {
        return this.request("GET", `/knowledge-base/${id}`);
    }

    async createKnowledgeBase(data: any) {
        return this.request("POST", "/knowledge-base", data);
    }

    async deleteKnowledgeBase(id: string) {
        return this.request("DELETE", `/knowledge-base/${id}`);
    }

    async listSquads() {
        return this.request("GET", "/squad");
    }

    async getSquad(id: string) {
        return this.request("GET", `/squad/${id}`);
    }

    async createSquad(data: any) {
        return this.request("POST", "/squad", data);
    }

    async updateSquad(id: string, data: any) {
        return this.request("PATCH", `/squad/${id}`, data);
    }

    async deleteSquad(id: string) {
        return this.request("DELETE", `/squad/${id}`);
    }

    async getAnalytics(data: any) {
        return this.request("POST", "/analytics", data);
    }

    async listLogs() {
        return this.request("GET", "/log");
    }

    async listWorkflows() {
        return this.request("GET", "/workflow");
    }

    async getWorkflow(id: string) {
        return this.request("GET", `/workflow/${id}`);
    }

    async createWorkflow(data: any) {
        return this.request("POST", "/workflow", data);
    }

    async updateWorkflow(id: string, data: any) {
        return this.request("PATCH", `/workflow/${id}`, data);
    }

    async deleteWorkflow(id: string) {
        return this.request("DELETE", `/workflow/${id}`);
    }

    async chat(data: any) {
        return this.request("POST", "/chat", data);
    }
}
