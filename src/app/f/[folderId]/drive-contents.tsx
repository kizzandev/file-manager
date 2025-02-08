"use client";

import { Upload, ChevronRight } from "lucide-react";
import { FileRow, FolderRow } from "./file-row";
import type { DB_FileType, DB_FolderType } from "@/server/db/schema";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";

export default function DriveContents(props: {
  files: DB_FileType[];
  folders: DB_FolderType[];
  parents: DB_FolderType[];
  currentFolderId: number;
}) {
  const navigate = useRouter();

  const posthog = usePostHog();

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            {props.parents.map((folder, idx) => (
              <div key={folder.id} className="flex items-center">
                {idx > 0 && (
                  <ChevronRight className="mx-2 text-gray-500" size={16} />
                )}
                <Link
                  href={`/f/${folder.id}`}
                  className="text-gray-300 hover:text-white"
                >
                  {idx === 0 ? "My Drive" : folder.name}
                </Link>
              </div>
            ))}
          </div>
          <div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
        <div className="rounded-lg bg-gray-800 shadow-xl">
          <div className="border-b border-gray-700 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-3">Size</div>
              <div className="col-span-1">Actions</div>
            </div>
          </div>
          <ul>
            {props.folders.map((folder) => (
              <FolderRow key={folder.id} folder={folder} />
            ))}
            {props.files.map((file) => (
              <FileRow key={file.id} file={file} />
            ))}
          </ul>
        </div>
        <Button
          onClick={() => {
            posthog.capture("file_uploading", {
              fileCount: 0,
            });
            alert("Upload functionality would be implemented here");
            navigate.refresh();
          }}
        >
          <Upload /> Upload
        </Button>
      </div>
    </div>
  );
}
