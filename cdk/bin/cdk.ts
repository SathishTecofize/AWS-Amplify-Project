#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from "@aws-cdk/core";
import { AmplifyStack } from '../lib/amplify-stack';

const env = {
  account: process.env.AWS_ACCOUNT_ID ?? process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.AWS_REGION ?? process.env.CDK_DEFAULT_REGION,
}
const app = new cdk.App();
new AmplifyStack(app, 'AmplifyStack', { env: env })
