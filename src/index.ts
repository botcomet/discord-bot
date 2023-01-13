import {
  Client, ClientOptions,
  Collection, GatewayIntentBits,
  Partials
} from "discord.js";
import { config } from "dotenv";
import { readdirSync } from "fs";
import { join } from "path";
import type { SlashCommand } from "./commands/_types";

const __dirname = "./dist";

class BotCometClient extends Client {
  commands: Collection<string, SlashCommand>;

  constructor(options: ClientOptions) {
    super(options);
    this.commands = new Collection<string, SlashCommand>();
  }
}

config();
const client: BotCometClient = new BotCometClient({
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

async function registerCommands() {
  const commandFiles = readdirSync(
    join(__dirname, "commands")
  ).filter((file) => file.endsWith(".js") && !(file[0] === "_"));

  for (const file of commandFiles) {
    const command: SlashCommand = await import(
      `./commands/${file}`
    ).then((m) => m.default);
    client.commands.set(command.data.name, command);
  }
}

client.on("ready", async () => {
  await registerCommands();
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

// client.on("messageReactionAdd", discordEvents.onMessageReactionAdd);
// client.on("messageReactionRemove", discordEvents.onMessageReactionRemove);

client.login(process.env.BETA_TOKEN);
