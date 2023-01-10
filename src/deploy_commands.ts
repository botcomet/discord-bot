import {
  REST, Routes,
  RESTPostAPIChatInputApplicationCommandsJSONBody
} from "discord.js";
import * as fs from "fs";
import { config } from "dotenv";
import { SlashCommand } from "./commands/types";

config();

let token: string = process.env.TOKEN!;
let clientID: string = process.env.CLIENT_ID!;
if (process.env.BETA) {
  token = process.env.BETA_TOKEN!;
  clientID = process.env.BETA_CLIENT_ID!;
}

const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
// Grab all the command files from the commands directory you created earlier
const commandFiles = fs.readdirSync("./dist/commands").filter(file => file.endsWith(".js"));

// Grab the SlashCommandBuilder#toJSON() output of each command"s data for deployment
async function loadCommands() {
  for (const file of commandFiles) {
    const command: SlashCommand = await import(`./commands/${file}`).then(m => m.default);
    commands.push(command.data.toJSON());
  }
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: "10" }).setToken(token);

// and deploy your commands!
(async () => {
  await loadCommands();
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    // The put method is used to fully refresh all commands in the guild with the current set
    await rest.put(
      Routes.applicationCommands(clientID),
      { body: commands },
    );

    console.log(`Successfully reloaded ${commands.length} application (/) commands.`);
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
