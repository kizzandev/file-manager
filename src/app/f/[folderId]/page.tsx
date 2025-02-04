import DriveContents from "@/app/drive-contents";
import {
  getAllParentsForFolder,
  getFiles,
  getFolders,
} from "@/server/db/queries";

export default async function FolderContents(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;

  const parsedFolderID = parseInt(params.folderId);
  if (isNaN(parsedFolderID)) {
    return <div>Invalid folder ID</div>;
  }

  const [folders, files, parents] = await Promise.all([
    getFolders(parsedFolderID),
    getFiles(parsedFolderID),
    getAllParentsForFolder(parsedFolderID),
  ]);

  return <DriveContents files={files} folders={folders} parents={parents} />;
}
