import { useState, useEffect } from "react";
import { Content, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import {
  MenuButtonBold,
  MenuButtonItalic,
  MenuButtonRedo,
  MenuButtonUndo,
  MenuButtonBulletedList,
  MenuButtonOrderedList,
  MenuButtonAlignLeft,
  MenuButtonAlignCenter,
  MenuButtonAlignRight,
  MenuButtonAlignJustify,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  RichTextEditorProvider,
  RichTextField,
} from "mui-tiptap";
import { Box, SxProps, Typography } from "@mui/material";

export function CustomTextEditor({
  initialValue = "",
  onChange,
  label,
  sx,
}: {
  initialValue: Content | undefined;
  onChange: (value: string) => void;
  label?: string;
  sx?: SxProps;
}) {
  const [content, setContent] = useState(initialValue);
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: initialValue,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);
      onChange && onChange(html);
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <Box sx={sx}>
      {label && (
        // <Typography
        //   sx={{
        //     mb: 1,
        //     color: editor?.isFocused ? "primary.main" : "neutrals.200",
        //   }}
        // >
        //   {label}
        // </Typography>
        <p className="text-[#414651] font-medium text-[14px] mb-2 mt-4">
          {label}
        </p>
      )}
      <RichTextEditorProvider editor={editor}>
        <RichTextField
          controls={
            <MenuControlsContainer>
              <MenuButtonUndo />
              <MenuButtonRedo />
              <MenuSelectHeading />
              <MenuDivider />
              <MenuButtonBold />
              <MenuButtonItalic />
              <MenuDivider />
              <MenuButtonAlignLeft />
              <MenuButtonAlignCenter />
              <MenuButtonAlignRight />
              <MenuButtonAlignJustify />
              <MenuDivider />
              <MenuButtonBulletedList />
              <MenuButtonOrderedList />
              <MenuDivider />
            </MenuControlsContainer>
          }
        />
      </RichTextEditorProvider>
    </Box>
  );
}
