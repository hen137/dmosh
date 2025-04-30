import { GetObjectCommand, GetObjectCommandInput, HeadObjectCommand, HeadObjectCommandInput, S3Client } from '@aws-sdk/client-s3';
import internal, { Readable } from 'stream';

export const s3 = new S3Client({ region: 'us-east-1' });

export function getObject(params: GetObjectCommandInput) {
  return s3.send(new GetObjectCommand(params));
}

export async function getObjectReadable(params: GetObjectCommandInput) {
  const response = await getObject(params);
  return Readable.from(response?.Body as internal.Readable);
}

export async function headObject(params: HeadObjectCommandInput) {
  return s3.send(new HeadObjectCommand(params));
}

export async function getObjectFileSize(params: HeadObjectCommandInput) {
  const { ContentLength } = await headObject(params);
  return ContentLength;
}