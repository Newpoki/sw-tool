export const SERVERS = {
  GLOBAL: "global",
  KOREA: "korea",
  JAPAN: "japan",
  CHINA: "china",
  ASIA: "asia",
  EUROPE: "europe",
} as const;

export const SERVERS_OPTIONS = {
  GLOBAL: { label: "Global", value: SERVERS.GLOBAL },
  KOREA: { label: "Korea", value: SERVERS.KOREA },
  JAPAN: { label: "Japan", value: SERVERS.JAPAN },
  CHINA: { label: "China", value: SERVERS.CHINA },
  ASIA: { label: "Asia", value: SERVERS.ASIA },
  EUROPE: { label: "Europe", value: SERVERS.EUROPE },
} as const;
