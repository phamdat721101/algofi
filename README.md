# AlgoFi: Decentralized Prediction Market on Algorand

AlgoFi is a decentralized prediction market built on the Algorand blockchain. It allows users to create, trade, and settle prediction markets on various topics, leveraging the speed, security, and low transaction costs of Algorand.

## Project Structure

The AlgoFi project is organized into three main components:

1. **algoFi**: The core application, following the standard AlgoKit repository structure.
2. **algo_service**: A backend service to handle off-chain operations.
3. **algo_bot**: A chat application to provide a simple UX for traditional users to interact with the Algorand chain.

### 1. algoFi

The main AlgoFi application follows the standard AlgoKit repository structure:

- `algofi/projects/algofi-contracts`: Contains Algorand smart contracts for market creation, trading, and settlement.
- `algofi/projects/algofi-frontend`: React-based web application for interacting with the prediction markets.
- `/tests`: Unit and integration tests for both smart contracts and frontend.
- `/scripts`: Utility scripts for deployment, testing, and maintenance.

### 2. algo_service

The algo_service is a backend service that handles off-chain operations:

- Market data aggregation and caching
- User authentication and profile management
- Notification services
- Integration with external data sources for market resolution

### 3. algo_bot

The algo_bot is a chat application designed to simplify the user experience for traditional users:

- Natural language interface for creating and participating in prediction markets
- Simplified market browsing and trading commands
- User-friendly explanations of Algorand concepts and AlgoFi features

## Setup and Installation

### Prerequisites

- Node.js (v14 or later)
- Python (v3.8 or later)
- AlgoKit CLI
- Algorand Node (or access to a node via API)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/phamdat721101/algofi
   cd algofi
   ```

2. Set up the algoFi core application:
   ```
   cd algoFi
   algokit bootstrap
   ```

3. Set up the algo_service:
   ```
   cd ../algo_service
   pip install -r requirements.txt
   ```

4. Set up the algo_bot:
   ```
   cd ../algo_bot
   npm install
   ```

## Usage

### Running the algoFi Application

1. Start the Algorand node or connect to a testnet/mainnet node.
2. Deploy the smart contracts:
   ```
   cd algoFi/smart_contracts
   algokit deploy
   ```
3. Start the frontend application:
   ```
   cd algoFi/frontend
   npm start
   ```

### Running the algo_service

1. Configure the service settings in `config.yaml`.
2. Start the service:
   ```
   cd algo_service
   python main.py
   ```

### Running the algo_bot

1. Configure the bot settings in `.env`.
2. Start the bot:
   ```
   cd algo_bot
   npm start
   ```

## Contributing

We welcome contributions to AlgoFi! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes and commit them with clear, descriptive messages
4. Push your changes to your fork
5. Submit a pull request to the main repository

Please ensure your code adheres to our coding standards and includes appropriate tests.

## License

AlgoFi is released under the MIT License. See the [LICENSE](LICENSE) file for details.
