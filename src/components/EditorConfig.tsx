import React, { useEffect } from 'react';
import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/silver/theme';
import 'tinymce/plugins/paste'; // Assuming you use the paste plugin
import cleanContent from '../utils/cleanContent'; // Import your cleaning function

const EditorConfig: React.FC = () => {
  useEffect(() => {
    tinymce.init({
      selector: '#editor',
      plugins: 'paste', // Ensure you include relevant plugins
      setup: (editor) => {
        // Intercept the paste event
        editor.on('paste', (event) => {
          const html = event.clipboardData.getData('text/html');
          const source = detectSource(html); // You should have detectSource imported
          
          // Open the dialog for paste options
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
              { type: 'cancel', text: 'Cancel' },
              { type: 'submit', text: 'Paste', primary: true },
            ],
            onSubmit: (api) => {
              const data = api.getData();
              const cleanedContent = cleanContent(html, source, data.formatting === 'keep');
              api.close();
              // Insert the cleaned content
              editor.insertContent(cleanedContent);
            },
          });

          // Prevent default paste action to allow the user to choose formatting
          event.preventDefault();
        });
      },
    });
  }, []);

  return (
    <textarea id="editor"></textarea> // The TinyMCE editor will be rendered here
  );
};

export default EditorConfig;
