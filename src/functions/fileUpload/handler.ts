import { APIGatewayEvent, S3Event } from "aws-lambda";
import { apiResponse } from "src/common/apiResponse";
import { S3 } from 'aws-sdk';

const BUCKET_NAME = process.env.BUCKET_NAME;

export const onFileUpload = async (event: S3Event) => {
    event.Records.forEach((record) => {
        const fileName = record.s3.object.key;
        const fileSize = record.s3.object.size;

        console.log(`New file is uploaded with filename: ${fileName}, size: ${fileSize}`)
    })
}

export const getPreSigned = (event: APIGatewayEvent) => {
    try {
        const s3 = new S3();
        const body = JSON.parse(event.body);
        const { key, action } = body;
        const expireTime = 60 * 5;

        const url = s3.getSignedUrl(action, {
            Bucket: BUCKET_NAME,
            Key: key,
            Expires: expireTime
        })

        return apiResponse._200({ url })

    }
    catch (err) {
        return apiResponse._500({ err });
    }
}