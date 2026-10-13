# Contact List App – Playwright Automation Testing

An end-to-end test automation project for the Contact List application, built using **Playwright** and **TypeScript**. The project demonstrates UI automation, the **Page Object Model (POM)** design pattern, environment-based configuration, API request interception, and **Allure reporting**.

The goal is to create maintainable and reusable automated tests for validating application behavior and practicing modern software testing techniques.

## 🚀 Project Overview

This project automates testing scenarios for a Contact List web application using Playwright. It organizes page interactions and test cases into separate modules to improve code readability, reusability, and maintainability.

The project also includes scripts for running selected API-related test scenarios and generating HTML test reports using Playwright and Allure.

## 🛠️ Tech Stack

- **Language:** TypeScript
- **Automation Framework:** Playwright Test
- **Design Pattern:** Page Object Model (POM)
- **Environment Configuration:** dotenv (`.env`)
- **Test Reporting:** Allure Report 3 and Playwright HTML Reporter
- **Allure Integration:** `allure-playwright`
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
├── playwright.config.ts                    # Playwright configuration
├── allure-result                           # Allure test execution results
└── allure-report                           # Generated Allure HTML
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

### 3. Install Project Dependencies

```bash
npm install
```

### 4. Install Allure Reporting

Install Allure Report 3 and its Playwright integration as development dependencies:

```bash
npm install --save-dev allure allure-playwright
```

- `allure`: Allure Report 3 command-line tool.
- `allure-playwright`: Integrates Allure reporting with Playwright Test.

### 5. Install dotenv

Install `dotenv` to load environment variables from the `.env` file:

```bash
npm install dotenv
```

The `dotenv` package loads environment variables into `process.env`, allowing the tests and configuration to access application URLs and test credentials.

### 6. Configure Environment Variables

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

Replace the placeholder credentials with the appropriate test-account credentials.

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

### 7. Install Playwright Browser Dependencies

If required, run:

```bash
npx playwright install
```

On Linux or CI environments, you may also need:

```bash
npx playwright install --with-deps
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

This project supports two reporting options: **Allure Report 3** and the **Playwright HTML Reporter**.

### 1. Allure Reporting

Allure provides a detailed view of test execution results, including passed and failed tests and available test diagnostics.

#### Generate Allure Test Results

Run the tests:

```bash
npm test
```

The configured Allure reporter generates test result files in the `allure-result` directory.

#### Generate the Allure HTML Report

After the tests finish, run:

```bash
npm run allure:generate
```

This generates the Allure HTML report in the `allure-report` directory.

#### Open the Allure Report

To view the generated report, execute:

```bash
npm run allure:open
```

#### Generate and Serve the Report Directly

Alternatively, run:

```bash
npm run allure:serve
```

This command generates and serves the Allure report directly from the available test results.

### 2. Playwright HTML Report

The project also retains Playwright's built-in HTML reporting.

After a test run, execute:

```bash
npm run test:report
```

This opens the Playwright HTML report separately from the Allure report.

### Reporting Commands Summary

| Command | Purpose |
|---|---|
| `npm test` | Execute tests and generate results through the configured reporters |
| `npm run allure:generate` | Generate the Allure HTML report |
| `npm run allure:open` | Open the generated Allure report |
| `npm run allure:serve` | Generate and serve the Allure report |
| `npm run test:report` | Open the Playwright HTML report |

> **Important:** Ensure `allure-playwright` is configured in `playwright.config.ts` before running tests. The Allure results directory must contain test execution data before generating the report.

## 🧩 Key Features

- **End-to-End Automation:** Automates browser-based application testing.
- **Page Object Model:** Separates page interactions from test logic for improved maintainability.
- **Environment-Based Configuration:** Keeps application settings and test credentials configurable.
- **API Test Selection:** Supports running subsets of tests using Playwright tags.
- **Request Interception:** Includes scenarios for continuing, fulfilling, and aborting requests.
- **Allure Reporting:** Generates detailed Allure reports for test execution analysis.
- **Playwright HTML Reporting:** Provides a separate built-in HTML report.
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
- Test execution and reporting using Allure and Playwright
- API request interception concepts
- Automated testing workflow configuration

## 👤 Author

**Rushikesh Kolhe**

- **GitHub:** [@rushikeshkolhe170](https://github.com/rushikeshkolhe170)

## 📄 License

This project currently uses the license metadata specified in `package.json` (ISC). Add a corresponding `LICENSE` file if you intend to distribute the project under that license.
