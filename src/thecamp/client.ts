import { Config } from "../constant";
import { Client, Message } from "the-camp-lib";
import { Soldier } from "the-camp-lib";

export const thecamp = new Client();

export const login = async () => {
	await thecamp.login(Config.thecamp.id, Config.thecamp.pw);
};

export const sendMessage = async (
	soldier: Soldier,
	args: {
		sender: string;
		title: string;
		content: string;
	},
): Promise<string> => {
	const { sender, content } = args;
	const title = `[${sender}] ${args.title}`;
	const message = new Message(title, content, soldier);

	return thecamp
		.sendMessage(soldier, message)
		.then(
			() =>
				`${sender}(이)가 **${soldier.getName()}**에게 인터넷편지 전송에 성공하였습니다.\n제목: \`[${title}]\``,
		)
		.catch((error) => `인터넷편지 전송에 실패하였습니다.\n${error}`);
};
