type Authorization = {
  client_id: string;
  client_secret: string;
};

export async function getToken(auth: Authorization, code: string) {
  const response = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    body: new URLSearchParams({
      ...auth,
      grant_type: "authorization_code",
      code,
      redirect_uri: "http://localhost:3000/api/oauth2",
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return response.json();
}

export async function refreshToken(auth: Authorization, refresh_token: string) {
  const response = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    body: new URLSearchParams({
      ...auth,
      grant_type: "refresh_token",
      refresh_token,
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return response.json();
}
