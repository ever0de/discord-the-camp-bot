import fs from "fs";
import { fromPairs } from "lodash";
import path from "path";
import * as thecamp from "the-camp-lib";
import { SoldierUnitName } from "the-camp-lib";

type SoldierJson = {
	[name: string]: {
		birth: string;
		enterDate: string;
		unitName: SoldierUnitName;
		traineeMgrSeq: string;
	};
};

const soldierJson: SoldierJson = (() => {
	const PATH = path.join(__dirname, "../../soldier.json");
	const text = fs.readFileSync(PATH, "utf8");

	return JSON.parse(text);
})();

export const Soldier = fromPairs(
	Object.entries(soldierJson).map(
		([name, { birth, enterDate, unitName, traineeMgrSeq }]) => {
			const soldier = new thecamp.Soldier(
				name,
				birth,
				enterDate,
				"예비군인/훈련병",
				"육군",
				unitName as SoldierUnitName,
				thecamp.SoldierRelationship.FAN,
			);
			soldier.setTraineeMgrSeq(traineeMgrSeq);

			return [name, soldier];
		},
	),
);

export const getSoldier = (name: string): thecamp.Soldier | undefined => {
	return Soldier[name];
};
