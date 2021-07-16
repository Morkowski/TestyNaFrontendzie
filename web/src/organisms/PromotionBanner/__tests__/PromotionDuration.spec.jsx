import React from "react";
import subMinutes from "date-fns/subMinutes";
import addMinutes from "date-fns/addMinutes";
import { render, screen } from "test-utils";
import { PromotionDuration } from "../PromotionDuration";

const promotion = {
  id: "2",
  name: "Całoroczna promocja",
  description: "Zamów z kodem rabatowym -10%",
  discount: { code: "ALE_RABAT", percentage: 10 },
  dateStart: new Date("2021-01-01"),
  dateEnd: new Date("2021-12-31"),
};

const daysToMinutes = (days) => days * 24 * 60;

describe("<PromotionDuration />", () => {
  beforeEach(() => {
    jest.useFakeTimers("modern");
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it.each`
    humanReadableTimeToPromotionEnd    | minutesToPromotionEnd | format                | expected
    ${"31 days"}                       | ${daysToMinutes(31)}  | ${"'about x months'"} | ${"The promotion runs for about 1 months."}
    ${"30 days"}                       | ${daysToMinutes(30)}  | ${"'about x weeks'"}  | ${"The promotion runs for about 4 weeks."}
    ${"11 days"}                       | ${daysToMinutes(11)}  | ${"'about x weeks'"}  | ${"The promotion runs for about 2 weeks."}
    ${"10 days"}                       | ${daysToMinutes(10)}  | ${"'about x days'"}   | ${"The promotion runs for about 10 days."}
    ${"3 days"}                        | ${daysToMinutes(3)}   | ${"'about x days'"}   | ${"The promotion runs for about 3 days."}
    ${"2 days"}                        | ${daysToMinutes(2)}   | ${"'about x hours'"}  | ${"The promotion runs for about 48 hours."}
    ${"13 hours"}                      | ${13 * 60}            | ${"'about x hours'"}  | ${"The promotion runs for about 13 hours."}
    ${"12 hours"}                      | ${12 * 60}            | ${"'hh:mm:ss'"}       | ${"The promotion runs for about 12 hours."}
    ${"1 minute"}                      | ${1}                  | ${"'hh:mm:ss'"}       | ${"0:1:0"}
  `(
    `returns promotion duration in $format format for promotion which ends in $humanReadableTimeToPromotionEnd`,
    ({ minutesToPromotionEnd, expected }) => {
      jest.setSystemTime(subMinutes(promotion.dateEnd, minutesToPromotionEnd));

      render(<PromotionDuration promotion={promotion} />);

      const promotionText = screen.getByText(expected);
      expect(promotionText).toBeDefined();
    }
  );

  it('returns info about finished promotion', ()=> {
     jest.setSystemTime(addMinutes(promotion.dateEnd, 1));

      render(<PromotionDuration promotion={promotion} />);

      const promotionText = screen.getByText("Promotion already finished.");
      expect(promotionText).toBeDefined();
  })
});
