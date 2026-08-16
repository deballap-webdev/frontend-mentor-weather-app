# Frontend Mentor - Weather App Solution

This is my solution to the [Weather App challenge](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49) on Frontend Mentor.

I built this project with vanilla JavaScript to practice working with APIs, asynchronous JavaScript, application state, DOM manipulation, caching, error handling, responsive design, and modular code.

## Table of Contents

- [Overview](#overview)
- [The Challenge](#the-challenge)
- [Screenshot](#screenshot)
- [Links](#links)
- [My Process](#my-process)
- [Built With](#built-with)
- [What I Learned](#what-i-learned)
- [Architecture](#architecture)
- [Known Areas for Improvement](#known-areas-for-improvement)
- [Continued Development](#continued-development)
- [Useful Resources](#useful-resources)
- [AI Collaboration](#ai-collaboration)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

The Weather App allows users to search for locations and view current and forecast weather information using data retrieved from external APIs.

### Features

- Location search and search suggestions
- Current weather conditions
- Weather icons and location information
- Feels-like temperature
- Humidity
- Wind speed
- Precipitation
- 7-day weather forecast
- Hourly weather forecast
- Day selection for the hourly forecast
- Metric and Imperial unit preferences
- Celsius and Fahrenheit temperature units
- km/h and mph wind-speed units
- Millimeter and inch precipitation units
- Session-based caching
- API error handling
- Search error handling
- Retry functionality
- Loading/search states
- Responsive layouts
- Hover and focus states for interactive elements

## The Challenge

Users should be able to:

- Search for weather information by entering a location in the search bar
- View current weather conditions including temperature, weather icon, and location details
- See additional weather metrics such as feels-like temperature, humidity, wind speed, and precipitation
- Browse a 7-day weather forecast with daily high/low temperatures and weather icons
- View an hourly forecast showing temperature changes throughout the day
- Switch between different days of the week using the day selector
- Toggle between Imperial and Metric measurement units
- Switch between specific temperature, wind-speed, and precipitation units
- View an appropriate layout depending on their device's screen size
- See hover and focus states for interactive elements

## Screenshot

<!-- Add your screenshot here when ready. -->

## Links

- **Solution URL:** `YOUR_FRONTEND_MENTOR_SOLUTION_URL`
- **Live Site:** https://weather-app-q51c.onrender.com/
- **GitHub Repository:** https://github.com/deballap-webdev/frontend-mentor-weather-app

## My Process

I started by building the basic page structure and styling before connecting the application to the weather and geocoding APIs.

As the project became more complex, I gradually implemented:

1. Location searching
2. API integration
3. Current weather rendering
4. Daily and hourly forecasts
5. Day selection
6. Unit switching and conversion
7. Search suggestions
8. Session storage and caching
9. Loading and error states
10. Retry functionality
11. Responsive behavior
12. Modularization and refactoring

One of the biggest parts of this project was learning how to structure a larger vanilla JavaScript application.

As functionality increased, I moved away from keeping everything in one JavaScript file and separated different responsibilities into modules.

## Built With

- Semantic HTML5
- CSS
- Tailwind CSS
- Vanilla JavaScript
- JavaScript ES Modules
- Fetch API
- Geolocation API
- Session Storage
- Open-Meteo Weather API
- Geocoding API
- CSS Grid
- Flexbox
- Mobile-first responsive workflow
- Git
- GitHub
- Render

## What I Learned

### Working With APIs

This project gave me significantly more experience working with asynchronous API requests.

I learned how to:

- Make requests using `fetch`
- Work with `async/await`
- Handle API response data
- Transform API data before displaying it
- Handle failed requests
- Handle invalid search results
- Provide users with a retry option

### Separating Data From the DOM

One of the most important things I learned was that the DOM shouldn't be treated as the application's source of truth.

Instead of reading weather information back from rendered elements, the application keeps relevant data in JavaScript and passes that data to the functions responsible for rendering the UI.

This helped me better understand the difference between application state and its visual representation.

### Modular JavaScript

As the project grew, I separated the JavaScript into different modules:

- `main.js` — application orchestration and event handling
- `Location.js` — location and unit state
- `dataFunctions.js` — API requests, data processing, conversions, and storage
- `domFunctions.js` — DOM updates and rendering coordination
- `createCards.js` — creation of forecast cards
- `sessionToggle.js` — session-related UI toggles
- `Utilities.js` — reusable utility functions

This taught me that modularity isn't simply about creating more files. The goal is to give different parts of the application clear responsibilities.

### Caching

I learned how caching can reduce unnecessary API requests.

The application uses session storage to retain weather-related information and reuse previously retrieved data in appropriate situations.

### Error Handling

I learned to think about more than just the successful path.

API requests can fail, locations may not exist, searches can return no results, and network problems can occur.

I implemented different error states and retry functionality so that the application can respond to these situations instead of simply failing silently.

### Application State

This project also helped me understand how application state becomes more important as an application grows.

The application needs to keep track of things such as:

- Current location
- Weather data
- Selected units
- Selected forecast day
- Cached information
- Search state

Working with these different pieces of information made me more aware of the importance of having a clear source of truth.

## Architecture

`main.js` primarily acts as the application orchestrator. It coordinates events, retrieves data, handles the application flow, and passes information to the appropriate modules.

The general flow is:

```text
User interaction
      ↓
Application logic
      ↓
API / stored data
      ↓
Data transformation
      ↓
DOM rendering
```

I intentionally tried to keep application data separate from the DOM so that the interface represents the state of the application rather than becoming the source of that state.

The application uses a modular vanilla JavaScript structure:

```text
main.js
│
├── Location.js
├── dataFunctions.js
├── domFunctions.js
│   └── createCards.js
├── sessionToggle.js
└── Utilities.js
```

## Known Areas for Improvement

Although I'm happy with the progress I made with this project, I also recognize that there are areas where the architecture and implementation can be improved.

### State Management

The application's state is currently somewhat scattered across different variables, objects, and session storage.

As I continue learning, I want to improve how state is organized and work toward a clearer and more centralized source of truth.

### Single Responsibility Principle

Some functions and modules still have more than one responsibility.

I've improved the separation of responsibilities through refactoring, but I recognize that there are still areas where responsibilities could be separated more cleanly.

### Naming

Some variable and function names could be more descriptive and consistent.

I'm becoming more conscious of naming as I learn more about writing readable and maintainable code.

### Debouncing

I haven't learned debouncing yet, so the search functionality is an area I want to improve.

Debouncing would allow the application to avoid performing unnecessary work while the user is typing.

### Race Conditions

I also haven't learned how to properly handle asynchronous request race conditions yet.

In particular, I want to learn how techniques such as `AbortController` can be used to cancel outdated requests and make asynchronous search behavior more reliable.

These are areas I'm aware of and intend to improve as I continue learning. This project helped me identify gaps in my knowledge and gave me specific concepts to study next.

## Continued Development

In future projects, I want to continue improving my understanding of:

- Application state management
- Single Responsibility Principle
- Separation of concerns
- Better naming and API design
- Asynchronous JavaScript
- Debouncing
- `AbortController`
- Race-condition handling
- Error handling
- Accessibility
- Testing
- Writing smaller and more focused functions
- Designing maintainable application architectures

My goal isn't to make every project perfect from the beginning. I want to keep building increasingly complex applications and improve my architectural decisions as my understanding grows.

## Useful Resources

- [Frontend Mentor](https://www.frontendmentor.io/) — Provided the challenge and original design.
- [MDN Web Docs](https://developer.mozilla.org/) — Used extensively for JavaScript, browser APIs, Fetch, DOM manipulation, and session storage.
- [Open-Meteo Documentation](https://open-meteo.com/en/docs) — Used to understand the weather API and its response data.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) — Used for styling and responsive design.
- [JavaScript.info](https://javascript.info/) — Used as a learning resource for JavaScript concepts.

## AI Collaboration

I used AI tools, primarily ChatGPT, as a development and learning assistant throughout this project.

I used AI to help with:

- Debugging
- Understanding JavaScript concepts
- Discussing architectural decisions
- Reviewing code
- Identifying potential problems
- Brainstorming solutions
- Thinking through state management
- Improving error-handling approaches
- Reviewing separation of responsibilities
- Improving readability and maintainability

I did not use AI to simply generate the entire application. I used it as a tool for discussion, debugging, code review, and learning.

One of the most useful parts of the process was being able to discuss why an implementation might be better or worse rather than simply receiving a solution.

The project also taught me that AI suggestions still need to be questioned and understood. A technically valid solution isn't automatically the best solution for a particular application.

## Author

- GitHub: [@deballap-webdev](https://github.com/deballap-webdev)
- Frontend Mentor: [@deballap-webdev](https://www.frontendmentor.io/profile/deballap-webdev)
- Instagram: [@debb13.a](https://www.instagram.com/debb13.a/)
- X: [@AllaputaDe35387](https://x.com/AllaputaDe35387)
- LinkedIn: [Deborah Allaputa](https://www.linkedin.com/in/deborah-allaputa-a41a26426/)

## Acknowledgments

Thanks to [Frontend Mentor](https://www.frontendmentor.io/) for providing the challenge and design.

I also used the documentation for the APIs and web technologies involved throughout the project.

Most importantly, this project gave me the opportunity to move beyond simply making JavaScript code work and start thinking more seriously about application architecture, state, separation of concerns, error handling, caching, and maintainability.
