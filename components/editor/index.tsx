"use client";
import type { ForwardedRef } from "react";
import { basicDark } from "cm6-theme-basic-dark";
import "@mdxeditor/editor/style.css";
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  toolbarPlugin,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  UndoRedo,
  Separator,
  BoldItalicUnderlineToggles,
  CodeToggle,
  ListsToggle,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  InsertCodeBlock,
  diffSourcePlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
} from "@mdxeditor/editor";
import "./dark-editor.css";
import { useTheme } from "next-themes";

interface Props {
  value: string;
  fieldChange: (values: string) => void;
  editorRef: ForwardedRef<MDXEditorMethods> | null;
}

const Editor = ({ value, fieldChange, editorRef, ...props }: Props) => {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? [basicDark] : [];
  return (
    <MDXEditor
      key={resolvedTheme}
      markdown={value}
      className="background-light800_dark200 light-border-2 markdown-editor
       dark-editor w-full border"
      onChange={fieldChange}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        quotePlugin(),
        markdownShortcutPlugin(),
        tablePlugin(),
        imagePlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: "" }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            html: "HTML",
            css: "CSS",
            javascript: "JavaScript",
            typescript: "TypeScript",
            jsx: "JSX (React)",
            tsx: "TSX (React)",
            vue: "Vue",
            python: "Python",
            java: "Java",
            cpp: "C++",
            c: "C",
            csharp: "C#",
            go: "Go",
            rust: "Rust",
            php: "PHP",
            ruby: "Ruby",
            swift: "Swift",
            kotlin: "Kotlin",
            sql: "SQL",
            json: "JSON",
            yaml: "YAML",
            xml: "XML",
            markdown: "Markdown",
            bash: "Bash",
            sh: "Shell",
            powershell: "PowerShell",
            dockerfile: "Dockerfile",
            txt: "Plain Text",
            "": "Unspecified",
          },
          autoLoadLanguageSupport: true,
          codeMirrorExtensions: theme,
        }),
        diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: "" }),
        toolbarPlugin({
          toolbarContents: () => (
            <ConditionalContents
              options={[
                {
                  when: (editor) => editor?.editorType === "codeblock",
                  contents: () => <ChangeCodeMirrorLanguage />,
                },
                {
                  fallback: () => (
                    <>
                      <UndoRedo />
                      <Separator />

                      <BoldItalicUnderlineToggles />
                      <CodeToggle />
                      <Separator />

                      <ListsToggle />
                      <Separator />

                      <CreateLink />
                      <InsertImage />
                      <Separator />

                      <InsertTable />
                      <InsertThematicBreak />
                      <Separator />

                      <InsertCodeBlock />
                    </>
                  ),
                },
              ]}
            />
          ),
        }),
      ]}
      {...props}
      ref={editorRef}
    />
  );
};

export default Editor;
