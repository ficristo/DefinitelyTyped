import * as React from 'react';
import EmailEditor, {
  Design,
  FileInfo,
  FileUploadDoneCallback,
  HtmlExport,
} from 'react-email-editor';

const TOOLS_CONFIG = {
  image: {
    enabled: true,
    position: 1,
    data: {
      alt: 'this is a test alt text',
    },
  },
};

class App extends React.Component {
  private readonly editorRef = React.createRef<EmailEditor>();

  private readonly handleLoad = () => {
    if (this.editorRef.current) {
      this.editorRef.current.loadDesign({ body: { rows: [] } });
      this.editorRef.current.addEventListener('design:updated', () =>
        console.log('design has been updated'),
      );
      this.editorRef.current.registerCallback(
        'image',
        (file: FileInfo, done: FileUploadDoneCallback) =>
          done({
            progress: 100,
            url: `http://example.com/${file.attachments[0].name}`,
          }),
      );
      this.editorRef.current.setMergeTags([
        { name: '{{newTestTag}}', value: 'New Test Tag Value' },
      ]);
    }
  }

  private readonly handleClick = () => {
    if (this.editorRef.current) {
      this.editorRef.current.saveDesign((data: Design) =>
        console.log('saved design', data),
      );
      this.editorRef.current.exportHtml(({ design, html }: HtmlExport) => {
        console.log('exported design', design);
        console.log('exported HTML: ', html);
      });
    }
  }

  render(): React.ReactNode {
    return (
      <>
        <EmailEditor
          ref={this.editorRef}
          style={{ margin: 20 }}
          minHeight={640}
          options={{
            displayMode: 'web',
            projectId: 1,
            locale: 'ru-RU',
            appearance: {
              theme: 'dark',
              panels: {
                tools: {
                  dock: 'right',
                },
              },
            },
            user: {
              id: 1,
              name: 'John Doe',
              email: 'john.doe@acme.com',
            },
            mergeTags: [{ name: '{{testTag}}', value: 'Test Tag Value' }],
            designTags: {
              current_user_name: 'John Doe',
            },
            designTagsConfig: {
              delimeter: ['[[', ']]'],
            },
            tools: TOOLS_CONFIG,
            blocks: [],
            editor: {
              minRows: 1,
              maxRows: 10,
            },
            safeHtml: true,
            customJS: [],
            customCSS: [],
            features: {
              preview: true,
              imageEditor: false,
              undoRedo: true,
            },
          }}
          tools={TOOLS_CONFIG}
          appearance={{
            theme: 'dark',
            panels: {
              tools: {
                dock: 'right',
              },
            },
          }}
          projectId={1}
          onLoad={this.handleLoad}
        />
        <button onClick={this.handleClick}>save all</button>
      </>
    );
  }
}

export default App;
