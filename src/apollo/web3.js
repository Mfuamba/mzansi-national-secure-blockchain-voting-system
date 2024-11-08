import Web3 from 'web3';

let web3;
if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
        // Request account access if needed
        window.ethereum.enable();
    } catch (error) {
        console.error('User denied account access...');
    }
} else if (window.web3) {
    // Legacy dapp browsers...
    web3 = new Web3(window.web3.currentProvider);
} else {
    // If no injected web3 instance is detected, fall back to Ganache or other
    const provider = new Web3.providers.HttpProvider('http://localhost:8545');
    web3 = new Web3(provider);
}

export default web3;
