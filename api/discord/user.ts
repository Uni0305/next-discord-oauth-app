type Authorization = {
  access_token: string;
  token_type: string;
};

export async function getUser({ access_token, token_type }: Authorization) {
  const response = await fetch("https://discord.com/api/users/@me", {
    method: "GET",
    headers: {
      Authorization: `${token_type} ${access_token}`,
    },
  });
  return await response.json();
}

export async function getCurrentAuthorization({
  access_token,
  token_type,
}: Authorization) {
  const response = await fetch("https://discord.com/api/oauth2/@me", {
    method: "GET",
    headers: {
      Authorization: `${token_type} ${access_token}`,
    },
  });
  return await response.json();
}
