import { EmbedBuilder } from "discord.js";

function createEmbed() {
  return new EmbedBuilder()
    .setFooter({
      text: `BotComet ${process.env.BETA ? "Beta" : "Stable"}`
    });
}

export default createEmbed;
