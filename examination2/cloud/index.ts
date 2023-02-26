import AWS from "aws-sdk"

// authenticate with S3

async function uploadFileToS3() {
    const s3 = new AWS.S3({
        credentials: {
            accessKeyId: "",

        }
    })
}