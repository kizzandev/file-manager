import { db } from "@/server/db";
import { files_table, folders_table } from "@/server/db/schema";
import DriveContents from "@/app/drive-contents";
import { eq } from "drizzle-orm";

export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;

  const parsedFolderID = parseInt(params.folderId);
  if (isNaN(parsedFolderID)) {
    return <div>Invalid folder ID</div>;
  }

  const folders = await db
    .select()
    .from(folders_table)
    .where(eq(folders_table.parent, parsedFolderID));

  const files = await db
    .select()
    .from(files_table)
    .where(eq(files_table.parent, parsedFolderID));

  return <DriveContents files={files} folders={folders} />;
}
