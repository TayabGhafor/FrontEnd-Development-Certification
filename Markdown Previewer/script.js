import { marked } from "https://esm.sh/marked"; // Use named import for marked

const { useState } = React;

// Default markdown content
const defaultMarkdown = `# Welcome to the Markdown Previewer!
## Subheading Example
[This is a link](https://www.example.com)

Inline code example: \`<div></div>\`

\`\`\`
// Code block example:
function example() {
  console.log("Hello, world!");
}
\`\`\`

- List item 1
- List item 2
- List item 3

> Blockquote example

**Bold text**

![Image example](https://via.placeholder.com/150)
`;

function App() {
  const [markdown, setMarkdown] = useState(defaultMarkdown);

  // Handle text changes in the editor
  const handleChange = (event) => {
    setMarkdown(event.target.value);
  };

  return (
    <div>
      <header>
        <h1>Markdown Previewer</h1>
      </header>
      <div className="container">
        <textarea
          id="editor"
          value={markdown}
          onChange={handleChange}
          placeholder="Type your markdown here..."
        />
        <div
          id="preview"
          dangerouslySetInnerHTML={{
            __html: marked(markdown, { breaks: true }),
          }}
        ></div>
      </div>
    </div>
  );
}

// Render the app
ReactDOM.render(<App />, document.getElementById("root"));
