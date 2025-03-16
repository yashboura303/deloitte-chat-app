# Deloitte Auditor Chat UI

## CMPE 280 - Web UI Design and Development Project

### Project Overview

This project implements a specialized chat interface for Deloitte auditors who need to access tax-related information quickly and efficiently. The application leverages AI language models to provide accurate tax information, helping auditors better serve their clients.

### Scenario

As part of the Deloitte Auditor team that specializes in audit development for commercial companies and individuals, auditors need to study US Tax law to file appropriate tax deductions that benefit clients. The audit and IT teams at Deloitte are investing in AI language models to develop a Web Interface that allows auditors to prompt tax-related questions and store responses on the client's local system.

### Technology Stack

- **Frontend**: HTML, CSS, JavaScript with AJAX for asynchronous communication
- **Backend**: Express.js RESTful API
- **AI Integration**: Google's Gemini AI model
- **Data Storage**: Local browser storage for chat history

### Key Features

1. **Tax-Specific Interface**: Designed specifically for tax-related queries with prompt validation
2. **AJAX Implementation**: Asynchronous communication with the server without page reloads
3. **RESTful API**: Backend API designed following REST principles
4. **Prompt Engineering**: System ensures queries are tax-focused
5. **Local Storage**: Chat history saved to the client's local system
6. **Responsive Design**: Professional UI with Deloitte branding
7. **Markdown Rendering**: Properly formatted responses with headings, lists, and other styling

### Implementation Details

- The application uses vanilla JavaScript with XMLHttpRequest for AJAX calls
- The backend implements a RESTful API that communicates with the Gemini AI model
- Responses are rendered with proper formatting (bold, headings, etc.)
- The system validates that queries are tax-related before processing

### Security and Compliance

- API keys are stored securely on the server side
- No sensitive data is exposed to the client
- The application follows Deloitte's security guidelines

### Future Enhancements

- Authentication system for auditors
- Export functionality for reports
- Integration with Deloitte's internal systems
- Advanced filtering of tax information by jurisdiction

### Project Contributors

- [Your Name]
- [Team Member Names]

---

*This project was developed as part of the CMPE 280 - Web UI Design and Development course requirements.*