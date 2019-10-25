import { AbiItem } from 'web3-utils';

// tslint:disable-next-line:variable-name
export const UserWhitelistAbi = [
  {
    constant: false,
    inputs: [{ name: '_members', type: 'address[]' }],
    name: 'batchRemoveFromWhitelist',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      { name: 'sig', type: 'bytes4' },
      { name: 'addresses', type: 'address[5]' },
      { name: 'values', type: 'uint256[3]' },
      { name: 'identifier', type: 'bytes32' },
    ],
    name: 'rule',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'position',
    outputs: [{ name: '', type: 'uint8' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: 'owner_', type: 'address' }],
    name: 'setOwner',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: '_members', type: 'address[]' }],
    name: 'batchAddToWhitelist',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'identifier',
    outputs: [{ name: '', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: 'authority_', type: 'address' }],
    name: 'setAuthority',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: '_who', type: 'address' }],
    name: 'removeFromWhitelist',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'authority',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '', type: 'address' }],
    name: 'whitelisted',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: '_who', type: 'address' }],
    name: 'addToWhitelist',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: '_preApproved', type: 'address[]' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  { anonymous: false, inputs: [{ indexed: true, name: 'who', type: 'address' }], name: 'ListAddition', type: 'event' },
  { anonymous: false, inputs: [{ indexed: true, name: 'who', type: 'address' }], name: 'ListRemoval', type: 'event' },
  {
    anonymous: false,
    inputs: [{ indexed: true, name: 'authority', type: 'address' }],
    name: 'LogSetAuthority',
    type: 'event',
  },
  { anonymous: false, inputs: [{ indexed: true, name: 'owner', type: 'address' }], name: 'LogSetOwner', type: 'event' },
] as AbiItem[];
