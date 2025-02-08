import { auth } from "@clerk/nextjs/server";
import DriveContents from "./drive-contents";
import { QUERIES } from "@/server/db/queries";
import { redirect } from "next/navigation";

export default async function FolderContents(props: {
  params: Promise<{ folderId: string }>;
}) {
  const session = await auth();

  if (!session.userId) {
    return redirect("/sign-in");
  }

  const params = await props.params;

  const parsedFolderID = parseInt(params.folderId);
  if (isNaN(parsedFolderID)) {
    return <div>Invalid folder ID</div>;
  }

  const fileOwnerId = (await QUERIES.getFolderById(parsedFolderID))?.ownerId;

  if (fileOwnerId !== session.userId) {
    return <div>Invalid folder ID</div>;
  }

  const [folders, files, parents] = await Promise.all([
    QUERIES.getFolders(parsedFolderID),
    QUERIES.getFiles(parsedFolderID),
    QUERIES.getAllParentsForFolder(parsedFolderID),
  ]);

  return (
    <DriveContents
      files={files}
      folders={folders}
      parents={parents}
      currentFolderId={parsedFolderID}
    />
  );
}
