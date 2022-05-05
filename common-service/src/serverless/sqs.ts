import type { AWS } from '@serverless/typescript';


const SQSResource: AWS['resources']['Resources'] = {
    StepQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
            QueueName: 'DemoQueue'
        }
    }
}


export default SQSResource;