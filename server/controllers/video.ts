import { Writable } from "stream";
import fs from 'fs';
import { Request, Response } from "express";
import { GetObjectCommand, HeadObjectCommand, S3Client } from "@aws-sdk/client-s3";

export function getLocal(req: Request, res: Response){
    const range = req.headers.range;
    const videoPath = 'C:/Users/henry/Desktop/dmosh/client/src/assets/tokyo-drift-teriyaki-boyz-music-video-hd-ytshorts.mp4';
    const videoSize = fs.statSync(videoPath).size;

    if (!range) {
        const headers = {
            "Accept-Ranges": "bytes",
            "Content-Length": videoSize,
            "Content-Type": "video/mp4"
        }
        res.writeHead(200, headers);
        fs.createReadStream(videoPath).pipe(res);
    } else {
        const CHUNK_SIZE = 10 ** 6;
        const start = Number(range?.replace(/\D/g, ''));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4"
        };

        res.writeHead(206, headers);
        const videoStream = fs.createReadStream(videoPath, {start, end});
        videoStream.pipe(res);
    }
}

export async function getRemote(req: Request, res: Response){
    const range = req.headers.range;
    
    const objParam = {
        Bucket: 'dmosh-media',
        Key: 'tokyo-drift-teriyaki-boyz-music-video-hd-ytshorts.mp4'
    }

    const headers = {
        "Accept-Ranges": "bytes",
        "Content-Type": "video/mp4"
    }
    
    const s3 = new S3Client({
        region: 'us-east-2'
    });
    
    const { ContentLength } = await s3.send(new HeadObjectCommand(objParam)); 
    
    if (!range) {
        const obj = await s3.send(new GetObjectCommand(objParam));
        
        res.status(200).set({
            ...headers,
            "Content-Length": ContentLength,
        });
        obj.Body!.transformToWebStream().pipeTo(Writable.toWeb(res));
    } else {
        const CHUNK_SIZE = 10 ** 6;
        const start = Number(range?.replace(/\D/g, ''));
        const end = Math.min(start + CHUNK_SIZE, ContentLength! - 1);
        const contentLength = end - start + 1;
        
        const obj = await s3.send(new GetObjectCommand({
            ...objParam,
            Range: `bytes=${start}-${end}`
        }));
        
        res.writeHead(206, {
            ...headers,
            "Content-Range": `bytes ${start}-${end}/${ContentLength}`,
            "Content-Length": contentLength
        });
        obj.Body!.transformToWebStream().pipeTo(Writable.toWeb(res));
    }
}