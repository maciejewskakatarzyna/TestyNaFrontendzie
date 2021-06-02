import { getPromotionDuration } from "../getPromotionDuration";
import { PromotionDurationType } from "../../types/PromotionDurationType";

test("should returns duration in months for durations longer than 30 days", () => {
  const result = getPromotionDuration(
    new Date("2021-02-10"),
    new Date("2021-06-01")
  );

  expect(result.value).toEqual(4);
  expect(result.type).toEqual(PromotionDurationType.months);
});

test("should returns duration in weeks for durations longer than 10 days and shorter than 30", () => {
  const result = getPromotionDuration(
    new Date("2021-02-01"),
    new Date("2021-02-21")
  );

  expect(result.value).toEqual(3);
  expect(result.type).toEqual(PromotionDurationType.months);
});
