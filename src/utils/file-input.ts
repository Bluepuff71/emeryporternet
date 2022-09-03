import type { S3ObjectInput } from "@/api";

export interface FileInputData {
    readonly s3InputData: S3ObjectInput;
    readonly file: File;
}