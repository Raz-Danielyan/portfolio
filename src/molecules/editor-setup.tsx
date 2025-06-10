import { CodeBlock } from "./code-block";

export default function EditorExperience() {
  return (
    <main className="mx-auto text-zinc-100">
      <h1 className="text-4xl sm:text-5xl font-bold mb-8 sm:mb-10 mt-8">
        My Experience with VSCode & Vim
      </h1>

      <section className="mb-12">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
          Starting with VSCode
        </h2>{" "}
        {/* Adjusted heading size */}
        <p className="mb-4 leading-relaxed">
          {" "}
          {/* Added leading-relaxed for better line spacing */}I started my
          coding journey with VSCode. It gave me everything I wanted right from
          the beginning: I could see my files clearly, the code was readable,
          and Prettier was already doing its magic without me configuring
          anything. It was easy, clean, and good enough for a beginner.
        </p>
        <p className="leading-relaxed">
          {" "}
          {/* Added leading-relaxed */}
          But then came the terminal. I didn’t know English well at that point,
          and running commands was painful. Admin permission issues, VSCode’s
          terminal being slower than CMD... So I’d just open CMD in a new
          window. It worked, but if I needed multiple CMDs, it became messy.
          Errors would be hidden behind VSCode, but I could still manage.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
          {" "}
          {/* Adjusted heading size */}
          Custom Snippets and the Pain of Configuration
        </h2>
        <p className="mb-4 leading-relaxed">
          {" "}
          {/* Added leading-relaxed */}
          The real pain began when I tried to implement custom dynamic snippets.
          VSCode’s documentation wasn’t great. Changing design or keybindings
          took 30+ minutes. Each config tweak meant{" "}
          <code>Shift+P &gt; Reload Window</code>. My hand was begging for
          mercy.
        </p>
        <p className="mb-4 leading-relaxed">
          {" "}
          {/* Added leading-relaxed */}
          But I pushed through. I used the HyperSnips extension and managed to
          create this dynamic snippet:
        </p>
        {/* Added overflow-x-auto to prevent horizontal scrolling issues on small screens */}
        {/* Added bg-zinc-800 dark:bg-zinc-900 to pre for better contrast and appearance for code blocks */}
        <pre className="relative code-block overflow-x-auto rounded mb-4 text-sm bg-zinc-800 dark:bg-zinc-900 text-white">
          <CodeBlock
            code={`snippet \\ss(\\.\\w+)(\\..+)?; "Fraction with ()" A
const [\`rv = splitText(m)[0]\`, set\`rv = capitalizeFirstLetter(splitText(m)[0])\`] = useState(${"{1:`rv= splitText(m)[1]||''`}"});$0
endsnippet`}
            language="js"
          />
        </pre>
        <p className="leading-relaxed">
          {" "}
          {/* Added leading-relaxed */}
          This snippet allows me to type <code>space+s+.+text+""+;</code> and
          automatically get <code>const [text, setText] = useState("")</code>.
          Wild.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
          {" "}
          {/* Adjusted heading size */}
          Keybindings for File Management
        </h2>
        <p className="mb-4 leading-relaxed">
          {" "}
          {/* Added leading-relaxed */}I created keybindings for faster file
          handling in the Explorer:
        </p>
        {/* Added overflow-x-auto and background/text colors */}
        <pre className="relative overflow-x-auto text-sm p-4 rounded mb-4 bg-zinc-800 dark:bg-zinc-900 text-white">
          <CodeBlock
            code={`[
  {
    "key": "r",
    "command": "renameFile",
    "when": "filesExplorerFocus && foldersViewVisible && !explorerResourceIsRoot && !explorerResourceReadonly && !inputFocus"
  },
  {
    "key": "a",
    "command": "explorer.newFile",
    "when": "filesExplorerFocus && foldersViewVisible && !explorerResourceIsRoot && !explorerResourceReadonly && !inputFocus"
  }
]`}
            language="js"
          />
        </pre>
        <p className="leading-relaxed">
          {" "}
          {/* Added leading-relaxed */}
          When I focus a file and press <code>r</code>, I can instantly rename
          it. <code>a</code> creates a new file or folder. Fast and efficient.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
          Discovering Neovim
        </h2>{" "}
        <p className="mb-4 leading-relaxed">
          Eventually, I tried Neovim. It took me two weeks just to get basic
          configs running on Windows. Neovim isn’t made for Windows — unless you
          use WSL, expect to install a ton of GNU tools. But the experience
          taught me a lot.
        </p>
        <p className="mb-4 leading-relaxed">
          I learned that optimization matters more than customization if you
          lack the time or energy. Neovim was perfect in two areas: rendering
          and file management. Hot reloads were instant. File creation with{" "}
          <code>oil.lua</code> was pure joy. Only code is visible. Need the file
          explorer? Quickly toggle it.
        </p>
        <p className="leading-relaxed">
          But... Neovim is endless. There’s always something else to fix or
          tweak. And that became the problem. I’d spend days perfecting a setup
          that might never be finished.
        </p>
      </section>

      <section>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
          Returning to VSCode
        </h2>{" "}
        <p className="mb-4 leading-relaxed">
          I came back to VSCode with a new perspective. It’s basically the Vim I
          built — but with a GUI, a left-side file explorer, and all the
          essentials out of the box. It’s far from perfect (file transfer
          between projects still annoys me), but it works.
        </p>
        <p className="leading-relaxed">
          For now, I’m comfortable. Maybe I’ll return to Vim one day. But for
          now, VSCode, with my snippets and bindings, is enough.
        </p>
      </section>
    </main>
  );
}
