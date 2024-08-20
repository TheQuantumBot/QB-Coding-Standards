# IPFS 

This project provides a simple boilerplate for interacting with IPFS (InterPlanetary File System) using Node.js.

## Features

- Add data to the IPFS network.
- Retrieve data from IPFS using its CID (Content Identifier).
- Easy-to-understand, minimal setup.

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- [IPFS](https://ipfs.io/) installed and running locally or access to a remote IPFS node.

## Installation

1. Clone the repository or download the project files.

2. Navigate to the project directory:

    ```bash
    cd ipfs
    ```

3. Install the required dependencies:

    ```bash
    npm install
    ```

## Usage

1. Ensure that your IPFS daemon is running:

    ```bash
    ipfs daemon
    ```

2. Run the script:

    ```bash
    node index.js
    ```

   This will add a simple string (`Hello, IPFS!`) to the IPFS network and then retrieve it using the generated CID.

## Customization

- **Adding Custom Data**: You can modify the `addData` function in `index.js` to add any data you want to IPFS. Just pass your data to the function.

    ```javascript
    const cid = await addData('Your custom data here');
    ```

- **Retrieving Data**: The `getData` function retrieves the data associated with a given CID. You can pass any valid CID to this function.

    ```javascript
    await getData('Your CID here');
    ```

## Troubleshooting

- **IPFS Not Running**: Ensure that your IPFS daemon is running before executing the script. Use `ipfs daemon` in your terminal to start it.
- **Network Issues**: If you're connecting to a remote IPFS node, make sure the `url` in `index.js` is correctly configured.

## Contributing

Feel free to open issues or submit pull requests if you find bugs or want to add new features.

## License

This project is open-source and available under the [MIT License](LICENSE).
