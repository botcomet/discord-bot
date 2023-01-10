import {
  Client, GatewayIntentBits,
  Partials
} from "discord.js";
import { config } from "dotenv";
import * as discordEvents from "./events";

config();
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.Reaction
  ]
});

client.on("ready", async () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on("messageReactionAdd", discordEvents.onMessageReactionAdd);
client.on("messageReactionRemove", discordEvents.onMessageReactionRemove);

client.login(process.env.TOKEN);
