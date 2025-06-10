# AI Letter Generator - مولد الخطابات الذكي

A modern web application for generating letters using AI technology, built for Arabic users.

## Features

- **AI-Powered Letter Generation**: Generate professional letters using artificial intelligence
- **Template System**: Choose from multiple letter templates
- **Letter Management**: Track and manage all created letters
- **Review System**: Review and approve letters before sending
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Google Sheets Integration**: Seamlessly integrated with Google Sheets for data management

## Technologies Used

- HTML5
- CSS3 (with CSS Variables for theming)
- Vanilla JavaScript
- Google Sheets API
- Font Awesome Icons
- Cairo Font (Arabic typography)

## Setup Instructions

1. Clone this repository
2. Update the configuration in `script.js`:
   - Replace `SPREADSHEET_ID` with your Google Sheets ID
   - Replace `API_KEY` with your Google Sheets API key
   - Update API endpoints if needed

3. Deploy to Netlify:
   - Connect your GitHub repository to Netlify
   - The site will automatically deploy

## Google Sheets Setup

Create a Google Sheet with two worksheets:

### Settings Worksheet
Columns:
- A: ID
- B: نوع الخطاب (Letter Type)
- C: الغرض من الخطاب (Purpose)
- G: الأسلوب (Style)

### Submissions Worksheet
Columns:
- A: الرقم المرجعي (Reference ID)
- B: التاريخ (Date)
- C: نوع (Type)
- D: نوع الخطاب (Letter Type)
- E: المستلم (Recipient)
- F: الموضوع (Subject)
- G: المحتوى (Content)
- H: المحتوى المُنشأ (Generated Content)
- I: القالب (Template)
- J: حالة المراجعة (Review Status)
- K: حالة الإرسال (Send Status)

## API Endpoints

- **Generate Letter**: `POST /generate-letter`
- **Archive Letter**: `POST /archive-letter`

## Usage

1. **Creating a New Letter**:
   - Fill in the letter details form
   - Click "إنشاء الخطاب" to generate
   - Select a template and click "حفظ ومتابعة"

2. **Reviewing Letters**:
   - Select a letter from the dropdown
   - Review and edit the content
   - Add notes and select appropriate action

3. **Managing Letters**:
   - Use the search and filter options
   - Perform actions like print, download, or delete

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License.