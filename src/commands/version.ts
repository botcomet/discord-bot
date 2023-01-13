import {
  SlashCommandBuilder,
  CommandInteraction
} from "discord.js";
import { readFileSync } from "fs";
import createEmbed from "../config/embeds";

const packageJson = JSON.parse(
  readFileSync("./package.json", "utf-8")
);

const data = new SlashCommandBuilder()
  .setName("version")
  .setDescription("Get the current bot version");

export default {
  data,
  async execute(interaction: CommandInteraction) {
    await interaction.reply({
      embeds: [
        createEmbed()
          .setTitle(`BotComet v${packageJson.version}`)
          .setColor("#555555")
          .setTimestamp()
      ]
    });
  }
};
