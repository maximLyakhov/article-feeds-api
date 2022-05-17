import { Callback, Context } from 'aws-lambda';
import * as main from './main';

describe('main.ts', () => {
  it('Should bootstrap application', () => {
    const mockBootstrap = jest.spyOn(main, 'bootstrap');
    main.bootstrap();
    expect(mockBootstrap).toBeCalled();
  });

  it('Should provide handler for lambda', async () => {
    const event: any = { Records: [{ cf: '' }] };
    const context: Context = {
      callbackWaitsForEmptyEventLoop: false,
      functionName: 'string',
      functionVersion: '0.2',
      invokedFunctionArn: '',
      memoryLimitInMB: '512',
      awsRequestId: 'string',
      logGroupName: 'string',
      logStreamName: 'string',
      getRemainingTimeInMillis: () => 0,
      done: () => true,
      fail: () => true,
      succeed: () => false,
    };
    const callback: Callback = () => {
      return;
    };

    const mockHandler = jest.spyOn(main, 'handler');
    main.handler(event, context, callback);
    expect(mockHandler).toBeCalled();
  });
});
