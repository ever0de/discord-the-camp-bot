import dotenv from "dotenv";
import _ from "lodash";

dotenv.config({
	path: ".env",
});

const getEnv = (key: string): string => {
	const value = process.env[key];

	if (_.isNil(value)) {
		throw new Error(`not found env: ${key}`);
	}

	return value;
};

export const Config = {
	discord: {
		token: getEnv("DISCORD_TOKEN"),
		clientId: getEnv("DISCORD_CLIENT_ID"),
		guildId: getEnv("DISCORD_GUILD_ID"),
		// // 1. Send Messages
		// // 2. Read Message History
		// // 3. Add Reactions
		// permission: 67648,
	},
	thecamp: {
		id: getEnv("THECAMP_ID"),
		pw: getEnv("THECAMP_PW"),
	},
} as const;
