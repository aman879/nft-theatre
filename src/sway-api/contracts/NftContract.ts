/* Autogenerated file. Do not edit manually. */

/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/consistent-type-imports */

/*
  Fuels version: 0.94.6
  Forc version: 0.63.5
  Fuel-Core version: 0.35.0
*/

import { Contract, Interface } from "fuels";
import type {
  Provider,
  Account,
  StorageSlot,
  AbstractAddress,
  BigNumberish,
  BN,
  FunctionFragment,
  InvokeFunction,
} from 'fuels';

import type { Option, Enum } from "./common";

export type IdentityInput = Enum<{ Address: AddressInput, ContractId: ContractIdInput }>;
export type IdentityOutput = Enum<{ Address: AddressOutput, ContractId: ContractIdOutput }>;
export enum MintErrorInput { CannotMintMoreThanOneNFTWithSubId = 'CannotMintMoreThanOneNFTWithSubId', NFTAlreadyMinted = 'NFTAlreadyMinted' };
export enum MintErrorOutput { CannotMintMoreThanOneNFTWithSubId = 'CannotMintMoreThanOneNFTWithSubId', NFTAlreadyMinted = 'NFTAlreadyMinted' };

export type AddressInput = { bits: string };
export type AddressOutput = AddressInput;
export type AssetIdInput = { bits: string };
export type AssetIdOutput = AssetIdInput;
export type ContractIdInput = { bits: string };
export type ContractIdOutput = ContractIdInput;
export type NFTDataInput = { id: BigNumberish, owner: IdentityInput, uri: string };
export type NFTDataOutput = { id: BN, owner: IdentityOutput, uri: string };

const abi = {
  "programType": "contract",
  "specVersion": "1",
  "encodingVersion": "1",
  "concreteTypes": [
    {
      "type": "()",
      "concreteTypeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
    },
    {
      "type": "b256",
      "concreteTypeId": "7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b"
    },
    {
      "type": "enum error::MintError",
      "concreteTypeId": "916cde9a36b8768ce09f0c573c2af5479b0c48ed096dd2292679a062e18405ef",
      "metadataTypeId": 0
    },
    {
      "type": "enum std::option::Option<b256>",
      "concreteTypeId": "0c2beb9013490c4f753f2757dfe2d8340b22ce3827d596d81d249b7038033cb6",
      "metadataTypeId": 2,
      "typeArguments": [
        "7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b"
      ]
    },
    {
      "type": "str[60]",
      "concreteTypeId": "7d01ef1a17787dea629de1bf499142ae506f0a213f985243d18928aef5354429"
    },
    {
      "type": "struct NFTData",
      "concreteTypeId": "2e9bd7d259db33258349d99eca49fa858fcdbac5099ee987b1c02921fb26873d",
      "metadataTypeId": 4
    },
    {
      "type": "struct std::asset_id::AssetId",
      "concreteTypeId": "c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974",
      "metadataTypeId": 6
    },
    {
      "type": "u64",
      "concreteTypeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
    }
  ],
  "metadataTypes": [
    {
      "type": "enum error::MintError",
      "metadataTypeId": 0,
      "components": [
        {
          "name": "CannotMintMoreThanOneNFTWithSubId",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          "name": "NFTAlreadyMinted",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        }
      ]
    },
    {
      "type": "enum std::identity::Identity",
      "metadataTypeId": 1,
      "components": [
        {
          "name": "Address",
          "typeId": 5
        },
        {
          "name": "ContractId",
          "typeId": 7
        }
      ]
    },
    {
      "type": "enum std::option::Option",
      "metadataTypeId": 2,
      "components": [
        {
          "name": "None",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          "name": "Some",
          "typeId": 3
        }
      ],
      "typeParameters": [
        3
      ]
    },
    {
      "type": "generic T",
      "metadataTypeId": 3
    },
    {
      "type": "struct NFTData",
      "metadataTypeId": 4,
      "components": [
        {
          "name": "id",
          "typeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        },
        {
          "name": "owner",
          "typeId": 1
        },
        {
          "name": "uri",
          "typeId": "7d01ef1a17787dea629de1bf499142ae506f0a213f985243d18928aef5354429"
        }
      ]
    },
    {
      "type": "struct std::address::Address",
      "metadataTypeId": 5,
      "components": [
        {
          "name": "bits",
          "typeId": "7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b"
        }
      ]
    },
    {
      "type": "struct std::asset_id::AssetId",
      "metadataTypeId": 6,
      "components": [
        {
          "name": "bits",
          "typeId": "7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b"
        }
      ]
    },
    {
      "type": "struct std::contract_id::ContractId",
      "metadataTypeId": 7,
      "components": [
        {
          "name": "bits",
          "typeId": "7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b"
        }
      ]
    }
  ],
  "functions": [
    {
      "inputs": [],
      "name": "constructor",
      "output": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d",
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "write"
          ]
        }
      ]
    },
    {
      "inputs": [
        {
          "name": "id",
          "concreteTypeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        }
      ],
      "name": "get_nft_data",
      "output": "2e9bd7d259db33258349d99eca49fa858fcdbac5099ee987b1c02921fb26873d",
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read"
          ]
        }
      ]
    },
    {
      "inputs": [],
      "name": "get_total_count",
      "output": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0",
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read"
          ]
        }
      ]
    },
    {
      "inputs": [
        {
          "name": "sub_id",
          "concreteTypeId": "0c2beb9013490c4f753f2757dfe2d8340b22ce3827d596d81d249b7038033cb6"
        },
        {
          "name": "_uri",
          "concreteTypeId": "7d01ef1a17787dea629de1bf499142ae506f0a213f985243d18928aef5354429"
        }
      ],
      "name": "mint",
      "output": "c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974",
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read",
            "write"
          ]
        }
      ]
    }
  ],
  "loggedTypes": [
    {
      "logId": "10478995186908690060",
      "concreteTypeId": "916cde9a36b8768ce09f0c573c2af5479b0c48ed096dd2292679a062e18405ef"
    }
  ],
  "messagesTypes": [],
  "configurables": []
};

const storageSlots: StorageSlot[] = [
  {
    "key": "0b1f6bd52ed4a44a28beeca29e5322bd0972c0b3263eeaba255eda108bff0ba5",
    "value": "0000000000000000000000000000000000000000000000000000000000000000"
  },
  {
    "key": "1d63cc2495bbf5570c9a6d7f632018dc033107e7f4452405c44601bb771a4a5d",
    "value": "0000000000000000000000000000000000000000000000000000000000000000"
  },
  {
    "key": "1d63cc2495bbf5570c9a6d7f632018dc033107e7f4452405c44601bb771a4a5e",
    "value": "0000000000000000000000000000000000000000000000000000000000000000"
  }
];

export class NftContractInterface extends Interface {
  constructor() {
    super(abi);
  }

  declare functions: {
    constructor: FunctionFragment;
    get_nft_data: FunctionFragment;
    get_total_count: FunctionFragment;
    mint: FunctionFragment;
  };
}

export class NftContract extends Contract {
  static readonly abi = abi;
  static readonly storageSlots = storageSlots;

  declare interface: NftContractInterface;
  declare functions: {
    constructor: InvokeFunction<[], void>;
    get_nft_data: InvokeFunction<[id: BigNumberish], NFTDataOutput>;
    get_total_count: InvokeFunction<[], BN>;
    mint: InvokeFunction<[sub_id: Option<string>, _uri: string], AssetIdOutput>;
  };

  constructor(
    id: string | AbstractAddress,
    accountOrProvider: Account | Provider,
  ) {
    super(id, abi, accountOrProvider);
  }
}
