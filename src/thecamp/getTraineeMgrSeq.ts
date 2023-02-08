import axios from "axios";
import { isNil } from "lodash";
import { Client, Soldier } from "the-camp-lib";

const client = axios.create({
	baseURL: "https://www.thecamp.or.kr/",
});

type Response = {
	resultCd: string;
	iListTotCnt: number;
	iPaperRows: number;
	iCurPage: number;
	iTotPageCnt: number;
	iLimitStartCnt: number;
	listResult: Letter[];
};

type Letter = {
	recvIuid: unknown;
	traineeMgrSeq: number;
	y: string;
	sendIuid: string;
	sendName: string;
	sympathyLetterMgrSeq: number;
	seq: number;
	// title
	sympathyLetterSubject: string;
	statusCd: string;
	tempSaveYn: string;
	statusNm: "접수완료" | string;
	regDate: string;
	regTime: string;
	uptDate: string;
	uptTime: string;
	traineeNm: string;
};

export const getTraineeMgrSeq = async (
	thecamp: Client,
	solider: Soldier,
): Promise<string> => {
	const { cookies } = thecamp;
	if (isNil(cookies)) {
		throw new Error(
			"`.env`에 thecamp 로그인 정보 입력을 확인하세요. 또는 `thecamp.login()`을 호출하세요.",
		);
	}

	const response = await client
		.post<Response>("/consolLetter/selectConsolLetterA.do", undefined, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
				cookie: `${cookies.iuid}; ${cookies.token}`,
			},
			withCredentials: true,
		})
		.then((response) => response.data);

	const letter = response.listResult.find(
		(list) => list.traineeNm === solider.getName(),
	);

	if (isNil(letter)) {
		throw new Error(
			`해당 병사(${solider.getName()})의 첫 인터넷 편지를 찾을 수 없습니다. thecamp.or.kr에서 수동으로 인터넷 편지 하나를 보내주세요.`,
		);
	}

	return letter.traineeMgrSeq.toString();
};
