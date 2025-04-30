import { Request, Response } from "express";
import mime from 'mime-types';
import { bucket } from "../config";
import { getObjectFileSize, getObjectReadable } from "../utils/s3.ts"

export async function getVideos(req: Request, res: Response){

};

export async function getVideo(req: Request, res: Response) {
    try {
        // Get the mime type and ensure it's a video
        const mimeType = mime.lookup(req.url);
        if (!mimeType.startsWith('video/')) throw Error(`Invalid mime type - ${req.url}`);
        // Get the key to be used in S3
        const key = req.params[0];

        // Use the getObjectFileSize function to determine the full size of the video
        const videoSize = await getObjectFileSize({
            Key: key,
            Bucket: bucket,
        });

        // On initial page load, we don't have a "range" header
        if (!req.headers.range) {
            // Get the entire stream with no byte range
            const stream = await getObjectReadable({
                Key: key,
                Bucket: bucket,
            });

            // We need to send the entire video size to the server in the Content-Length header
            res.writeHead(200, {
                'Content-Length': videoSize,
                'Content-Type': mimeType
            });
            // Pipe the stream from S3 to the response
            stream.pipe(res);
        } else {
            // Using the range header, we are able to determine the start and end chunks, adjusting for the next video chunk
            // Credit for this code goes to: https://github.com/caiogondim/video-stream.js
            const { range } = req.headers;
            const parts = range.replace(/bytes=/, ``).split(`-`);
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : videoSize - 1;
            const chunkSize = (end - start) + 1;

            // We must send a 206 Partial Content status code to stream video
            // We also add a content range, which includes which bytes are being sent
            res.writeHead(206, {
                'Content-Range': `bytes ${start}-${end}/${videoSize}`,
                'Accept-Ranges': `bytes`,
                'Content-Length': chunkSize,
                'Content-Type': mimeType
            });

            // The difference between this getObjectReadable call and the call above is that we
            // use S3's "Range" parameter to get a byte range from the stream
            const stream = await getObjectReadable({
                Key: key,
                Bucket: bucket,
                Range: `bytes=${start}-${end}`
            });
            // Pipe the stream from S3 to the response
            stream.pipe(res);
        }
    } catch (error) {
        // Catch any errors
        // If you want, you can be more thorough here and send a 404 response in the event the video file does not exist,
        // but I will keep it simple for demonstration purposes
        console.error(error);
        res.status(500).send({
            message: 'Could not get video'
        });
    }
}