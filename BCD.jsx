const SHA256 = require('crypto-js/sha256');

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block {
    constructor(timestamp, transactions, previoushash = '') {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previoushash = previoushash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.previoushash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString;

    }
    mineblock(difficulty) {
        while (this.hash.sustring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 50;
    }

    createGenesisBlock() {
        return new Block(0, "01/01/2018", "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress){
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineblock(this.difficulty);

        console.log('Block successfully mined!');
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];    
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    getBalanceofAddress(address) {
        let balance = 0;

        for(const block of this.chain){
            for (const trans of block.transactions){
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }

                if(trans.fromAddress === address){
                    balance += trans.amount;
                }
            }

        }
        return balance;
    }


    //addBlock(newBlock) {
        //newBlock.previoushash = this.getLatestBlock().hash;
        //newBlock.mineblock(this.difficulty);
       // this.chain.push(newBlock);
    

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const CurrentBlock = this.chain[i];
            const PreviousBlock = this.chain[i - 1];

            if (CurrentBlock.hash !== CurrentBlock.calculateHash()) {
                return false;
            }

            if (CurrentBlock.previoushash !== PreviousBlock.hash) {
                return false;
      
            }
        }
        return true;
    }
    
}


let cometCoin = new Blockchain();
cometCoin.createTransaction(new.Transaction('address1', 'address2', 100));
cometCoin.createTransaction(new.Transaction('address1', 'address2', 50));

console.log('\n Starting the miner...');
cometCoin.minePendingTransactions('Stephens-address');

console.log('\nBalance of Stephen is ', cometCoin.getBalanceofAddress('Stephens-address'));

console.log('\n Starting the miner...');
cometCoin.minePendingTransactions('Stephens-address');

console.log('\nBalance of Stephen is ', cometCoin.getBalanceofAddress('Stephens-address'));



//console.log('Is blockchain valid?' + cometCoin.isChainValid));
//cometCoin.chain[1].data = { amount = 100 };
//cometCoin.chain[1].hash = cometCoin.chain[1].calculateHash();
//console.log('Is blockchain valid?' + cometCoin.isChainValid));
 