import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { useEffect, useState, useRef } from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Minus,
  Link as LinkIcon,
  Unlink,
  Image as ImageIcon,
  Undo2,
  Redo2,
  RemoveFormatting,
  Sparkles,
  Upload,
  Link2,
  FileImage,
  Check,
} from "lucide-react";

interface TiptapEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
  theme?: "light" | "dark";
}

export function TiptapEditor({
  content,
  onChange,
  placeholder = "Write your blog story, case study, or tutorial here...",
  minHeight = "360px",
  theme = "light",
}: TiptapEditorProps) {
  const [linkInputOpen, setLinkInputOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [imageInputOpen, setImageInputOpen] = useState(false);
  const [imageMode, setImageMode] = useState<"upload" | "url">("upload");
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const isLight = theme === "light";

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-emerald-700 underline underline-offset-4 hover:text-emerald-800 cursor-pointer font-medium",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-xl border border-slate-200 my-6 max-h-[500px] w-full object-cover shadow-md",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: `focus:outline-none min-h-[${minHeight}] px-6 py-5 ${
          isLight
            ? "text-slate-800 font-sans leading-relaxed text-base prose prose-slate max-w-none prose-headings:font-display prose-headings:text-slate-900 prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:mb-4 prose-p:leading-relaxed prose-blockquote:border-l-4 prose-blockquote:border-emerald-600 prose-blockquote:bg-emerald-50/50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:text-slate-700 prose-ul:list-disc prose-ol:list-decimal prose-li:my-1 prose-code:bg-slate-100 prose-code:text-emerald-700 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:p-4 prose-pre:rounded-xl"
            : "text-cream/90 font-sans leading-relaxed text-base prose-invert max-w-none prose-headings:font-display prose-headings:text-cream prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:mb-4 prose-blockquote:border-l-2 prose-blockquote:border-gold prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gold/90 prose-ul:list-disc prose-ol:list-decimal prose-li:my-1 prose-code:bg-white/10 prose-code:text-gold prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-black/50 prose-pre:p-4 prose-pre:rounded-lg"
        }`,
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return (
      <div
        className={`flex h-64 items-center justify-center rounded-xl border ${
          isLight
            ? "border-slate-200 bg-slate-50 text-slate-500"
            : "border-white/10 bg-deep/40 text-cream/60"
        }`}
      >
        <span className="flex items-center gap-2 text-sm font-medium">
          <Sparkles className="h-4 w-4 animate-spin text-emerald-600" /> Loading Rich Editor...
        </span>
      </div>
    );
  }

  const setLink = () => {
    if (!linkUrl) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      setLinkInputOpen(false);
      return;
    }
    const formattedUrl = linkUrl.startsWith("http") ? linkUrl : `https://${linkUrl}`;
    editor.chain().focus().extendMarkRange("link").setLink({ href: formattedUrl }).run();
    setLinkUrl("");
    setLinkInputOpen(false);
  };

  const addImageUrl = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl("");
      setImageInputOpen(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        editor.chain().focus().setImage({ src: result }).run();
        setIsUploading(false);
        setImageInputOpen(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    };
    reader.readAsDataURL(file);
  };

  // Quick stats
  const text = editor.getText();
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const characterCount = text.length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div
      className={`flex flex-col rounded-xl border shadow-xs overflow-hidden ${
        isLight
          ? "border-slate-200 bg-white"
          : "border-white/10 bg-[#0c1410] shadow-2xl"
      }`}
    >
      {/* Sticky Toolbar */}
      <div
        className={`sticky top-0 z-20 flex flex-wrap items-center gap-1 border-b p-2 backdrop-blur-md ${
          isLight
            ? "border-slate-200 bg-slate-50/95 text-slate-700"
            : "border-white/10 bg-[#0f1b15]/95 text-cream"
        }`}
      >
        {/* Headings */}
        <div className="flex items-center gap-0.5 border-r border-slate-200 pr-1.5">
          <button
            type="button"
            title="Heading 1"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all cursor-pointer ${
              editor.isActive("heading", { level: 1 })
                ? isLight
                  ? "bg-slate-900 text-white font-bold shadow-xs"
                  : "bg-gold text-ink font-bold"
                : isLight
                ? "text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
                : "text-cream/80 hover:bg-white/10 hover:text-gold"
            }`}
          >
            <Heading1 className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Heading 2"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all cursor-pointer ${
              editor.isActive("heading", { level: 2 })
                ? isLight
                  ? "bg-slate-900 text-white font-bold shadow-xs"
                  : "bg-gold text-ink font-bold"
                : isLight
                ? "text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
                : "text-cream/80 hover:bg-white/10 hover:text-gold"
            }`}
          >
            <Heading2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Heading 3"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all cursor-pointer ${
              editor.isActive("heading", { level: 3 })
                ? isLight
                  ? "bg-slate-900 text-white font-bold shadow-xs"
                  : "bg-gold text-ink font-bold"
                : isLight
                ? "text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
                : "text-cream/80 hover:bg-white/10 hover:text-gold"
            }`}
          >
            <Heading3 className="h-4 w-4" />
          </button>
        </div>

        {/* Formatting */}
        <div className="flex items-center gap-0.5 border-r border-slate-200 px-1.5">
          <button
            type="button"
            title="Bold (Ctrl+B)"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all cursor-pointer ${
              editor.isActive("bold")
                ? isLight
                  ? "bg-slate-900 text-white font-bold shadow-xs"
                  : "bg-gold text-ink font-bold"
                : isLight
                ? "text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
                : "text-cream/80 hover:bg-white/10 hover:text-gold"
            }`}
          >
            <Bold className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Italic (Ctrl+I)"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all cursor-pointer ${
              editor.isActive("italic")
                ? isLight
                  ? "bg-slate-900 text-white font-bold shadow-xs"
                  : "bg-gold text-ink font-bold"
                : isLight
                ? "text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
                : "text-cream/80 hover:bg-white/10 hover:text-gold"
            }`}
          >
            <Italic className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Underline (Ctrl+U)"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all cursor-pointer ${
              editor.isActive("underline")
                ? isLight
                  ? "bg-slate-900 text-white font-bold shadow-xs"
                  : "bg-gold text-ink font-bold"
                : isLight
                ? "text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
                : "text-cream/80 hover:bg-white/10 hover:text-gold"
            }`}
          >
            <UnderlineIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Strikethrough"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all cursor-pointer ${
              editor.isActive("strike")
                ? isLight
                  ? "bg-slate-900 text-white font-bold shadow-xs"
                  : "bg-gold text-ink font-bold"
                : isLight
                ? "text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
                : "text-cream/80 hover:bg-white/10 hover:text-gold"
            }`}
          >
            <Strikethrough className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Inline Code"
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all cursor-pointer ${
              editor.isActive("code")
                ? isLight
                  ? "bg-slate-900 text-white font-bold shadow-xs"
                  : "bg-gold text-ink font-bold"
                : isLight
                ? "text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
                : "text-cream/80 hover:bg-white/10 hover:text-gold"
            }`}
          >
            <Code className="h-4 w-4" />
          </button>
        </div>

        {/* Lists & Quotes */}
        <div className="flex items-center gap-0.5 border-r border-slate-200 px-1.5">
          <button
            type="button"
            title="Bullet List"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all cursor-pointer ${
              editor.isActive("bulletList")
                ? isLight
                  ? "bg-slate-900 text-white font-bold shadow-xs"
                  : "bg-gold text-ink font-bold"
                : isLight
                ? "text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
                : "text-cream/80 hover:bg-white/10 hover:text-gold"
            }`}
          >
            <List className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Numbered List"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all cursor-pointer ${
              editor.isActive("orderedList")
                ? isLight
                  ? "bg-slate-900 text-white font-bold shadow-xs"
                  : "bg-gold text-ink font-bold"
                : isLight
                ? "text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
                : "text-cream/80 hover:bg-white/10 hover:text-gold"
            }`}
          >
            <ListOrdered className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Blockquote"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all cursor-pointer ${
              editor.isActive("blockquote")
                ? isLight
                  ? "bg-slate-900 text-white font-bold shadow-xs"
                  : "bg-gold text-ink font-bold"
                : isLight
                ? "text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
                : "text-cream/80 hover:bg-white/10 hover:text-gold"
            }`}
          >
            <Quote className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Horizontal Divider"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className={`flex h-8 w-8 items-center justify-center rounded-lg cursor-pointer ${
              isLight
                ? "text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
                : "text-cream/80 hover:bg-white/10 hover:text-gold"
            }`}
          >
            <Minus className="h-4 w-4" />
          </button>
        </div>

        {/* Links & Images */}
        <div className="flex items-center gap-0.5 border-r border-slate-200 px-1.5">
          <button
            type="button"
            title="Insert Link"
            onClick={() => {
              setLinkInputOpen((prev) => !prev);
              setImageInputOpen(false);
              const previousUrl = editor.getAttributes("link")?.["href"];
              if (previousUrl) setLinkUrl(String(previousUrl));
            }}
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all cursor-pointer ${
              editor.isActive("link")
                ? isLight
                  ? "bg-emerald-600 text-white font-bold shadow-xs"
                  : "bg-gold text-ink font-bold"
                : isLight
                ? "text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
                : "text-cream/80 hover:bg-white/10 hover:text-gold"
            }`}
          >
            <LinkIcon className="h-4 w-4" />
          </button>
          {editor.isActive("link") && (
            <button
              type="button"
              title="Remove Link"
              onClick={() => editor.chain().focus().unsetLink().run()}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-red-500 hover:bg-red-50 cursor-pointer"
            >
              <Unlink className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            title="Insert Image (Upload or URL)"
            onClick={() => {
              setImageInputOpen((prev) => !prev);
              setLinkInputOpen(false);
            }}
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all cursor-pointer ${
              imageInputOpen
                ? "bg-emerald-600 text-white font-bold"
                : isLight
                ? "text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
                : "text-cream/80 hover:bg-white/10 hover:text-gold"
            }`}
          >
            <ImageIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Undo / Redo & Clear */}
        <div className="flex items-center gap-0.5 px-1.5">
          <button
            type="button"
            title="Undo"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            className={`flex h-8 w-8 items-center justify-center rounded-lg disabled:opacity-30 cursor-pointer ${
              isLight
                ? "text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
                : "text-cream/80 hover:bg-white/10 hover:text-gold"
            }`}
          >
            <Undo2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Redo"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            className={`flex h-8 w-8 items-center justify-center rounded-lg disabled:opacity-30 cursor-pointer ${
              isLight
                ? "text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
                : "text-cream/80 hover:bg-white/10 hover:text-gold"
            }`}
          >
            <Redo2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Clear Formatting"
            onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
            className={`flex h-8 w-8 items-center justify-center rounded-lg cursor-pointer ${
              isLight
                ? "text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
                : "text-cream/80 hover:bg-white/10 hover:text-gold"
            }`}
          >
            <RemoveFormatting className="h-4 w-4" />
          </button>
        </div>

        {/* Live Word Stats */}
        <div
          className={`ml-auto hidden sm:flex items-center gap-3 text-xs pr-2 ${
            isLight ? "text-slate-400 font-medium" : "text-cream/50"
          }`}
        >
          <span>{wordCount} words</span>
          <span>•</span>
          <span>{readingTime} min read</span>
        </div>
      </div>

      {/* Link Input Floating Banner */}
      {linkInputOpen && (
        <div
          className={`flex items-center gap-2 border-b p-2.5 px-4 animate-in slide-in-from-top-1 ${
            isLight
              ? "border-emerald-200 bg-emerald-50/80"
              : "border-gold/30 bg-[#13221b]"
          }`}
        >
          <LinkIcon
            className={`h-4 w-4 shrink-0 ${
              isLight ? "text-emerald-700" : "text-gold"
            }`}
          />
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="Paste URL (e.g. https://example.com)..."
            className={`flex-1 px-3 py-1.5 text-xs rounded-lg border focus:outline-none ${
              isLight
                ? "bg-white text-slate-800 border-slate-300 placeholder:text-slate-400 focus:border-emerald-600"
                : "bg-black/40 text-cream border-white/10 placeholder:text-cream/40 focus:border-gold"
            }`}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                setLink();
              }
            }}
            autoFocus
          />
          <button
            type="button"
            onClick={setLink}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              isLight
                ? "bg-emerald-700 text-white hover:bg-emerald-800"
                : "bg-gold text-ink hover:bg-gold/90"
            }`}
          >
            Set Link
          </button>
          <button
            type="button"
            onClick={() => setLinkInputOpen(false)}
            className={`text-xs px-2 py-1.5 cursor-pointer ${
              isLight
                ? "text-slate-500 hover:text-slate-800"
                : "text-cream/60 hover:text-cream"
            }`}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Enhanced Image Input Banner (Upload from Computer + URL) */}
      {imageInputOpen && (
        <div
          className={`border-b p-4 animate-in slide-in-from-top-1 ${
            isLight
              ? "border-emerald-200 bg-emerald-50/90 text-slate-800"
              : "border-gold/30 bg-[#13221b] text-cream"
          }`}
        >
          {/* Mode Tabs */}
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1 text-xs">
              <button
                type="button"
                onClick={() => setImageMode("upload")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1 font-bold transition-all cursor-pointer ${
                  imageMode === "upload"
                    ? "bg-emerald-700 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Upload className="h-3.5 w-3.5" />
                <span>Upload from Computer</span>
              </button>

              <button
                type="button"
                onClick={() => setImageMode("url")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1 font-bold transition-all cursor-pointer ${
                  imageMode === "url"
                    ? "bg-emerald-700 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Link2 className="h-3.5 w-3.5" />
                <span>Image Web URL</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setImageInputOpen(false)}
              className="text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              Close
            </button>
          </div>

          {/* Upload From Computer Form */}
          {imageMode === "upload" ? (
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                id="tiptap-image-file-input"
                className="hidden"
              />
              <label
                htmlFor="tiptap-image-file-input"
                className="flex-1 w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-xl border-2 border-dashed border-emerald-400 bg-white p-3 text-xs font-semibold text-emerald-800 hover:bg-emerald-50/50 hover:border-emerald-600 transition-all cursor-pointer shadow-xs"
              >
                <FileImage className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>
                  {isUploading
                    ? "Processing and inserting image..."
                    : "Click to Choose Image File from Computer (JPG, PNG, WebP, GIF)"}
                </span>
              </label>
            </div>
          ) : (
            /* Paste URL Form */
            <div className="flex items-center gap-2">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Paste direct Image URL (e.g. https://images.unsplash.com/...)..."
                className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-800 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addImageUrl();
                  }
                }}
                autoFocus
              />
              <button
                type="button"
                onClick={addImageUrl}
                className="px-4 py-2 text-xs font-bold rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 transition-colors cursor-pointer"
              >
                Embed Image
              </button>
            </div>
          )}
        </div>
      )}

      {/* Rich Editor Content Area */}
      <div
        className={`relative min-h-[360px] cursor-text ${
          isLight ? "bg-white" : "bg-black/20"
        }`}
        onClick={() => editor.chain().focus().run()}
      >
        <EditorContent editor={editor} />
      </div>

      {/* Footer Info */}
      <div
        className={`flex items-center justify-between border-t px-4 py-2 text-[11px] ${
          isLight
            ? "border-slate-100 bg-slate-50 text-slate-400 font-medium"
            : "border-white/10 bg-[#0a120e] text-cream/50"
        }`}
      >
        <div className="flex items-center gap-3">
          <span>TipTap 2.x Pro Editor</span>
          <span>•</span>
          <span>Markdown &amp; Semantic HTML</span>
        </div>
        <div className="flex items-center gap-3">
          <span>{characterCount} chars</span>
          <span>•</span>
          <span>{wordCount} words</span>
        </div>
      </div>
    </div>
  );
}
