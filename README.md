# Code Generator

An AI-powered code generation agent that creates complete web projects from specifications.

## Project Overview

This project contains an intelligent agent that generates fully functional web applications using LangGraph. The agent analyzes project requirements and generates complete HTML, CSS, and JavaScript applications with documentation.

## Structure

```
├── agent/                  # LangGraph agent implementation
│   ├── graph.py           # Main agent workflow and state management
│   ├── prompts.py         # LLM prompts for code generation
│   ├── states.py          # State definitions for the agent
│   ├── tools.py           # Tools available to the agent
│   └── __init__.py
├── generated_project/     # Sample generated Todo App
│   ├── index.html         # HTML structure
│   ├── styles.css         # CSS styling and themes
│   ├── script.js          # JavaScript application logic
│   └── README.md          # Generated project documentation
├── main.py                # Entry point for the agent
├── pyproject.toml         # Project dependencies
├── .env                   # Environment variables (not tracked)
└── README.md              # This file
```

## Features

- **AI-Powered Generation**: Uses LLMs to create complete web applications
- **Full Stack**: Generates HTML, CSS, and JavaScript files
- **Documentation**: Auto-generates comprehensive README files
- **State Management**: Tracks generation progress through LangGraph states
- **Modular Design**: Easy to extend with new tools and prompts

## Tech Stack

- **Python 3.11+**
- **LangGraph**: Agent orchestration and state management
- **LangChain**: LLM integration and prompt management
- **Groq API**: Fast LLM inference
- **UV**: Python package manager

## Setup

### Prerequisites

- Python 3.11 or higher
- Groq API key (get one at [console.groq.com](https://console.groq.com))

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

**Note**: Never commit `.env` to version control. Use `.env.example` for template.

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

## Generated Project Example

The `generated_project/` folder contains a sample **Colorful Todo App** with:

- **Add, edit, and delete tasks**
- **Mark tasks as complete**
- **Filter by status** (All, Active, Completed)
- **Drag-and-drop reordering**
- **Multiple color themes** (Light, Dark, Solarized)
- **Local storage persistence**
- **Responsive design**

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

### Dependencies

- `langchain>=0.1.0` - LLM framework
- `langgraph>=0.0.1` - Agent orchestration
- `groq>=0.4.0` - Groq API client
- `python-dotenv>=1.0.0` - Environment management

## Troubleshooting

### Groq API Key Issues

If you get authentication errors:
1. Verify your API key at [console.groq.com](https://console.groq.com)
2. Check that `.env` has the correct `GROQ_API_KEY`
3. Ensure `.env` is not committed to git

### Generation Failures

If code generation fails:
1. Check the LLM response in the terminal output
2. Verify your project specification is clear
3. Check available tokens in your Groq account

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "Add your feature"`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Open an issue on [GitHub Issues](https://github.com/abhigyan2003/code-generator/issues)
- Check [LangChain Documentation](https://python.langchain.com/)
- Review [LangGraph Documentation](https://langchain-ai.github.io/langgraph/)

## Roadmap

- [ ] Support for backend frameworks (FastAPI, Flask)
- [ ] Database schema generation
- [ ] API documentation generation
- [ ] Unit test generation
- [ ] Component library support
- [ ] Web UI for project configuration

---

**Built with LangChain, LangGraph, and Groq API**
