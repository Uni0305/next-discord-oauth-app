import type { NextPage } from "next";
import Image from "next/image";
import cookies from "next-cookies";
import { useEffect, useState } from "react";
import * as discord from "../api/discord/user";

const Home: NextPage = ({ auth }) => {
  const [user, setUser] = useState();
  const [authInfo, setAuthInfo] = useState(auth);

  useEffect(() => {
    if (!auth) return;
    discord.getUser(auth).then(setUser);
    discord.getCurrentAuthorization(auth).then(setAuthInfo);
  }, [auth]);

  if (!auth)
    return (
      <div>
        <p>Not logged in</p>
      </div>
    );
  if (!user) return <div>Loading...</div>;

  const { id, username, avatar } = user;
  return (
    <div>
      <Image
        src={`https://cdn.discordapp.com/avatars/${id}/${avatar}`}
        alt={username}
        width={64}
        height={64}
      />
      <h2>Hello, {username}!</h2>
      <details>
        <summary>User Information</summary>
        <pre lang="json">{JSON.stringify(user, null, 4)}</pre>
      </details>
      <details>
        <summary>Authorization Information</summary>
        <pre lang="json">{JSON.stringify(authInfo, null, 4)}</pre>
      </details>
    </div>
  );
};

Home.getInitialProps = async (context) => {
  const { auth: authCookie } = cookies(context);
  if (!authCookie) return { auth: undefined };

  const auth = JSON.parse(
    Buffer.from(authCookie, "base64url").toString("utf8")
  );
  return { auth };
};

export default Home;
