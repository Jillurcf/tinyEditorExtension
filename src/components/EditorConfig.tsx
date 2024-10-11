// src/components/MyEditor.tsx

import React, { useEffect } from 'react';
import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/silver/theme';
import 'tinymce/plugins/paste'; // Ensure the paste plugin is included
import cleanContent from '../utils/cleanContent'; // Import your cleaning function
import detectSource from '../utils/detectSource';

const EditorConfig: React.FC = () => {
  useEffect(() => {
    tinymce.init({
      selector: '#editor',
      height: 500,
      menubar: true,
      plugins: 'paste', // Include other plugins as needed
      toolbar:
        'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help',
      setup: (editor) => {
        // Intercept the paste_preprocess event
        editor.on('pastepreprocess', (e) => {
          // Access the clipboard data safely
          const clipboardData = e.clipboardData;
          if (!clipboardData) {
            // Fallback to plain text if clipboardData is null
            const text = e.content.text || '';
            editor.insertContent(text);
            return;
          }

          const html = clipboardData.getData('text/html');
          const text = clipboardData.getData('text');

          // Detect the source of the pasted content
          const source = detectSource(html);

          // Open a dialog for paste options
          editor.windowManager.open({
            title: 'Paste Options',
            body: {
              type: 'panel',
              items: [
                {
                  type: 'selectbox',
                  name: 'formatting',
                  label: 'Formatting',
                  items: [
                    { text: 'Keep Formatting', value: 'keep' },
                    { text: 'Remove Formatting', value: 'remove' },
                  ],
                },
              ],
            },
            buttons: [
              {
                type: 'cancel',
                text: 'Cancel',
              },
              {
                type: 'submit',
                text: 'Paste',
                primary: true,
              },
            ],
            onSubmit: (api) => {
              const data = api.getData();
              const keepFormatting = data.formatting === 'keep';
              const cleanedContent = cleanContent(html, source, keepFormatting);
              api.close();
              // Insert the cleaned content or plain text based on user's choice
              editor.insertContent(cleanedContent || text);
            },
          });

          // Prevent the default paste action to allow custom handling
          e.preventDefault();
        });
      },
      // Optional: Additional configurations
      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
    });

    // Cleanup on unmount
    return () => {
      tinymce.remove('#editor');
    };
  }, []);

  return (
    <textarea id="editor">Welcome to TinyMCE!</textarea> // The TinyMCE editor will be rendered here
  );
};

export default EditorConfig;

