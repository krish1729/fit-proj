import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import sharp from "sharp";

interface ImageUploadResult {
  url: string;
  key: string;
  metadata: {
    width: number;
    height: number;
    size: number;
  };
}

const s3client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export class S3ImageService {
  private baseUrl: string;
  private bucketName: string;

  constructor() {
    this.bucketName = process.env.AWS_BUCKET_NAME!;
    this.baseUrl = `https://${this.bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com;`;
  }

  async uploadImage(
    buffer: Buffer,
    originalFileName: string,
    maxWidth: number = 1200,
  ): Promise<ImageUploadResult> {
    try {
      const processedBuffer = await sharp(buffer)
        .jpeg({ quality: 80 })
        .resize(maxWidth, null, { withoutEnlargement: true })
        .toBuffer();
      const key = `uploads/${randomUUID()}.jpg`;
      await s3client.send(
        new PutObjectCommand({
          Bucket: this.bucketName,
          Key: key,
          Body: buffer,
          ContentType: "image/jpg",
          CacheControl: "public, max-age=31536000",
          ACL: "public-read",
        }),
      );
      const metadata = await sharp(processedBuffer).metadata();
      return {
        url: `${this.baseUrl}/${key}`,
        key,
        metadata: {
          width: metadata.width!,
          height: metadata.height!,
          size: processedBuffer.length,
        },
      };
    } catch (error) {
      console.error("Error uploading image: ", error);
      throw new Error("Failed to upload image");
    }
  }

  async deleteImage(key: string): Promise<void> {
    try {
      await s3client.send(
        new DeleteObjectCommand({
          Bucket: this.bucketName,
          Key: key,
        }),
      );
    } catch (error) {
      console.error("Error deleting image: ", error);
      throw new Error("Failed to delete image");
    }
  }
}

export const s3ImageService = new S3ImageService();
