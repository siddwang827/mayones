const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const uuid = require('uuid').v4;
const cloudforntDomain = process.env.CLOUDFRONT_DOMAIN

const s3Upload = async (file, directory) => {
    const s3client = new S3Client();

    const param = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `upload/${directory}/${uuid()}-${file.originalname}`,
        Body: file.buffer
    };

    const result = await s3client.send(new PutObjectCommand(param))

    return {
        result,
        url: `${cloudforntDomain}${param.Key}`
    }
}

const s3UploadMulti = async (files, directory) => {
    const s3client = new S3Client();

    const params = files.map((file) => {
        return {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `upload/${directory}/${uuid()}-${file.originalname}`,
            Body: file.buffer
        }
    });

    return await Promise.all(params.map(async (param) => {
        const result = await s3client.send(new PutObjectCommand(param))
        return {
            result,
            url: `${cloudforntDomain}${param.Key}`
        }
    }))
}



module.exports = { s3Upload, s3UploadMulti }