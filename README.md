# Code Generator

An AI-powered code generation agent that creates complete web projects from specifications.

## Project Overview

This project contains an intelligent agent that generates fully functional web applications using LangGraph. The agent analyzes project requirements and generates complete HTML, CSS, and JavaScript applications with documentation.

## Tech Stack

- **Python 3.11+**
- **LangGraph**: Agent orchestration and state management
- **LangChain**: LLM integration and prompt management
- **Groq API**: Fast LLM inference
- **UV**: Python package manager

## Setup

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/abhigyan2003/code-generator.git
   cd code-generator
   ```

2. **Set up environment**
   ```bash
   # Using uv (recommended)
   uv sync
   
   # Or using pip
   pip install -r requirements.txt
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your Groq API key
   ```

4. **Verify setup**
   ```bash
   python main.py
   ```

## Environment Variables

Create a `.env` file in the root directory:

```env
GROQ_API_KEY=your_groq_api_key_here
```


## Usage

Run the agent to generate a new project:

```bash
python main.py
```

The agent will:
1. Create a project plan with implementation steps
2. Generate HTML, CSS, and JavaScript files
3. Create comprehensive documentation
4. Save all files to the `generated_project/` directory


### Running the Generated App

```bash
# Simply open in a browser
open generated_project/index.html
```

## Agent Architecture

### State Management (`states.py`)

Defines `CoderState` that tracks:
- Task plan and implementation steps
- Current file being generated
- Progress through the generation pipeline

### Graph Workflow (`graph.py`)

- **Planner node**: Creates implementation plan
- **Coder node**: Generates code files
- **Validator node**: Ensures code quality

### Tools (`tools.py`)

Available tools for the agent:
- `write_file`: Save generated code
- `read_file`: Load existing code
- `run_code`: Execute and validate generated code

### Prompts (`prompts.py`)

- Planner prompt: Breaks down requirements into tasks
- Coder prompt: Generates individual files
- Validation prompt: Ensures correctness

## Development

### Project Structure

```
pyproject.toml    # Dependencies: langchain, langraph, groq
main.py           # Agent execution entry point
agent/
  ├── graph.py    # LangGraph workflow
  ├── states.py   # State classes
  ├── prompts.py  # Prompt templates
  ├── tools.py    # Tool implementations
  └── __init__.py
```

### Adding New Features

1. **Add a new tool** in `agent/tools.py`
2. **Update the graph** in `agent/graph.py` to use the tool
3. **Create prompts** in `agent/prompts.py`
4. **Test** by running `python main.py`





