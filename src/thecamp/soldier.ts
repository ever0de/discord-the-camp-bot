import { thecamp } from "./client";
import { getTraineeMgrSeq } from "./getTraineeMgrSeq";
import fs from "fs";
import { fromPairs, isNil } from "lodash";
import path from "path";
import { Soldier, SoldierRelationship, SoldierUnitName } from "the-camp-lib";

type SoldierJson = {
	[name: string]: {
		birth: string;
		enterDate: string;
		unitName: SoldierUnitName;
	};
};

const soldierJson: SoldierJson = (() => {
	const PATH = path.join(__dirname, "../../soldier.json");
	const text = fs.readFileSync(PATH, "utf8");

	return JSON.parse(text);
})();

export const SOLDIER = fromPairs(
	Object.entries(soldierJson).map(([name, { birth, enterDate, unitName }]) => {
		const soldier = new Soldier(
			name,
			birth,
			enterDate,
			"예비군인/훈련병",
			"육군",
			unitName,
			SoldierRelationship.FAN,
		);

		return [name, soldier];
	}),
);

export const getSoldier = async (
	name: string,
): Promise<Soldier | undefined> => {
	const soldier = SOLDIER[name];
	if (isNil(soldier)) {
		return undefined;
	}

	if (isNil(soldier.getTraineeMgrSeq())) {
		console.log(`fetch traineeMgrSeq for ${name}`);

		const mgrSeq = await getTraineeMgrSeq(thecamp, soldier);
		soldier.setTraineeMgrSeq(mgrSeq);

		console.log(`set traineeMgrSeq for ${name}: ${mgrSeq}`);
	}

	return soldier;
};
