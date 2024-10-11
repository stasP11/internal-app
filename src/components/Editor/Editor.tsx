import { Box } from "@mui/material";
import type { EditorOptions } from "@tiptap/core";
import "./Editor.scss";
import { useCallback, useEffect, useState } from "react";
import {
  LinkBubbleMenu,
  RichTextEditor,
  TableBubbleMenu,
  insertImages,
} from "mui-tiptap";
import EditorMenuControls from "./EditorMenuControls";
import useExtensions from "./useExtensions";
import fileToBase64 from "utils/fileToBase64";

function fileListToImageFiles(fileList: FileList): File[] {
  // You may want to use a package like attr-accept
  // (https://www.npmjs.com/package/attr-accept) to restrict to certain file
  // types.
  return Array.from(fileList).filter((file) => {
    const mimeType = (file.type || "").toLowerCase();
    return mimeType.startsWith("image/");
  });
}

export default function Editor({ rteRef, content, onComponentLoaded }: any) {
  const extensions = useExtensions({
    placeholder: "Add your own content here...",
  });

  useEffect(() => {
    if (rteRef.current) {
      console.log(rteRef, "test");
      if (onComponentLoaded) {
        onComponentLoaded(true);
      }
    }
  }, [rteRef]);

  const [isEditable, setIsEditable] = useState(true);
  const [showMenuBar, setShowMenuBar] = useState(true);

  const handleNewImageFiles = useCallback(
    async (files: File[], insertPosition?: number): Promise<void> => {
      if (!rteRef.current?.editor) {
        return;
      }

      // Convert each file to a Base64 data URL using the updated fileToBase64 function
      const attributesForImageFiles = await Promise.all(
        files.map(async (file) => ({
          src: await fileToBase64(file), // This will return a string formatted like canvas.toDataURL()
          alt: file.name,
        }))
      );

      console.log(attributesForImageFiles, "reader attributesForImageFiles");
      // Insert the images into the editor
      insertImages({
        images: attributesForImageFiles,
        editor: rteRef.current.editor,
        position: insertPosition,
      });
    },
    []
  );

  // Allow for dropping images into the editor
  const handleDrop: NonNullable<EditorOptions["editorProps"]["handleDrop"]> =
    useCallback(
      (view, event, _slice, _moved) => {
        if (!(event instanceof DragEvent) || !event.dataTransfer) {
          return false;
        }

        const imageFiles = fileListToImageFiles(event.dataTransfer.files);
        if (imageFiles.length > 0) {
          const insertPosition = view.posAtCoords({
            left: event.clientX,
            top: event.clientY,
          })?.pos;

          handleNewImageFiles(imageFiles, insertPosition);

          // Return true to treat the event as handled. We call preventDefault
          // ourselves for good measure.
          event.preventDefault();
          return true;
        }

        return false;
      },
      [handleNewImageFiles]
    );

  // Allow for pasting images
  const handlePaste: NonNullable<EditorOptions["editorProps"]["handlePaste"]> =
    useCallback(
      (_view, event, _slice) => {
        if (!event.clipboardData) {
          return false;
        }

        const pastedImageFiles = fileListToImageFiles(
          event.clipboardData.files
        );
        if (pastedImageFiles.length > 0) {
          handleNewImageFiles(pastedImageFiles);
          // Return true to mark the paste event as handled. This can for
          // instance prevent redundant copies of the same image showing up,
          // like if you right-click and copy an image from within the editor
          // (in which case it will be added to the clipboard both as a file and
          // as HTML, which Tiptap would otherwise separately parse.)
          return true;
        }

        // We return false here to allow the standard paste-handler to run.
        return false;
      },
      [handleNewImageFiles]
    );

  return (
    <>
      <Box
        sx={{
          // An example of how editor styles can be overridden. In this case,
          // setting where the scroll anchors to when jumping to headings. The
          // scroll margin isn't built in since it will likely vary depending on
          // where the editor itself is rendered (e.g. if there's a sticky nav
          // bar on your site).
          "& .ProseMirror": {
            "& h1, & h2, & h3, & h4, & h5, & h6": {
              scrollMarginTop: showMenuBar ? 50 : 0,
            },
          },
        }}
      >
        <RichTextEditor
          ref={rteRef}
          extensions={extensions}
          content={content}
          editable={isEditable}
          editorProps={{
            handleDrop: handleDrop,
            handlePaste: handlePaste,
          }}
          renderControls={() => <EditorMenuControls />}
          RichTextFieldProps={{
            // The "outlined" variant is the default (shown here only as
            // example), but can be changed to "standard" to remove the outlined
            // field border from the editor
            MenuBarProps: {
              hide: !showMenuBar,
            },
          }}
        >
          {() => (
            <>
              <LinkBubbleMenu />
              <TableBubbleMenu />
            </>
          )}
        </RichTextEditor>
      </Box>
    </>
  );
}
