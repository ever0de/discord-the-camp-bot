import { sendMessage } from "../../thecamp/client";
import { SOLDIER, getSoldier as fetchSoldier } from "../../thecamp/soldier";
import { usernameToRealName } from "../converter";
import { ChatCommand } from "./types";
import {
	CacheType,
	ChatInputCommandInteraction,
	SlashCommandBuilder,
} from "discord.js";

const command = new SlashCommandBuilder()
	.addStringOption((option) =>
		option
			.setName("name")
			.setDescription("훈련병 이름")
			.addChoices(
				...Object.keys(SOLDIER).map((name) => ({ name, value: name })),
			),
	)
	.addStringOption((option) =>
		option.setName("title").setDescription("인터넷 편지 제목"),
	)
	.addStringOption((option) =>
		option.setName("content").setDescription("인터넷 편지 내용(1,500자 제한)"),
	)
	.setName("send")
	.setDescription("훈련병들에게 인터넷 편지를 보내주세요");

const execute = async <T extends CacheType>(
	interaction: ChatInputCommandInteraction<T>,
) => {
	const { username } = interaction.user;
	const sender = usernameToRealName(username);

	const name = interaction.options.getString("name");
	if (name === null) {
		await interaction.reply("훈련병 이름을 입력해주세요.");
		return;
	}
	const title = interaction.options.getString("title");
	if (title === null) {
		await interaction.reply("편지 제목을 입력해주세요.");
		return;
	}
	const content = interaction.options.getString("content");
	if (content === null) {
		await interaction.reply("편지 내용을 입력해주세요.");
		return;
	}

	const soldier = await fetchSoldier(name);
	if (soldier === undefined) {
		await interaction.reply("훈련병 이름을 확인해주세요.");
		return;
	}
	console.log(
		`${sender}(이)가 ${name}에게 제목(${title})으로 인터넷 편지를 보냅니다.`,
	);
	const reason = await sendMessage(soldier, {
		title,
		content,
		sender,
	});

	await interaction.reply(reason);
};

export const Send: ChatCommand = { command, execute };
