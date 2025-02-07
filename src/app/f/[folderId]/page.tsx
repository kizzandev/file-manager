import DriveContents from "./drive-contents";
import { QUERIES } from "@/server/db/queries";

export default async function FolderContents(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;

  const parsedFolderID = parseInt(params.folderId);
  if (isNaN(parsedFolderID)) {
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
