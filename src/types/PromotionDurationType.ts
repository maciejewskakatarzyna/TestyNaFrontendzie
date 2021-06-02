import { Time } from "./Time";

export enum PromotionDurationType {
  time,
  hours,
  days,
  weeks,
  months,
}

export type PromotionDurationOutput = {
  value: number | Time;
  type: PromotionDurationType;
};
