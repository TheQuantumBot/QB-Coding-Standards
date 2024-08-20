const { create } = require('ipfs-http-client');

// Initialize IPFS client
const ipfs = create({ url: 'http://localhost:5001' });

// Function to add data to IPFS
async function addData(data) {
    try {
        const { path } = await ipfs.add(data);
        console.log(`Data added to IPFS with CID: ${path}`);
        return path;
    } catch (error) {
        console.error('Error adding data to IPFS:', error);
    }
}

// Function to retrieve data from IPFS
async function getData(cid) {
    try {
        let data = '';
        for await (const chunk of ipfs.cat(cid)) {
            data += chunk.toString();
        }
        console.log(`Data retrieved from IPFS: ${data}`);
        return data;
    } catch (error) {
        console.error('Error retrieving data from IPFS:', error);
    }
}

// Example usage
(async () => {
    const cid = await addData('Hello, IPFS!');
    if (cid) {
        await getData(cid);
    }
})();
