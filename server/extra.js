// Extra questions for the base courses, plus two additional courses.
export const MORE = {
  html: [
    { q: "Which attribute provides alternative text for an image?", o: ['alt', 'title', 'src', 'href'], a: 0 },
    { q: "Which CSS unit is relative to the root font size?", o: ['em', 'rem', 'px', 'pt'], a: 1 },
    { q: "Which element creates the largest heading?", o: ['<h1>', '<head>', '<header>', '<title>'], a: 0 },
    { q: "What does a media query do?", o: ['Applies styles based on screen conditions', 'Loads images faster', 'Validates forms', 'Adds animations'], a: 0 },
    { q: "Which flexbox property sets the main axis direction?", o: ['flex-direction', 'align-items', 'z-index', 'float'], a: 0 },
    { q: "Which selector targets the element with id menu?", o: ['.menu', '#menu', 'menu', '*menu'], a: 1 }
  ],
  js: [
    { q: "What is the result of '5' + 3 in JavaScript?", o: ['8', '53', 'NaN', 'Error'], a: 1 },
    { q: "Which operator compares both value and type?", o: ['==', '=', '===', '!='], a: 2 },
    { q: "Which method adds an item to the end of an array?", o: ['push', 'pop', 'shift', 'slice'], a: 0 },
    { q: "What does JSON.parse do?", o: ['Converts a JSON string to an object', 'Converts an object to a string', 'Sorts keys', 'Deletes JSON'], a: 0 },
    { q: "Which of these values is falsy?", o: ['"0"', '[]', '0', '{}'], a: 2 },
    { q: "What is a closure?", o: ['A function that remembers variables from its outer scope', 'A kind of loop', 'A syntax error', 'A CSS rule'], a: 0 }
  ],
  react: [
    { q: "What does JSX compile to?", o: ['React.createElement calls', 'Plain HTML strings', 'CSS', 'SQL'], a: 0 },
    { q: "Why do list items need keys?", o: ['To help React track items between renders', 'To style items', 'To sort items', 'To fetch data'], a: 0 },
    { q: "Which hook memoizes an expensive computed value?", o: ['useMemo', 'useRef', 'useId', 'useReducer'], a: 0 },
    { q: "What does an empty dependency array in useEffect mean?", o: ['Run once after the first render', 'Run on every render', 'Never run', 'Run twice always'], a: 0 },
    { q: "How should you update state based on the previous state?", o: ['setCount(c => c + 1)', 'count++', 'count = count + 1', 'this.count += 1'], a: 0 },
    { q: "What does lifting state up mean?", o: ['Moving shared state to the closest common parent', 'Using global CSS', 'Deleting state', 'Using refs'], a: 0 }
  ],
  git: [
    { q: "Which command shows the status of your working directory?", o: ['git status', 'git log', 'git remote', 'git tag'], a: 0 },
    { q: "What does git pull do?", o: ['Fetches and merges remote changes', 'Deletes a branch', 'Creates a tag', 'Stashes changes'], a: 0 },
    { q: "Which file lists patterns Git should ignore?", o: ['.gitignore', '.gitkeep', 'package.json', 'README.md'], a: 0 },
    { q: "How do you create and switch to a new branch?", o: ['git checkout -b name', 'git branch -d name', 'git merge name', 'git init name'], a: 0 },
    { q: "What is a merge conflict?", o: ['Two changes edit the same lines and Git cannot combine them', 'A network error', 'A missing commit message', 'A deleted repository'], a: 0 },
    { q: "Which command undoes a commit by creating a new commit?", o: ['git revert', 'git add', 'git fetch', 'git clone'], a: 0 }
  ]
};

export const NEW_COURSES = [
  { id: 'node', emoji: '🟢', title: 'Node.js & Express', level: 'Intermediate', desc: 'Build REST APIs with Node, Express middleware, JWT auth and password hashing.',
    lessons: [
      { t: 'What is Node.js', c: 'Node.js runs JavaScript outside the browser on the V8 engine. npm installs packages, and ES modules or CommonJS organise code.' },
      { t: 'Express routing and middleware', c: 'Express maps HTTP methods and paths to handlers. Middleware functions receive req, res and next, and run in order.' },
      { t: 'REST APIs and JWT', c: 'REST uses HTTP verbs and status codes. After login the server issues a signed JWT that the client sends on later requests.' } ],
    quiz: [
      { q: "Node.js is best described as…", o: ['A JavaScript runtime built on V8', 'A CSS framework', 'A database', 'A web browser'], a: 0 },
      { q: "What is npm?", o: ['The Node package manager', 'A network process monitor', 'A new programming mode', 'A proxy module'], a: 0 },
      { q: "What is middleware in Express?", o: ['A function with access to req, res and next', 'A database driver', 'A CSS file', 'A template'], a: 0 },
      { q: "Which HTTP method usually creates a resource?", o: ['POST', 'GET', 'HEAD', 'TRACE'], a: 0 },
      { q: "Which status code means Not Found?", o: ['404', '200', '401', '500'], a: 0 },
      { q: "What does JWT stand for?", o: ['JSON Web Token', 'Java Web Tool', 'JavaScript Web Type', 'JSON Wire Transfer'], a: 0 },
      { q: "Why hash passwords with bcrypt?", o: ['So plain passwords are never stored', 'To compress data', 'To encrypt the whole database', 'To speed up login'], a: 0 },
      { q: "Which Express function parses JSON request bodies?", o: ['express.json()', 'express.static()', 'express.Router()', 'express.text()'], a: 0 },
      { q: "What does process.env contain?", o: ['Environment variables', 'Open file handles', 'HTTP headers', 'Installed packages'], a: 0 },
      { q: "Which status code means Unauthorized?", o: ['401', '201', '301', '503'], a: 0 } ] },
  { id: 'mongo', emoji: '🍃', title: 'MongoDB Essentials', level: 'Intermediate', desc: 'Store data as documents, run CRUD queries and model data with Mongoose.',
    lessons: [
      { t: 'Documents and collections', c: 'MongoDB stores JSON-like documents in collections. Every document has a unique _id field.' },
      { t: 'CRUD operations', c: 'Use insertOne, find, updateOne with $set, and deleteOne. Query operators such as $gt and $in filter results.' },
      { t: 'Mongoose and Atlas', c: 'Mongoose adds schemas and validation on top of MongoDB. Atlas is the hosted cloud service with a free tier.' } ],
    quiz: [
      { q: "MongoDB stores data as…", o: ['Documents', 'Rows in tables', 'Plain key-value strings only', 'Spreadsheets'], a: 0 },
      { q: "A MongoDB collection is most similar to a…", o: ['Table in SQL', 'Row in SQL', 'Column in SQL', 'View in SQL'], a: 0 },
      { q: "Which method inserts a single document?", o: ['insertOne', 'addRow', 'push', 'createTable'], a: 0 },
      { q: "Which operator matches values greater than a number?", o: ['$gt', '$more', '$big', '$above'], a: 0 },
      { q: "What is Mongoose?", o: ['An ODM library for MongoDB in Node.js', 'A web server', 'A CSS tool', 'A testing framework'], a: 0 },
      { q: "What is the default unique field on every document?", o: ['_id', 'id', 'key', 'uid'], a: 0 },
      { q: "Which method finds documents matching a filter?", o: ['find', 'select', 'fetch', 'get'], a: 0 },
      { q: "What does an index do?", o: ['Speeds up queries on a field', 'Encrypts data', 'Removes duplicates', 'Backs up data'], a: 0 },
      { q: "Which operator changes fields in updateOne?", o: ['$set', '$put', '$change', '$alter'], a: 0 },
      { q: "MongoDB Atlas is…", o: ['A cloud-hosted MongoDB service', 'A desktop code editor', 'A JavaScript framework', 'A CSS library'], a: 0 } ] }
];
