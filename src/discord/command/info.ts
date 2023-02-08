import { SOLDIER, getSoldier as fetchSoldier } from "../../thecamp/soldier";
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
	.setName("info")
	.setDescription("훈련병 정보를 확인합니다.");

const execute = async <T extends CacheType>(
	interaction: ChatInputCommandInteraction<T>,
) => {
	const name = interaction.options.getString("name");
	if (name === null) {
		await interaction.reply("훈련병 이름을 입력해주세요.");
		return;
	}
	const soldier = await fetchSoldier(name);
	if (soldier === undefined) {
		await interaction.reply("훈련병을 등록해주세요.");
		return;
	}

	await interaction.reply(
		`**${soldier.getName()}**: ${soldier.getTraineeMgrSeq()}`,
	);
};

export const Info: ChatCommand = { command, execute };
