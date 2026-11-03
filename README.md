# Expense Tracker

A beginner project combining frontend development and manual QA.

## Features

- Add and delete expenses.
- Validate descriptions, categories, and positive whole-naira amounts.
- Accept correctly placed commas, such as 2,000.
- Reject decimal points and incorrectly placed commas.
- Display the total and expense count.
- Save expense records in browser localStorage.
- Show a message when the expense list is empty.

## Technologies

- HTML
- CSS
- JavaScript
- Browser localStorage

## Running the project

1. Download or clone this repository.
2. Open the project folder in VS Code.
3. Install the Live Server extension if needed.
4. Right-click index.html and select "Open with Live Server".
5. Use the local address it opens to access the application.

For consistent access to saved expenses, use the same browser,
browser profile, and local address, including its port number.

## Testing

Manual test cases and recorded results are in TESTING.md.

## Limitations

- Data is stored in this browser only, not in an online database.
- Clearing browser storage can remove saved expenses.
- There are no user accounts or cross-device syncing.
- Amounts are limited to positive whole naira.

## Project status

Learning project in active development.