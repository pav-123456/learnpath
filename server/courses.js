export const COURSES = [
  { id: 'html', emoji: '🧱', title: 'HTML & CSS Basics', level: 'Beginner', desc: 'Structure pages with semantic HTML and style them with modern CSS.',
    lessons: [
      { t: 'Semantic HTML', c: 'Elements like header, nav, main and footer describe the meaning of content, which helps accessibility and SEO.' },
      { t: 'The CSS box model', c: 'Every element is a box: content, padding, border and margin. box-sizing: border-box makes sizing predictable.' },
      { t: 'Flexbox and Grid', c: 'Flexbox lays out items in one dimension; Grid handles rows and columns together. Use both for responsive layouts.' } ],
    quiz: [
      { q: 'Which tag best represents the main navigation links?', o: ['<div>', '<nav>', '<section>', '<span>'], a: 1 },
      { q: 'Which part of the box model sits between content and border?', o: ['Margin', 'Outline', 'Padding', 'Gap'], a: 2 },
      { q: 'Which CSS feature is designed for two-dimensional layouts?', o: ['Grid', 'Float', 'Inline-block', 'Table-cell'], a: 0 },
      { q: 'What does box-sizing: border-box change?', o: ['Adds shadows', 'Width includes padding and border', 'Hides overflow', 'Removes margins'], a: 1 } ] },
  { id: 'js', emoji: '⚡', title: 'JavaScript Essentials', level: 'Beginner', desc: 'Variables, functions, arrays and async code: the core of modern JS.',
    lessons: [
      { t: 'Variables and types', c: 'Use const by default and let when a value changes. JS has primitives (string, number, boolean) and objects.' },
      { t: 'Functions and arrays', c: 'Arrow functions are concise. map, filter and reduce transform arrays without mutating them.' },
      { t: 'Promises and async/await', c: 'Promises represent future values. async/await lets you write asynchronous code that reads top to bottom.' } ],
    quiz: [
      { q: 'Which keyword declares a variable that cannot be reassigned?', o: ['var', 'let', 'const', 'static'], a: 2 },
      { q: 'Which array method returns a new array of transformed items?', o: ['forEach', 'map', 'push', 'splice'], a: 1 },
      { q: 'What does await do inside an async function?', o: ['Pauses until a promise settles', 'Creates a thread', 'Cancels the promise', 'Loops forever'], a: 0 },
      { q: 'typeof null returns…', o: ['"null"', '"undefined"', '"object"', '"number"'], a: 2 } ] },
  { id: 'react', emoji: '⚛️', title: 'React Fundamentals', level: 'Intermediate', desc: 'Build interactive UIs with components, props, state and hooks.',
    lessons: [
      { t: 'Components and props', c: 'Components are functions that return UI. Props pass data down from parent to child.' },
      { t: 'State with useState', c: 'State holds values that change over time. Updating state re-renders the component.' },
      { t: 'Effects with useEffect', c: 'useEffect runs side effects such as fetching data or timers, and can return a cleanup function.' } ],
    quiz: [
      { q: 'How does data flow between React components?', o: ['Child to parent via props', 'Parent to child via props', 'Siblings via props', 'Through the DOM'], a: 1 },
      { q: 'Which hook stores local component state?', o: ['useEffect', 'useRef', 'useState', 'useMemo'], a: 2 },
      { q: 'What is the cleanup function in useEffect for?', o: ['Styling', 'Releasing timers and listeners', 'Routing', 'Typing props'], a: 1 },
      { q: 'What triggers a re-render?', o: ['State or props change', 'Opening devtools', 'Resizing the window only', 'Console logs'], a: 0 } ] },
  { id: 'git', emoji: '🌿', title: 'Git & GitHub', level: 'Beginner', desc: 'Track changes, branch safely, and collaborate with pull requests.',
    lessons: [
      { t: 'Commits and history', c: 'A commit is a snapshot with a message. Small, focused commits make history easy to read and revert.' },
      { t: 'Branching and merging', c: 'Branches let you work in isolation. Merge or rebase them back once the work is reviewed.' },
      { t: 'Pull requests', c: 'A pull request proposes changes for review before they land on the main branch.' } ],
    quiz: [
      { q: 'Which command records staged changes?', o: ['git push', 'git commit', 'git clone', 'git fetch'], a: 1 },
      { q: 'Why use a feature branch?', o: ['To isolate work', 'To delete history', 'To speed up the internet', 'To lock the repo'], a: 0 },
      { q: 'What does a pull request enable?', o: ['Code review before merging', 'Automatic deploys only', 'Deleting forks', 'Renaming commits'], a: 0 },
      { q: 'Which command downloads a repository?', o: ['git init', 'git add', 'git clone', 'git stash'], a: 2 } ] }
];

