import { auth, currentUser } from "@clerk/nextjs/server";

export default async function user() {
  const { userId } = await auth();

  const user = await currentUser();

  return (
    <div>
      <h1>The user is: </h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      {/* <pre>{JSON.stringify(userId, null, 2)}</pre> */}
    </div>
  );
}
