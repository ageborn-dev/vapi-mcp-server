# Vapi MCP Server

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

I've packed this server with over 20 tools. Here’s the breakdown of what your AI can actually do:

* **Assistants**: Full CRUD (Create, Read, Update, Delete) support for your voice bots.
* **Calls**: You can start calls, end them, and get full transcripts or evaluations.
* **Phone Numbers**: Buy new numbers or import existing ones from Twilio/Vonage without leaving the chat.
* **Knowledge & Tools**: Manage the "brains" and webhooks that power your assistants.
* **Squads**: Handle multi-assistant handoffs and complex architectures.
* **Data**: Pull analytics, cost reports, and logs for debugging.

## How to Integrate with Antigravity

To make this server available to the agent in your Antigravity environment, follow these exact steps:

### 1. Open the MCP Configuration

The configuration is managed globally within the Antigravity IDE.

1. In the Antigravity editor, go to the **Agent Pane** (typically top right).
2. Click the **Three-Dot Menu** (Additional Options).
3. Select **MCP Servers** -> **Manage MCP Servers**.
4. Click **View raw config**. This will open the official `mcp_config.json` file in your editor.

### 2. Add the Vapi Server

Add the following entry inside the `"mcpServers"` object. Make sure to use absolute paths.

```json
{
  "mcpServers": {
    "vapi": {
      "command": "node",
      "args": ["path of the instalation/vapi-mcp-server/build/index.js"],
      "env": {
        "VAPI_API_KEY": "your_private_api_key_here"
      }
    }
  }
}
```

### 3. Save and Refresh

1. **Save** the `mcp_config.json` file.
2. Go back to the **Manage MCP Servers** view in the Agent Pane.
3. Click the **Refresh** button.
4. The "vapi" server should now appear in the list with all 20+ tools enabled.

### 🚀 Usage

Once registered, you can just tell the agent: *"List my Vapi assistants"* or *"Create a call with..."* and it will use these tools directly.

---
Built with Love ❤️ and ☕ by **Ageborn Dev**
