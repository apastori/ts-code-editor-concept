# Code Editor Concept

This project is a web-based code editor that allows users to write, edit, and execute code in various languages directly in the browser. It provides a simple and intuitive interface for testing code snippets and viewing the output in real-time.

## Features

- **Code Execution**: Execute code in different languages and see the results instantly.
- **Language Selector**: Support for multiple languages.
- **Real-time Output**: View the output of your code as it runs.
- **Error Handling**: Displays errors from the code execution to help with debugging.
- **Responsive Design**: The editor is designed to work on different screen sizes.

## Tech Stack

This project is built with a modern and robust tech stack to ensure a high-quality development experience and a performant application.

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Vite**: A build tool that provides a faster and leaner development experience for modern web projects.
- **Styled-Components**: A library for styling React components with tagged template literals.
- **ESLint**: A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.
- **Biome**: A high-performance formatter for web development.

## API Used

This project uses the **Piston API** to execute code remotely. The Piston API is an open-source project that allows you to run code in a variety of languages and versions.

- **API Endpoint**: `https://emkc.org/api/v2/piston`
- **Functionality**: The editor sends the source code and selected language to the Piston API, which then executes the code and returns the output.

## Supported Languages

This project supports the following languages and versions through the Piston API:

| Language   | Version  |
|------------|----------|
| JavaScript | 18.15.0  |
| TypeScript | 5.0.3    |
| Python     | 3.10.0   |
| Java       | 15.0.2   |
| C#         | 6.12.0   |
| PHP        | 8.2.3    |

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v14 or higher)
- pnpm (or npm/yarn)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username/js-code-editor-concept.git
   ```
2. Install dependencies
   ```sh
   pnpm install
   ```

### Running the Application

To run the application in development mode, use the following command:

```sh
pnpm run dev
```

This will start the development server at `http://localhost:3000`.

### Building the Application

To create a production build of the application, use the following command:

```sh
pnpm run build
```

This will generate a `dist` folder with the optimized and minified files.

## Linting and Formatting

This project uses ESLint for linting and Biome for formatting to maintain code quality and consistency.

- **Linting**: To check for linting errors, run:
  ```sh
  pnpm run lint
  ```
- **Formatting**: Biome is configured to format the code automatically. You can also run the formatter manually if needed.

## Project Structure

The project follows a standard Vite + React project structure, with some additional folders for better organization.

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── api.ts
│   ├── App.tsx
│   ├── components/
│   │   ├── CodeEditor.tsx
│   │   ├── CodeResult.tsx
│   │   └── LanguageSelector.tsx
│   ├── constants.ts
│   ├── errors/
│   ├── styles/
│   ├── types/
│   └── utils/
├── .gitignore
├── index.html
├── package.json
└── vite.config.ts
```