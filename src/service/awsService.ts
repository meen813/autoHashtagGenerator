import AWS from 'aws-sdk';
import { Buffer } from 'buffer';

const rekognition = new AWS.Rekognition({ region: 'us-west-1' });
const s3 = new AWS.S3({ region: 'us-west-1' });
const bucketName = 'my-image-rekognition-bucket';

interface RekognitionLabel {
  Name?: string;
}

export async function createNewPost(fileBuffer: Buffer, fileName: string, fileType: string): Promise<{ hashtags: string[] }> {
  try {
    const key = `uploads/${Date.now()}_${fileName}`;

    await s3.putObject({
      Bucket: bucketName,
      Key: key,
      Body: fileBuffer,
      ContentType: fileType,
    }).promise();

    const params = {
      Image: {
        S3Object: {
          Bucket: bucketName,
          Name: key,
        },
      },
    };

    const rekognitionResult = await rekognition.detectLabels(params).promise();
    const labels = rekognitionResult.Labels?.map((label: RekognitionLabel) => label.Name?.toLowerCase() ?? '') ?? [];
    const hashtags = labels.map((label: string) => `#${label.replace(/\s+/g, '')}`).filter(Boolean);

    return { hashtags };
  } catch (error) {
    console.error('Error in createNewPost:', error);
    throw error;
  }
}
