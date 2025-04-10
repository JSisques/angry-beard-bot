# Angry Beard Bot - Project Context

## Overview

Angry Beard Bot is a GitHub bot designed to act like a senior developer with a beard, bad temper, and little patience. Its mission is to review Pull Requests (PRs) in a repository with sharp yet useful comments on best practices, code quality, and description clarity. The bot provides automated code reviews with a touch of sharp humor, making the review process both educational and entertaining.

## Features

### 1. **PR Description Enhancement**

- Analyzes the changes in the PR and generates a concise yet detailed description.
- Highlights key modifications and their impact on the codebase.
- Provides context-aware descriptions that help reviewers understand the changes at a glance.

### 2. **Smart Title Generation**

- Suggests or replaces the PR title to make it clearer and more representative of the changes made.
- Transforms vague PR titles into clear, descriptive ones that tell the whole story.
- Helps maintain consistent and informative PR naming conventions.

### 3. **Code Review**

- Leaves comments directly on the PR code, pointing out:
  - Bad practices and anti-patterns.
  - Unnecessary or redundant code.
  - Potential errors or unhandled edge cases.
  - Optimization opportunities.
  - Lack of documentation or poorly named variables/methods.
- Provides detailed feedback on code quality, best practices, and potential improvements.
- Adapts feedback style based on configured personality settings.

### 4. **Adaptive Personality System**

- Features three distinct personality dimensions:
  - Grumpiness Level: Controls the bot's sarcasm and attitude (Mild to Extreme)
  - Technical Level: Adjusts the depth of technical feedback (Basic to Advanced)
  - Detail Level: Determines review comprehensiveness (Concise to Comprehensive)
- Example grumpiness levels:
  - Mild: Constructive and gentle feedback
  - Moderate: Balanced mix of sarcasm and helpfulness
  - Extreme: Maximum snark and impatience
- Example comment styles:
  > Mild: "Consider using a more modern approach with ES6+ features."
  >
  > Extreme: "Oh great, another masterpiece of mediocrity. Let's see what we're dealing with here."

### 5. **Conventions Validation**

- Ensures that the PR follows project standards, including:
  - Naming conventions.
  - Folder and file structure.
  - Code style (according to ESLint, Prettier, etc.).
  - Presence of unit tests.
- Automatically validates code against project conventions.

### 6. **Auto-Approval**

- If the code meets the standards, the bot leaves a comment with its (reluctant) approval.
- If issues are found, it requests changes before approving the PR.
- Speeds up your workflow with intelligent auto-approvals for high-quality PRs.

## Configuration

The bot features an intuitive configuration system:

### Personality Settings

- **Grumpiness Level**:

  - Controls sarcasm and attitude
  - Three levels: Mild, Moderate, Extreme
  - Affects tone and style of comments

- **Technical Level**:

  - Determines complexity of feedback
  - Ranges from Basic to Advanced
  - Influences depth of technical suggestions

- **Detail Level**:
  - Sets review thoroughness
  - Options: Concise, Balanced, Comprehensive
  - Controls length and depth of reviews

### Review Focus Areas

- Code Style & Formatting
- Best Practices & Patterns
- Documentation & Comments
- Testing & Coverage
- Security & Vulnerabilities
- Performance & Optimization

## How It Works

1. **Install the Bot**:

   - One-click GitHub integration
   - Configure personality settings
   - Set up auto-approval rules

2. **Create a PR**:

   - Submit your code changes
   - Bot automatically detects PR
   - Initial analysis begins

3. **Get Feedback**:
   - Receive personalized code review based on configuration
   - Get actionable improvements with matching technical depth
   - Auto-approval if standards met

## Pricing Plans

### Free Plan – For side-projects or trying out the bot

- Price: €0 / month
- Credits included: 20 / month
- Features:
  - PR reviews with GPT-4o mini
  - Title and description improvements
  - Basic best practices comments
  - Configurable bot personality
  - Limit: 20 normal reviews (or equivalent)
  - No credit accumulation
  - Option to upgrade anytime

### Pro Plan – For startups, freelancers and active teams

- Price: €20 / month (€192 / year with 20% discount)
- Credits included: 500 / month
- Features:
  - Automatic review after each commit and PR
  - Detailed code comments
  - Smart description editing
  - Customizable bot personality
  - Extra credits: €0.10 per credit

### Business Plan – For companies with high PR volume

- Price: €49 / month (€470 / year with 20% discount)
- Credits included: 2000 / month
- Features:
  - Everything in Pro plan
  - Advanced review with powerful models (3 credits per review)
  - Metrics dashboard and downloadable reports
  - High priority in review queue
  - External integrations (Slack, CI tools) (coming soon)
  - Extra credits: €0.08 per credit

All plans include a 14-day free trial with no credit card required.

## Implementation Details

- **Language**: TypeScript
- **Frontend**: React with Tailwind CSS for configuration interface
- **Infrastructure**: GitHub Actions or Webhooks to trigger on PR events
- **AI Models**: Uses LLMs (GPT, Gemini, Claude) for text generation and code analysis
- **Integration**: Seamless GitHub integration with minimal setup required

## Objective

The goal of Angry Beard Bot is to improve code quality in repositories while providing a unique and engaging review experience. By combining technical accuracy with customizable personality traits, the bot makes code reviews more effective and entertaining. The adaptive personality system ensures that teams can fine-tune the bot's behavior to match their culture while maintaining high code standards.
