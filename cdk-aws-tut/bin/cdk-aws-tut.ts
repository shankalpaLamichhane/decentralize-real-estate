#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkAwsTutStack } from '../lib/cdk-aws-tut-stack';

const app = new cdk.App();
new CdkAwsTutStack(app, 'CdkAwsTutStack');
