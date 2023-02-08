import { Config } from "../constant";
import { Ping } from "./command/ping";
import { Send } from "./command/send";
import { REST, Routes } from "discord.js";

const rest = new REST({ version: "10", authPrefix: "Bot" }).setToken(
	Config.discord.token,
);

export const registerCommands = async () => {
	console.log("Started refreshing application (/) commands.");

	await rest.put(
		Routes.applicationGuildCommands(
			Config.discord.clientId,
			Config.discord.guildId,
		),
		{
			body: [Ping.command, Send.command],
		},
	);

	console.log("Successfully reloaded application (/) commands.");
};
