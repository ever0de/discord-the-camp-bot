import {
	CacheType,
	ChatInputCommandInteraction,
	SlashCommandBuilder,
} from "discord.js";

export type ChatCommand = {
	command: SlashCommandBuilder;
	execute: <T extends CacheType>(
		interaction: ChatInputCommandInteraction<T>,
	) => Promise<void>;
};
