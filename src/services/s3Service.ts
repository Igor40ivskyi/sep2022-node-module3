import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { configs } from "../configs";

class S3Service {
  constructor(
    private client = new S3Client({
      region: configs.AWS_S3_REGION,
      credentials: {
        accessKeyId: configs.AWS_ACCESS_KEY,
        secretAccessKey: configs.AWS_SECRET_KEY,
      },
    })
  ) {}
  public async uploadPhoto(
    file: any,
    itemType: string,
    itemId: string
  ): Promise<string> {
    await this.client.send(
      new PutObjectCommand({
        Bucket: configs.AWS_S3_NAME,
        Key: "", // TODO
        Body: file.data,
        ContentType: file, //TODO
        ACL: configs.AWS_S3_ACL,
      })
    );
  }
}

export const s3Service = new S3Service();
