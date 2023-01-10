import type {
  MessageReaction, PartialMessageReaction,
  User, PartialUser
} from "discord.js";
import roles from "../config/roles";

async function onMessageReactionRemove(reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) {
  if (user.bot) return;
  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch (error) {
      console.error("Something went wrong when fetching the message: ", error);
      return;
    }
  }

  if (reaction.message.id === "1062361716899459072") {
    const emoji = (reaction.emoji.name as string);
    if (emoji in roles) {
      const role = roles[emoji];
      const member = reaction.message.guild?.members.cache.get(user.id);
      if (member) {
        if (member.roles.cache.has(role)) {
          member.roles.remove(role);
        }
      }
    }
  }
}

export default onMessageReactionRemove;
