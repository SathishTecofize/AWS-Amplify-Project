import * as cdk from "@aws-cdk/core";
import * as amplify from "@aws-cdk/aws-amplify";
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';


export class AmplifyStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const token = cdk.SecretValue.secretsManager('AmplifyToken', {
            jsonField: 'AmplifyToken',
        });

        const amplifyApp = new amplify.App(this, 'AmplifyApp', {
            sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
                owner: 'SathishTecofize',
                repository: 'AWS-Amplify-Project',
                oauthToken: token,
            }),
            buildSpec: codebuild.BuildSpec.fromObjectToYaml({
                version: '1',
                frontend: {
                    phases: {
                        build: {
                            commands: [
                                'cd sample-app',
                                'npm install',
                                'npm run build',
                            ],
                        },
                    },
                    artifacts: {
                        baseDirectory: 'sample-app/build',
                        files: ['**/*'],
                    },
                    cache: {
                        paths: ['node_modules/**/*'],
                    },
                },
            }),
        });

        const deploy = amplifyApp.addBranch('deploy');

        // Output URL
        new cdk.CfnOutput(this, 'ReactAppUrl', {
            value: amplifyApp.defaultDomain,
            description: 'URL of the deployed React app test',
        });
    }
}
