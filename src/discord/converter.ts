export const usernameToRealName = (username: string): string => {
	switch (username) {
		case "ever0de":
			return "최지석";
		case "NaDa":
			return "전현준";
		case "Frank":
			return "이제우";
		case "재관":
			return "김재관";
		case "한슬":
			return "김한슬";
		case "해성":
			return "이해성";
		case "washi":
			return "코우키";

		default:
			return username;
	}
};
