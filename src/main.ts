import { client as discord, login as discordLogin } from "./discord/client";
import { CommandList } from "./discord/command";
import { registerCommands } from "./discord/register";
import { login as thecampLogin } from "./thecamp/client";
import { fromPairs, isNil } from "lodash";

const main = async () => {
	await registerCommands();

	discord.once("ready", (client) => {
		console.log(`Logged in as ${client.user.tag}!`);
	});

	const commandNameList = fromPairs(
		CommandList.map(({ command, execute }) => [command.name, execute]),
	);
	discord.on("interactionCreate", async (interaction) => {
		if (!interaction.isCommand()) return;
		if (!interaction.isChatInputCommand()) return;

		const { commandName } = interaction;

		const executor = commandNameList[commandName];
		if (isNil(executor)) {
			await interaction.reply("알 수 없는 명령어입니다.");
			return;
		}

		await executor(interaction);
	});

	await thecampLogin();
	await discordLogin();
};

main().catch((err) => {
	console.error(err);
	process.exitCode = 1;
});
