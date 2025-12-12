# Netflix GPT - AI-Powered Movie Recommendation Platform

This project replicates the core user interface and features of Netflix, enhanced with an AI-driven movie recommendation system. It demonstrates proficiency in building complex, dynamic web applications using modern frontend technologies and integrating multiple external APIs.

The application allows users to sign up, log in, browse movie categories fetched from TMDb, and utilize a unique GPT-powered search to discover movies based on natural language queries.

### Live Demo and Project Showcase

| Feature | Link |
| :--- | :--- |
| **Live Application (Vercel)** | [**👉 Click to View Live App**](https://netflix-ppz9u2fdj-naveens-projects-632a7abc.vercel.app/) |
| **Video Demonstration** | [**🎬 Watch Project Demo**](https://drive.google.com/file/d/10eh_31H3KkZyfKUgzYoEOUAyjiUXr40y/view?usp=sharing) |

---

## In-Depth Features

- **Robust User Authentication:**

  - Secure user registration and login implemented using **Firebase Authentication** (Email/Password provider).
  - Persistent user sessions managed effectively through Firebase's `onAuthStateChanged` listener, ensuring users remain logged in across browser sessions.
  - User authentication state is synchronized globally within the application using **Redux Toolkit**.

- **Dynamic Movie Catalog Browsing:**

  - Leverages **The Movie Database (TMDb) API** to fetch and display diverse movie categories, including Now Playing, Popular, Trending, and Upcoming films.
  - Features an engaging **Main Container** showcasing a prominent movie with its title, description, and an automatically playing background video trailer fetched dynamically based on the movie ID.
  - A well-structured **Secondary Container** displays categorized movie lists in horizontally scrollable carousels (`MovieList` components), providing a familiar browsing experience.
  - Efficient data fetching logic is encapsulated within **custom React Hooks** (`useNowPlayingMovies`, `usePopularMovies`, etc.), promoting code reusability and separation of concerns. Fetched data is dispatched to the Redux store.

- **Advanced State Management:**

  - Utilizes **Redux Toolkit** for predictable and centralized state management across the application.
  - Clearly defined state slices manage user authentication status (`userSlice`), movie data (`moviesSlice`), and the visibility of the GPT search interface (`gptSlice`).
  - Components access and update state using `useSelector` and `useDispatch` hooks from `react-redux`.

- **Intelligent GPT-Powered Search:**

  - Features a toggleable search interface integrated seamlessly into the header.
  - Accepts natural language queries from the user (e.g., "funny movies from the 90s").
  - Constructs a detailed prompt for the **Google Gemini API** (or OpenAI API), instructing it to act as a movie recommendation system and return a list of relevant movie titles.
  - Parses the comma-separated movie titles received from the AI model.

- **Integrated TMDb Search for AI Results:**

  - Takes the movie titles suggested by the AI and automatically queries the **TMDb Search API** for each title.
  - Efficiently handles multiple concurrent API calls using `Promise.all` to fetch details for all suggested movies.
  - Displays the search results (movie posters, details) obtained from TMDb, linking the AI suggestions to concrete movie data.

- **Client-Side Routing:**

  - Implements smooth navigation between the Login/Sign-Up page and the main Browse page using **React Router DOM v6**.
  - Utilizes `createBrowserRouter` for defining routes.
  - Includes logic to protect the `/browse` route, automatically redirecting unauthenticated users to the login page and logged-in users away from the login page.

- **Modern UI & Styling:**

  - Built with a utility-first approach using **Tailwind CSS**, allowing for rapid development of a responsive and visually appealing interface that closely mirrors Netflix's design.
  - Includes considerations for responsiveness across different screen sizes.

- **Multi-language Support Framework:**
  - Incorporates a basic structure for internationalization (i18n), allowing UI text elements (like button labels, placeholders) to be displayed in different languages based on user preference stored in the Redux store.

---

## 🛠️ Technology Stack

- **Core:** React.js (v18+), JavaScript (ES6+)
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM (v6+)
- **State Management:** Redux Toolkit, React-Redux
- **Build Tool:** Vite
- **Backend Services:** Firebase Authentication
- **External APIs:**
  - The Movie Database (TMDb) API (v3 - Movies & Search)
  - Google Gemini API (or OpenAI API)
- **Development Tools:** Git, VS Code, Browser Developer Tools, Redux DevTools Extension

---

## Getting Started

1.  **Clone the Repository:**

    ```bash
    git clone [https://github.com/naveenmoka/netflix-gpt.git](https://github.com/naveenmoka/netflix-gpt.git)
    cd netflix-gpt
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

    _(or `yarn install`)_

3.  **API Keys:** This project requires API keys for Firebase, TMDb, and Google Gemini (or OpenAI). Ensure these are configured correctly in your local environment (typically via a `.env` file, following Vite's conventions for environment variables, e.g., prefixing with `VITE_`). **Note:** API keys are sensitive and should not be committed to version control.

4.  **Run the Development Server:**

    ```bash
    npm run dev
    ```

    _(or `yarn dev`)_

    The application should then be accessible, usually at `http://localhost:5173`.
    
---

## Acknowledgements

- Movie data provided by **The Movie Database (TMDb)**.
- Authentication services provided by **Firebase**.
- AI capabilities powered by **Google Gemini** or **OpenAI**.
