import { createServerFn } from "@tanstack/react-start";

const payload = {
  country: "FR",
  lang: "fr",
  server: "europe",
  hiveid: "Newpoki",
  coupon: "123456",
} as const;

const headers = {
  Accept: "application/json, text/javascript, */*; q=0.01",
  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  Origin: "https://event.withhive.com",
  Referer: "https://event.withhive.com/ci/smon/evt_coupon",
  "User-Agent": "Mozilla/5.0",
  "X-Requested-With": "XMLHttpRequest",
};

export const addServerCoupon = createServerFn({ method: "POST" })
  .inputValidator((params) => params)
  .handler(async ({ data }) => {
    const body = new URLSearchParams(payload);

    const response = await fetch(
      "https://event.withhive.com/ci/smon/evt_coupon/useCoupon",
      {
        method: "POST",
        body,
        headers,
      },
    );

    const json = await response.json();

    return json;
  });
