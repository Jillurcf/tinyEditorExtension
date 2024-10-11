// src/plugins/customPastePlugin.ts

import { Editor } from 'tinymce';
import detectSource from '../utils/detectSource';
import cleanContent from '../utils/cleanContent';

/**
 * Custom Paste Plugin for TinyMCE.
 * Intercepts paste events to detect source and clean content accordingly.
 * @param editor - The TinyMCE editor instance.
 */
const customPastePlugin = (editor: Editor) => {
  editor.on('paste_preprocess', (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const html = clipboardData.getData('text/html');
    const text = clipboardData.getData('text');

    if (html) {
      const source = detectSource(html);

      // Prevent default paste action
      e.preventDefault();

      // Open a dialog for user to choose formatting options
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
          // Insert the cleaned content
          editor.insertContent(cleanedContent || text);
        },
      });
    }
  });
};

export default customPastePlugin;
