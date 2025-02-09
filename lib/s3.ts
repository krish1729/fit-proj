import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { currentUser } from "@clerk/nextjs/server";
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
    profile: string,
    week: string,
    maxWidth: number = 1200,
  ): Promise<ImageUploadResult> {
    try {
      const user = await currentUser();
      const emailAddress = user?.emailAddresses[0]?.emailAddress || "";
      const username = emailAddress.split("@")[0];

      const processedBuffer = await sharp(buffer)
        .jpeg({ quality: 80 })
        .resize(maxWidth, null, { withoutEnlargement: true })
        .toBuffer();

      // Trim any quotes and whitespace from the inputs
      const sanitizedWeek = week.replace(/['"]/g, "").trim();
      const sanitizedProfile = profile.replace(/['"]/g, "").trim();
      const key = `uploads/${username}/${sanitizedWeek}/${sanitizedProfile}.jpg`;

      await s3client.send(
        new PutObjectCommand({
          Bucket: this.bucketName,
          Key: key,
          Body: processedBuffer,
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

  // lib/s3.ts
  async getImage(profile: string, week: string) {
    try {
      const user = await currentUser();
      if (!user?.emailAddresses[0]?.emailAddress) {
        throw new Error("User email not found");
      }

      const username = user.emailAddresses[0].emailAddress.split("@")[0];
      const key = `uploads/${username}/${week}/${profile}.jpg`;

      const response = await s3client.send(
        new GetObjectCommand({
          Bucket: "fitprojbucket",
          Key: key,
        }),
      );

      // Convert stream to base64
      const buffer = Buffer.from(await response.Body.transformToByteArray());
      const imageUrl = `data:${response.ContentType};base64,${buffer.toString("base64")}`;

      return { imageUrl };
    } catch (error) {
      console.error("Error retrieving image: ", error);
      throw new Error("Failed to retrieve image");
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
