import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "./code-block";

export default function ReactReconciliationArticle() {
  return (
    <article className="prose lg:prose-xl px-6 py-10 max-w-4xl mx-auto text-foreground">
      <h1 className="text-3xl font-bold mb-4">
        Understanding React Reconciliation
      </h1>
      <p className="text-lg">
        React Reconciliation is the process React uses to update the DOM
        efficiently. It compares the previous and current Virtual DOM trees and
        updates only what's necessary.
      </p>

      <Card className="my-6">
        <CardContent className="space-y-4">
          <h2 className="text-2xl font-semibold">
            What Triggers Reconciliation?
          </h2>
          <p>
            React triggers reconciliation whenever component state or props
            change. React then determines what changes need to be applied to the
            real DOM.
          </p>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mt-8 mb-4">A Simple Example</h2>
      <p>
        Here's a basic component that triggers reconciliation when the count
        changes:
      </p>
      <CodeBlock
        code={`function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}`}
        language="tsx"
      />

      <Card className="my-6">
        <CardContent className="space-y-4">
          <h3 className="text-lg font-semibold">Behind the Scenes</h3>
          <p>When you click the button, React:</p>
          <ul className="list-disc list-inside">
            <li>Creates a new Virtual DOM</li>
            <li>Diffs it with the old Virtual DOM</li>
            <li>Applies minimal DOM mutations</li>
          </ul>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mt-8 mb-4">
        Key Rules in Reconciliation
      </h2>
      <ul className="list-disc list-inside">
        <li>
          <strong>Same Component Type:</strong> React reuses the DOM node.
        </li>
        <li>
          <strong>Different Component Type:</strong> React unmounts and mounts a
          new node.
        </li>
        <li>
          <strong>Keys in Lists:</strong> Keys help React identify which items
          have changed.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-4">Why Keys Matter</h2>
      <p>
        Keys are critical in list rendering. Without keys, React will re-render
        all items.
      </p>
      <CodeBlock
        code={`{items.map((item, index) => (
  <li key={item.id}>{item.name}</li>
))}`}
        language="tsx"
      />

      <Card className="my-6 bg-indigo-50 border-l-4 border-indigo-400">
        <CardContent>
          <p className="text-indigo-800">
            Best Practice: Always provide stable keys like IDs when rendering
            lists.
          </p>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mt-8 mb-4">Summary</h2>
      <p>
        React Reconciliation is what makes React fast. Understanding how React
        compares elements and manages updates helps you write more optimized
        components.
      </p>
    </article>
  );
}
