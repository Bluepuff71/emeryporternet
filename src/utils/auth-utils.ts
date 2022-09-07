import { Auth } from "@aws-amplify/auth";

export async function isAuthenticated(): Promise<boolean> {
  return Auth.currentAuthenticatedUser()
    .then(() => true)
    .catch(() => false);
}

export async function getAuthMode(): Promise<"AWS_IAM" | undefined> {
  return (await isAuthenticated()) ? undefined : "AWS_IAM";
}
