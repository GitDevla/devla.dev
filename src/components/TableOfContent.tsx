function headerLevel(header: string) {
  return header.match(/^#{1,6}/)![0].length;
}

function indentBasedOnHeader(header: string) {
  let level = headerLevel(header) - 1;
  if (level === 0) return "";
  if (level === 1) return "ml-4";
  if (level === 2) return "ml-8";
  if (level === 3) return "ml-12";
  if (level === 4) return "ml-16";
  if (level === 5) return "ml-20";
  if (level === 6) return "ml-24";
}

function stripHeader(header: string) {
  return header.replace(/^#{1,6} /, "");
}

function headerToId(header: string) {
  header = stripHeader(header);
  header = header.replace(/ /g, "-").replace(/[^a-zA-Z0-9-]/g, "");
  return header.toLocaleLowerCase();
}

function headersToTree(headers: string[]) {
  let tree = [];
  let stack: any[] = [];
  for (let header of headers) {
    let level = headerLevel(header);
    let node = { header: stripHeader(header), children: [] };
    if (level === 1) {
      tree.push(node);
      stack = [node];
    } else {
      let parent = stack[level - 2];
      parent.children.push(node);
      stack[level - 1] = node;
    }
  }
  return tree;
}

function renderTree(tree: any) {
  return (
    <ul>
      {tree.map((node: any) => (
        <li key={node.header}>
          <a href={`#${headerToId(node.header)}`}>{node.header}</a>
          {node.children.length > 0 && renderTree(node.children)}
        </li>
      ))}
    </ul>
  );
}

export default function TableOfContent({ markdown }: { markdown: string }) {
  const headerRegex = /^#{1,6} .*$/gm;
  const headers = Array.from(
    markdown.matchAll(headerRegex),
    (match) => match[0],
  );
  const tree = headersToTree(headers);
  return <ul className="tree">{headers && renderTree(tree)}</ul>;
}