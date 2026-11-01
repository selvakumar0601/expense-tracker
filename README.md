SpendWise -- Expense Tracker
A simple, responsive browser-based expense tracker built using HTML5,
CSS3, and JavaScript. SpendWise helps users record daily expenses,
organize them by category, filter transactions, and understand their
spending through summary calculations.
Features
- Add new expenses with a name, amount, category, date, and optional
  notes
- Edit existing expenses
- Delete expenses with a confirmation prompt
- Categorize expenses (Food, Transport, Shopping, Bills, Health,
  Education, Entertainment, and Other)
- Search expenses by name
- Filter expenses by category
- Filter expenses by date range
- Sort expenses by newest, oldest, highest amount, or lowest amount
- Calculate total expenses based on the active filters
- Display current-month spending
- Calculate average expense
- Save expense records in browser LocalStorage
- Responsive layout for desktop, tablet, and mobile screens
- Validate expense details before saving
Technologies Used
  Technology                          Purpose
  HTML5                               Builds the page structure and forms

  CSS3                                Styles the interface and makes it
responsive

  JavaScript                          Handles expense operations,
calculations, filtering, and
sorting

  LocalStorage                        Saves expense data in the browser

  Git                                 Tracks source-code changes
GitHub                              Hosts and shares the project
repository
Project Structure
expense-tracker/
├── index.html
├── style.css
├── script.js
└── README.md
Getting Started
Requirements
- A modern web browser such as Google Chrome, Microsoft Edge, or
  Firefox
- Visual Studio Code (recommended)
- VS Code Live Server extension (optional)
Run the project
1. Download or clone this repository.
2. Open the expense-tracker folder in Visual Studio Code.
3. Make sure index.html, style.css, and script.js are in the same
   folder.
4. Open index.html in your browser, or right-click it in VS Code and
   select Open with Live Server.
5. Add an expense using the form and explore the filters and sorting
   options.
No backend server, database installation, API key, or package
installation is required.
How to Use
1. Enter an expense name.
2. Enter the amount in Indian rupees.
3. Select an expense category.
4. Choose the expense date.
5. Optionally add a note.
6. Click Add Expense.
7. Use the Edit or Delete actions in the expense list to manage
   records.
8. Use search, category, date, and sort controls to find transactions.
Data Storage and Privacy
The application stores records in the browser's LocalStorage. Data
remains available in the same browser on the same device after the page
is refreshed.

Important: LocalStorage is not cloud storage. Data is not
automatically synchronized between devices or browsers. Clearing browser
data may permanently remove saved expenses. Export or back up important
records separately.
Learning Objectives
This project provides practice with:
- JavaScript variables, functions, arrays, and objects
- DOM selection and dynamic UI updates
- Event listeners and form submission
- Form validation
- Array methods such as filter(), map(), find(), and reduce()
- Sorting data
- Browser LocalStorage
- Responsive web design
Future Improvements
- Add monthly charts and category-wise spending reports
- Add income tracking and budget limits
- Export transactions to CSV or PDF
- Add user login and cloud database synchronization
- Add recurring expense reminders
Deployment
This is a static website and can be deployed using GitHub Pages,
Netlify, or Vercel.

For Netlify, sign in, choose Add new site, upload the project
folder, and deploy. No build command is needed; the publish directory is
the project root.
GitHub Commands
Replace YOUR-USERNAME with your GitHub username and create an empty
repository named expense-tracker before running:
git init
git add .
git commit -m "Add SpendWise expense tracker"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/expense-tracker.git
git push -u origin main
