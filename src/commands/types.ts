import { SlashCommandBuilder, CommandInteraction } from "discord.js";

interface SlashCommand {
  data: SlashCommandBuilder;
  execute(interaction: CommandInteraction): Promise<void>;
}

export { SlashCommand };
