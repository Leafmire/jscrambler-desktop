# jscrambler-desktop

A desktop application for obfuscating JavaScript files using JScrambler. It provides an intuitive user interface to select input and output directories, configure JScrambler settings, and perform JavaScript obfuscation. The application is built using Electron, allowing for cross-platform compatibility and easy distribution.

## Features

- Select input and output directories for JavaScript files
- Configure JScrambler settings (API Key, API Secret, App ID)
- Perform JavaScript obfuscation using JScrambler
- Automatically open the output directory upon completion
- Cross-platform compatibility (Windows, macOS, Linux)

## Prerequisites

- Node.js
- npm

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Leafmire/jscrambler-desktop
   ```

2. Navigate to the project directory:

   ```bash
   cd jscrambler-desktop
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## Development

To run the application in development mode, use the following command:

```bash
npm run start
```

This will start the Electron application and open the main window.

## Building

To build the application for distribution, we use [Electron Forge](https://www.electronforge.io/). Electron Forge simplifies the process of packaging and distributing Electron applications.

To create a distributable package, run the following command:

```bash
npm run make
```

This command will create a distributable package for your current platform in the `out` directory.

Make sure to configure the necessary publishing settings in the `package.json` file before running the publish command. Refer to the [Electron Forge documentation](https://www.electronforge.io/config/publishers) for more information on configuring publishers.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
