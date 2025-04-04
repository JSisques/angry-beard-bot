# Angry Beard Bot - Project Context

## Overview
Angry Beard Bot is a GitHub bot designed to act like a senior developer with a beard, bad temper, and little patience. Its mission is to review Pull Requests (PRs) in a repository with sharp yet useful comments on best practices, code quality, and description clarity.

## Features
### 1. **PR Description Enhancement**
   - Analyzes the changes in the PR and generates a concise yet detailed description.
   - Highlights key modifications and their impact on the codebase.

### 2. **Title Generation**
   - Suggests or replaces the PR title to make it clearer and more representative of the changes made.
   
### 3. **Code Review**
   - Leaves comments directly on the PR code, pointing out:
     - Bad practices.
     - Unnecessary or redundant code.
     - Potential errors or unhandled edge cases.
     - Optimization opportunities.
     - Lack of documentation or poorly named variables/methods.
   
### 4. **Communication Style**
   - The bot uses a sarcastic and grumpy tone, similar to an impatient senior developer.
   - It is not offensive but rather direct and witty.
   - Example comment:
     > "Oh wow, how interesting! I didn’t realize we were still coding like it’s 2010. Maybe we could use a function instead of repeating this logic three times."

### 5. **Repository Conventions Validation**
   - Ensures that the PR follows project standards, including:
     - Naming conventions.
     - Folder and file structure.
     - Code style (according to ESLint, Prettier, etc.).
     - Presence of unit tests.
   
### 6. **Auto-Approval or Change Requests**
   - If the code meets the standards, the bot leaves a comment with its (reluctant) approval.
   - If issues are found, it requests changes before approving the PR.
   
## Configuration
The bot should be configurable to:
- Define the level of "grumpiness" (from mild sarcasm to brutal honesty).
- Adjust review criteria based on the repository.
- Customize responses and comments.
- Integrate with CI/CD tools to check builds and tests.

## Implementation Details
- **Language**: TypeScript.
- **Infrastructure**: GitHub Actions or Webhooks to trigger on PR events.
- **AI Models**: Uses LLMs (GPT, Gemini, Claude) for text generation and code analysis.

## Objective
The goal of Angry Beard Bot is to improve code quality in repositories without needing a real senior developer, providing automated reviews with a touch of sharp humor.
