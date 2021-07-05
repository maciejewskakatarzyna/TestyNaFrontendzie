import { getTheBestPromotionForDate } from "../getTheBestPromotionForDate";
import { Discount } from "../../types/Discount";

describe("getTheBestPromotionForDate", () => {
  const today = new Date("2021-07-05");
  const promotions = [
    {
      id: 1,
      name: "Summer promotion",
      dateStart: new Date("2021-06-21"),
      dateEnd: new Date("2021-08-31"),
      discount: {
        code: `Summer`,
        percentage: 10,
      },
    },
    {
      id: 2,
      name: "Summer special promotion",
      dateStart: new Date("2021-07-01"),
      dateEnd: new Date("2021-08-31"),
      discount: {
        code: `Special`,
        percentage: 20,
      },
    },
    {
      id: 3,
      name: "Back to school",
      dateStart: new Date("2021-08-15"),
      dateEnd: new Date("2021-09-30"),
      discount: {
        code: `School`,
        percentage: 30,
      },
    },
    {
      id: 4,
      name: "New Year promotion",
      dateStart: new Date("2021-12-20"),
      dateEnd: new Date("2021-12-31"),
      discount: {
        code: `NewYear`,
        percentage: 40,
      },
    },
  ];

  it("should return the best promotion for a given date", () => {
    const theBestPromotionForDate = getTheBestPromotionForDate(
      today,
      promotions
    );
    expect(theBestPromotionForDate).toEqual(promotions[1]);
  });

  it("should return null when there is no available promotion", () => {
    const theBestPromotionForDate = getTheBestPromotionForDate(today, []);
    expect(theBestPromotionForDate).toEqual(null);
  });
});