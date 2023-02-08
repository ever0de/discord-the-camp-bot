import { Config } from "../constant";
import { Client, ClientOptions, GatewayIntentBits } from "discord.js";

const clientOptions: ClientOptions = {
	intents: [GatewayIntentBits.Guilds],
};

export const client = new Client(clientOptions);

export const login = async () => {
	await client.login(Config.discord.token);
};
