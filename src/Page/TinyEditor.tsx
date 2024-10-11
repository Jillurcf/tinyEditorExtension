// import React, { useRef } from 'react';
// import { Editor } from '@tinymce/tinymce-react';
// import customPastePlugin from '../plugins/customPastePlugin';

// export default function TinyEditor() {
//     const editorRef = useRef<Editor | null>(null);
//   return (
//     <Editor
//       apiKey='2gzadf10i29jky1uxr0jpne9em8rlqkskfpem2bt736efibw'
//       init={{
//         plugins: [
//           // Core editing features
//           'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
//           // Your account includes a free trial of TinyMCE premium features
//           // Try the most popular premium features until Oct 25, 2024:
//           'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown',
//         ],
//         toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
//         tinycomments_mode: 'embedded',
//         tinycomments_author: 'Author name',
//         mergetags_list: [
//           { value: 'First.Name', title: 'First Name' },
//           { value: 'Email', title: 'Email' },
//         ],
//         ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
//       }}
//       initialValue="Welcome to TinyMCE!"
//     />
//   );
// }






import React, { useRef } from 'react';
import { Editor as TinyMCEEditor } from '@tinymce/tinymce-react';
import customPastePlugin from '../plugins/customPastePlugin';

const MyEditor: React.FC = () => {
  const editorRef = useRef<any>(null);

  return (
    <TinyMCEEditor
      apiKey='2gzadf10i29jky1uxr0jpne9em8rlqkskfpem2bt736efibw'
     
      onInit={( editor) => (editorRef.current = editor)}
      initialValue="Welcome to TinyMCE!"
      init={{
        height: 500,
        menubar: true,
        tinymceScriptSrc: '/tinymce/tinymce.min.js',
        plugins: [
          // Core editing features
          'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
          // Premium features (ensure you have the necessary licenses)
          'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography',
          'inlinecss', 'markdown',
          'customPaste', // Register your custom paste plugin
        ],
        toolbar:
          'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat | help',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' },
        ],
        ai_request: ( respondWith: any) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
        setup: (editor: any) => {
          // Register the custom paste plugin
          customPastePlugin(editor);
        },
        // Optional: Additional configurations
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
      }}
    />
  );
};

export default MyEditor;
