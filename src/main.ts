import { client as discord, login as discordLogin } from "./discord/client";
import { Ping } from "./discord/command/ping";
import { Send } from "./discord/command/send";
import { registerCommands } from "./discord/register";
import { login as thecampLogin } from "./thecamp/client";

const main = async () => {
	await registerCommands();

	discord.once("ready", (client) => {
		console.log(`Logged in as ${client.user.tag}!`);
	});

	discord.on("interactionCreate", async (interaction) => {
		if (!interaction.isCommand()) return;
		if (!interaction.isChatInputCommand()) return;

		const { commandName } = interaction;

		switch (commandName) {
			case "ping":
				await Ping.execute(interaction);
				break;
			case "send":
				await Send.execute(interaction);
				break;
		}
	});

	await thecampLogin();
	await discordLogin();
};

main().catch((err) => {
	console.error(err);
	process.exitCode = 1;
});
