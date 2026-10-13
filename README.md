# Contact List App – Playwright Automation Testing

An end-to-end test automation project for the Contact List application, built using **Playwright** and **TypeScript**. The project demonstrates UI automation, the **Page Object Model (POM)** design pattern, environment-based configuration, and API request interception.

The goal is to create maintainable and reusable automated tests for validating application behavior and practicing modern software testing techniques.

## 🚀 Project Overview

This project automates testing scenarios for a Contact List web application using Playwright. It organizes page interactions and test cases into separate modules to improve code readability, reusability, and maintainability.

The project also includes scripts for running selected API-related test scenarios and generating an HTML test report.

## 🛠️ Tech Stack

- **Language:** TypeScript
- **Automation Framework:** Playwright Test
- **Design Pattern:** Page Object Model (POM)
- **Environment Configuration:** dotenv (`.env`)
- **Test Reporting:** Playwright HTML Reporter
- **Package Management:** npm
- **CI/CD:** GitHub Actions workflow configuration

## 📁 Project Structure

```text
ContactListAppPlaywrightJSTS/
├── .github/
│   └── workflows/                         # GitHub Actions workflows
├── Pages/
│   ├── ContactListPage.ts                 # Contact list page object
│   └── LoginPage.ts                       # Login page object
├── Utils/
│   └── APIutils.ts                        # API utility functions
├── tests/
│   ├── APILogin.spec.ts                   # API login tests
│   ├── AddContactFormValidation.spec.ts   # Add contact form validation tests
│   ├── AddNewContact.spec.ts               # Add new contact tests
│   ├── ContactListAppOpen.spec.ts          # Application launch tests
│   ├── DeleteContact.spec.ts               # Delete contact tests
│   ├── EditContact.spec.ts                 # Edit contact tests
│   ├── EditContactFormValidation.spec.ts  # Edit contact form validation tests
│   ├── LoginAPIMock.spec.ts                # Login API mocking tests
│   ├── ValidateImage.spec.ts               # Image validation tests
│   └── ValidateImage.spec.ts-snapshots/
│       └── footerimage-win32.png           # Footer image snapshot
├── .env                                    # Environment configuration
├── .gitignore                              # Git ignore rules
├── package.json                            # Dependencies and npm scripts
├── package-lock.json                       # Locked dependency versions
└── playwright.config.ts                    # Playwright configuration
```

## ⚙️ Prerequisites

Before running the tests, ensure the following are installed:

- Node.js and npm
- Git
- Google Chrome
- A valid account for the Contact List application
- Access to the target application

## 📥 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/rushikeshkolhe170/ContactListAppPlaywrightJSTS.git
```

### 2. Navigate to the Project Directory

```bash
cd ContactListAppPlaywrightJSTS
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the project root directory and add the following environment variables:

```env
BASE_URL=https://thinking-tester-contact-list.herokuapp.com/
LOGIN_URL=https://thinking-tester-contact-list.herokuapp.com/users/login
CONTACT_LIST_URL=https://thinking-tester-contact-list.herokuapp.com/contactList

USER_NAME1=invalidUsername
PASSWORD1=invalidPassword

USER_NAME2=validUsername
PASSWORD2=validPassword

COOKIES_DOMAIN=thinking-tester-contact-list.herokuapp.com
```

**Environment Variable Details**

| Variable | Description |
|---|---|
| `BASE_URL` | Base URL of the Contact List application |
| `LOGIN_URL` | URL of the login endpoint/page |
| `CONTACT_LIST_URL` | URL of the contact list page |
| `USER_NAME1` | Username used for invalid login scenarios |
| `PASSWORD1` | Password used for invalid login scenarios |
| `USER_NAME2` | Username used for valid login scenarios |
| `PASSWORD2` | Password used for valid login scenarios |
| `COOKIES_DOMAIN` | Domain used for cookie-related operations |


### 5. Install Playwright Browser Dependencies

If required, run:

```bash
npx playwright install
```

## ▶️ Running Tests

Run the complete Playwright test suite:

```bash
npm test
```

Run tests with the browser displayed:

```bash
npm run test:headed
```

Run API-related tests selected by the `@apis` tag:

```bash
npm run test:api
```

Run tests selected by the `@continue` tag:

```bash
npm run test:apicontinue
```

Run tests selected by the `@fulfill` tag:

```bash
npm run test:apifulfill
```

Run tests selected by the `@abort` tag:

```bash
npm run test:apiabort
```

> **Note:** The API-related scripts select tests using their tags. The exact scenarios executed depend on the test annotations in the source files.

## 📊 Test Reports

The project uses Playwright's HTML reporter.

After a test run, open the generated report using:

```bash
npm run test:report
```

The report helps you review test outcomes, failures, and debugging details. Screenshots and traces are configured in Playwright for additional failure investigation.

## 🧩 Key Features

- **End-to-End Automation:** Automates browser-based application testing.
- **Page Object Model:** Separates page interactions from test logic for improved maintainability.
- **Environment-Based Configuration:** Keeps application settings and test credentials configurable.
- **API Test Selection:** Supports running subsets of tests using Playwright tags.
- **Request Interception:** Includes scenarios for continuing, fulfilling, and aborting requests.
- **HTML Reporting:** Generates a report for reviewing test execution results.
- **Failure Debugging:** Configures retries, screenshots, and tracing to assist with investigating test failures.

## 🏗️ Design Approach

The project follows the **Page Object Model (POM)** approach, where page-specific locators and interactions are organized separately from the test cases.

This approach helps to:

- Reduce duplicated browser interaction code.
- Reuse page methods across multiple test cases.
- Improve test readability.
- Simplify maintenance when application elements change.

## 🔐 Security Notes

- Never commit real usernames, passwords, access tokens, or other secrets.
- Keep `.env` in `.gitignore`.
- If credentials have already been pushed to a public repository, rotate them and remove the exposed secrets from the repository history as appropriate.
- Use dedicated test accounts and non-production data.

## 🎯 Learning Objectives

This project demonstrates practical experience with:

- Playwright browser automation
- TypeScript-based test development
- Page Object Model architecture
- Environment variable management
- Test execution and reporting
- API request interception concepts
- Automated testing workflow configuration

## 👤 Author

**Rushikesh Kolhe**

- **GitHub:** [@rushikeshkolhe170](https://github.com/rushikeshkolhe170)

## 📄 License

This project currently uses the license metadata specified in `package.json` (ISC). Add a corresponding `LICENSE` file if you intend to distribute the project under that license.
