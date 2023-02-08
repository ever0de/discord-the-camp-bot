import { ChatCommand } from "./types";
import {
	CacheType,
	ChatInputCommandInteraction,
	SlashCommandBuilder,
} from "discord.js";

const command = new SlashCommandBuilder()
	.setName("ping")
	.setDescription("Check health of bot");

const execute = async <T extends CacheType>(
	interaction: ChatInputCommandInteraction<T>,
) => {
	await interaction.reply("Pong!");
};

export const Ping: ChatCommand = { command, execute };
