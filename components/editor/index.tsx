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
  type Translation,
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

const translation: Translation = (key, defaultValue, interpolations = {}) => {
  const labels: Record<string, string> = {
    "toolbar.link": "插入链接",
    "toolbar.image": "插入图片",
    "toolbar.table": "插入表格",
    "toolbar.thematicBreak": "插入分隔线",
    "toolbar.codeBlock": "插入代码块",
    "toolbar.admonition": "插入提示框",
    "toolbar.undo": "撤销 {{shortcut}}",
    "toolbar.redo": "重做 {{shortcut}}",
    "toolbar.bulletedList": "项目符号列表",
    "toolbar.numberedList": "编号列表",
    "toolbar.checkList": "任务列表",
    "toolbar.richText": "富文本模式",
    "toolbar.diffMode": "差异模式",
    "toolbar.source": "源码模式",
    "toolbar.inlineCode": "行内代码",
    "toolbar.removeInlineCode": "移除行内代码",
    "toolbar.bold": "加粗",
    "toolbar.removeBold": "移除加粗",
    "toolbar.italic": "斜体",
    "toolbar.removeItalic": "移除斜体",
    "toolbar.underline": "下划线",
    "toolbar.removeUnderline": "移除下划线",
    "toolbar.superscript": "上标",
    "toolbar.removeSuperscript": "移除上标",
    "toolbar.subscript": "下标",
    "toolbar.removeSubscript": "移除下标",
    "toolbar.blockTypes.paragraph": "段落",
    "toolbar.blockTypes.quote": "引用",
    "toolbar.blockTypes.heading": "标题 {{level}}",
    "toolbar.blockTypeSelect.selectBlockTypeTooltip": "选择块类型",
    "toolbar.blockTypeSelect.placeholder": "块类型",
    "toolbar.toggleGroup": "切换分组",
    "codeBlock.language": "代码语言",
    "createLink.url": "链接地址",
    "createLink.urlPlaceholder": "输入或粘贴 URL",
    "createLink.text": "链接文本",
    "createLink.textTooltip": "将显示在链接上的文本",
    "createLink.title": "链接标题",
    "createLink.titleTooltip": "鼠标悬停时显示的链接标题",
    "createLink.saveTooltip": "保存链接",
    "createLink.cancelTooltip": "取消",
    "dialog.close": "关闭",
  };

  const translated = labels[key] ?? defaultValue;
  return Object.entries(interpolations).reduce(
    (text, [name, value]) => text.replace(`{{${name}}}`, String(value)),
    translated,
  );
};

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
      translation={translation}
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
