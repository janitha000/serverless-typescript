import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import { createUser, getUserById, getUsers } from '@functions/user'
import { expressRoutes } from '@functions/express'
import { createSchedule, getCloudFormationOutput, scheduled } from '@functions/schedules';

const serverlessConfiguration: AWS = {
  service: 'serverless-typescript',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-stack-output', 'serverless-step-functions'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'ap-southeast-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: { hello, createUser, getUsers, expressRoutes, getUserById, scheduled, createSchedule, getCloudFormationOutput },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  }

};

module.exports = serverlessConfiguration;
