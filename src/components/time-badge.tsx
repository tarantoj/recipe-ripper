"use client";

import { Temporal } from "temporal-polyfill";
import { Badge } from "./ui/badge";

export const TimeBadge = ({
  time,
}: {
  time: Temporal.Duration | Temporal.DurationLike | string;
}) => (
  <Badge variant="secondary">
    {Temporal.Duration.from(time).toLocaleString(navigator.language, {
      minute: "numeric",
      hour: "numeric",
    })}
  </Badge>
);
