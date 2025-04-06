# GitHub Profile Analyzer

A modern, responsive web application that allows users to analyze GitHub profiles, explore repositories, and visualize contribution patterns. Built with React, TypeScript, and Tailwind CSS.

**Live Demo**: [GitHub Profile Analyzer](https://git-analyzer-sigma.vercel.app/)

## Features

- **User Profile Analysis**: Fetch and display detailed information about any GitHub user
- **Repository Overview**: View a user's most recently updated repositories with key metrics
- **Contribution Visualization**: Interactive chart showing commit activity over time
- **Responsive Design**: Optimized for all devices from mobile to desktop
- **GitHub Authentication**: Optional GitHub Personal Access Token integration to increase API rate limits
- **Dark Mode Support**: Beautiful dark theme for comfortable viewing

## Screenshots

### Landing Page
![Screenshot (42)](https://github.com/user-attachments/assets/5d4481f6-ae6e-4fe0-a1ab-baf905049316)


### Profile View
![Screenshot 2025-04-06 234750](https://github.com/user-attachments/assets/57ec72e5-24f4-4128-9dcc-ca4b4c665b45)


### Commit Activity Chart
![Screenshot 2025-04-06 234817](https://github.com/user-attachments/assets/344e21c0-777c-4311-9338-16c504b4fdde)


## Technology Stack

- **React**: Frontend library for building the user interface
- **TypeScript**: Type-safe JavaScript for improved developer experience
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Shadcn UI**: Component library for consistent design
- **Recharts**: Chart library for data visualization
- **GitHub API**: For fetching user data, repositories, and commit statistics

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/github-profile-analyzer.git
   cd github-profile-analyzer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173` to see the application running.

## Usage

1. **Enter a GitHub Username**: Type any valid GitHub username in the search box.

2. **Add GitHub Token (Optional)**: To avoid API rate limits, you can add a GitHub Personal Access Token.
   - Create a token at [GitHub Token Settings](https://github.com/settings/tokens/new)
   - Only public access is required for public repositories
   - The token is stored in your browser's localStorage for persistence

3. **Explore Data**: Once a profile is loaded, you can browse through:
   - User profile information and statistics
   - Recent repositories with star counts, language, and last update
   - Commit activity chart showing the user's contribution patterns

## Deployment

### Deploy to Vercel

1. Fork this repository and create a Vercel account if you don't have one already.

2. Connect Vercel to your GitHub account.

3. Import this repository in Vercel:
   - Click "Import Project"
   - Select "Import Git Repository"
   - Choose the forked repository
   - Use the following settings:
     - Framework Preset: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`

4. Click "Deploy" and wait for the build to complete.

### Deploy to Netlify

1. Fork this repository and create a Netlify account if you don't have one already.

2. Click "New site from Git" in the Netlify dashboard.

3. Connect to your GitHub account and select the forked repository.

4. Configure the build settings:
   - Build Command: `npm run build`
   - Publish Directory: `dist`

5. Click "Deploy site" and wait for the build to complete.

## Environment Variables

No environment variables are required for this project since GitHub authentication is handled client-side through the Personal Access Token input.

## Limitations

- GitHub API has rate limits for unauthenticated requests (60 per hour)
- Adding a Personal Access Token increases this limit to 5,000 requests per hour
- The application currently fetches the 10 most recently updated repositories for a user
- Commit activity data might not be available for all repositories

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [GitHub API](https://docs.github.com/en/rest) for providing access to user data
- [React](https://reactjs.org/) for the frontend framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [Recharts](https://recharts.org/) for the data visualization
- [Lucide Icons](https://lucide.dev/) for the beautiful icons

---

Made with ❤️ by [Saad Shaikh](https://github.com/saadshaikh1023)
