import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';
import { Contract as EthContract } from 'web3-eth-contract';
import { Environment } from './Environment';
import { Transaction, Deployment } from './Transaction';
import { Address } from './Address';
import { toBigNumber } from './utils/toBigNumber';

interface CreateTransactionArgs<TArgs> {
  method: string;
  from: Address;
  args?: TArgs;
  value?: BigNumber;
  validate?: () => Promise<void>;
  amgu?: (gas: number) => Promise<BigNumber>;
  incentive?: (gas: number) => Promise<BigNumber>;
}

export class Contract {
  public static readonly abi: AbiItem[];
  public readonly contract: EthContract;

  constructor(environment: Environment, contract: EthContract);
  constructor(environment: Environment, address: Address);
  constructor(environment: Environment, address: any);
  constructor(public readonly environment: Environment, address: any) {
    const abi = (this.constructor as typeof Contract).abi;
    this.contract = typeof address === 'string' ? new environment.client.Contract(abi, address) : address;
  }

  public static createDeployment<TContract extends Contract, TArgs extends any[] = any[]>(
    environment: Environment,
    bytecode: string,
    from: Address,
    args?: TArgs,
  ) {
    const contract = new environment.client.Contract(this.abi);
    const transaction = contract.deploy({
      ...(args && { arguments: args }),
      data: bytecode,
    });

    return new Deployment<TContract>(this, environment, transaction, from, args);
  }

  protected createTransaction<TArgs extends any[] = any[]>(args: CreateTransactionArgs<TArgs>) {
    const fn = this.contract.methods[args.method];

    return new Transaction(
      fn(...(args.args || [])),
      this.environment,
      args.from,
      this.contract,
      args.method,
      args.args,
      args.value,
      args.validate,
      args.amgu,
      args.incentive,
    );
  }

  protected async makeCall<TReturn = any, TArgs extends any[] = any[]>(
    method: string,
    args?: TArgs,
    block?: number,
  ): Promise<TReturn> {
    const address = this.contract.address;
    const cache = block && this.environment.cache;

    try {
      const key = cache && `${address}:${block}:${method}${args ? `:${JSON.stringify(args)}` : ''}`;
      if (cache && cache.has(key)) {
        return cache.get(key)!;
      }

      const promise = this.doMakeCall(method, args, block);
      cache && cache.set(key, promise);

      return await promise;
    } catch (e) {
      throw new Error(`Failed to call ${method} at ${address}: ${e}`);
    }
  }

  private doMakeCall<TReturn = any, TArgs extends any[] = any[]>(
    method: string,
    args?: TArgs,
    block?: number,
  ): Promise<TReturn> {
    const fn = this.contract.methods[method];
    return fn(...(args || [])).call(undefined, block);
  }

  public async getEthBalance(block?: number) {
    const result = await this.environment.client.getBalance(this.contract.address, block);
    return toBigNumber(result);
  }
}
