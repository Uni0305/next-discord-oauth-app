import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "../../../api/discord/oauth";

const { DISCORD_CLIENT_ID: clientId, DISCORD_CLIENT_SECRET: clientSecret } =
  process.env;

const discordAPIAuth = {
  client_id: clientId!,
  client_secret: clientSecret!,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query;

  if (!code) {
    res.status(400).json({ error: "No code provided" });
    return;
  }
  if (typeof code != "string") {
    res.status(400).json({ error: "Code is not a string" });
    return;
  }

  const response = await getToken(discordAPIAuth, code);
  if (response.error) {
    res.status(400).json(response);
    return;
  }

  const json = JSON.stringify(response);
  const authCookie = Buffer.from(json).toString("base64url");
  res.setHeader("Set-Cookie", `auth=${authCookie}; Path=/;`);
  res.redirect("/");
}
