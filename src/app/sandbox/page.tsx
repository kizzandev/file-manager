/*import { auth } from "@clerk/nextjs/server";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { mockFolders } from "@/lib/mock-data";
import { folders_table } from "@/server/db/schema";
import { env } from "@/env";
import { redirect } from "next/navigation";/***/

export default async function Sandbox() {
  return <>{"Sandbox"}</>;
  /*const user = await auth();
  if (!user.userId || user.userId !== env.CLERK_MY_USER_ID) redirect("/");

  const folders = await db
    .select()
    .from(folders_table)
    .where(eq(folders_table.ownerId, user.userId));

  console.log(folders);

  return (
    <div className="flex flex-col gap-4">
      Seed Function
      <form
        action={async () => {
          "use server";

          const user = await auth();
          if (!user.userId) throw new Error("User not found");

          const rootFolder = await db
            .insert(folders_table)
            .values({
              name: "Root",
              ownerId: user.userId,
              parent: null,
            })
            .$returningId();

          const foldersToInsert = mockFolders.map((folder) => ({
            name: folder.name,
            ownerId: user.userId,
            parent: rootFolder[0]!.id,
          }));
          await db.insert(folders_table).values(foldersToInsert);
        }}
      >
        <button type="submit">Seed</button>
      </form>
    </div>
  );/***/
}
