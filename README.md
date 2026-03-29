# Vapi MCP Server

[![SafeSkill 60/100](https://img.shields.io/badge/SafeSkill-60%2F100_Use%20with%20Caution-orange)](https://safeskill.dev/scan/ageborn-dev-vapi-mcp-server)

Hey there! This is a custom Model Context Protocol (MCP) server designed specifically for the Vapi Voice AI platform. I built this to bridge the gap between AI models and Vapi's infrastructure, allowing agents to actually manage voice bots and phone calls instead of just talking about them.

This project was built and is maintained by **Ageborn Dev**.

## What is this for?

Basically, if you're using Claude Desktop or any other MCP-compatible client, you can plug this server in and give your AI "admin rights" over your Vapi dashboard. It can create assistants, trigger outbound calls, buy phone numbers, and check your analytics directly through the chat interface.

## Quick Setup

Getting this running is pretty straightforward, but you need the right keys.

### 🔑 Understanding Vapi API Keys

Vapi provides two types of keys in your dashboard. It's important to use the right one:

1. **Private API Key (Bearer Token)**:
    * **What it's for**: Full server-side access. This is what this MCP server needs to manage your assistants, initiate calls, and pull analytics.
    * **Where to find it**: Go to [dashboard.vapi.ai](https://dashboard.vapi.ai), click on **Organization Settings**, and look for the **API Keys** tab. You'll see your "Private Key" or "Bearer Token" there.
    * **Security**: Never share this key. It grants total control over your account.

2. **Public Key**:
    * **What it's for**: Used strictly for client-side integrations (like embedding a voice widget on a website or in a mobile app).
    * **Usage**: You **do not** need this for the MCP server.

### 🚀 Installation & OS Setup

1. **Clone and Install**:

   ```bash
   npm install
   ```

2. **Configure Your Keys**:

   Depending on your system, here is how you make sure the server sees your API key:

   * **Windows (PowerShell)**:

       ```powershell
       $env:VAPI_API_KEY = "your_private_key_here"
       # To make it permanent, add it to your System Environment Variables via Settings.
       ```

   * **Mac / Linux (Terminal)**:

       ```bash
       export VAPI_API_KEY="your_private_key_here"
       # Add this to your ~/.zshrc or ~/.bashrc to keep it after restart.
       ```

   Alternatively, just create a `.env` file in the root directory:

   ```bash
   cp .env.example .env
   ```

3. **Build & Start**:

   ```bash
   npm run build
   npm start
   ```

## The Toolset

This server is packed with over 30 advanced tools that map directly to the latest Vapi 2026 platform architecture. Here is a breakdown of what your AI can actually do:

* **Assistants**: Full CRUD (Create, Read, Update, Delete) support for your voice bots (supporting the latest Vapi Voices collection).
* **Calls**: Start calls, end them, and run detailed AI evaluations natively.
* **Phone Numbers**: Buy new numbers or seamlessly import existing ones from Twilio/Vonage and other providers.
* **Knowledge & Tools**: Deploy and manage the custom server functions, webhooks, and tool nodes that power your assistants.
* **Squads**: Handle multi-assistant handoffs and build complex conversational architectures.
* **Chat & Sessions**: Full CRUD for Vapi chat sessions, allowing you to natively test and chat with your assistants without initiating a phone call.
* **Workflows**: Generate entire Vapi workflows using AI directly from your IDE or chat client.
* **Diagnostics & Data**: Pull campaign analytics, cost reports, and deep diagnostic *artifacts* from completed calls—reflecting Vapi's updated 2026 observability system.
* **Support**: File support tickets directly with the Vapi team.

## How to Integrate with your AI Agent

Since this server is built on the standard Model Context Protocol (MCP), you can attach it to **any** MCP-compatible AI client (such as Claude Desktop, Cursor, or your preferred IDE/Agent environment).

### 1. Configure the Server

Most MCP clients rely on a standard `mcp_config.json` file (or sometimes a UI menu) to attach local servers.

Add the following entry to your configuration file (make sure to replace the placeholder paths with your actual absolute paths on your machine):

```json
{
  "mcpServers": {
    "vapi": {
      "command": "node",
      "args": ["/absolute/path/to/vapi-mcp-server/build/index.js"],
      "env": {
        "VAPI_API_KEY": "your_private_api_key_here"
      }
    }
  }
}
```

### 2. Save and Restart

Save your configuration and restart or refresh your AI client.

### 🚀 Usage

Once registered and authenticated, you can just naturally ask your AI agent: *"List my Vapi assistants"* or *"Start a Vapi chat session..."* and the agent will securely utilize this backend to execute your commands directly!

---
Built with Love ❤️ and ☕ by **Ageborn Dev**
