import SoldierJson from "../../soldier.json";
import { fromPairs } from "lodash";
import * as thecamp from "the-camp-lib";
import { SoldierUnitName } from "the-camp-lib";

export const Soldier = fromPairs(
	Object.entries(SoldierJson).map(
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
