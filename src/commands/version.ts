import {
  SlashCommandBuilder,
  CommandInteraction,
  EmbedBuilder
} from "discord.js";
import { readFileSync } from "fs";

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
        new EmbedBuilder()
          .setTitle(`BotComet v${packageJson.version}`)
          .setColor("#555555")
          .setTimestamp()
          .setFooter({
            text: `BotComet ${process.env.BETA ? "Beta" : "Stable"}`
          })
      ]
    });
  }
};
