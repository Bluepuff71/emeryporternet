import { Auth } from "@aws-amplify/auth";

export class AuthUtils {
  static async isAuthenticated(): Promise<boolean> {
    return Auth.currentAuthenticatedUser()
      .then(() => true)
      .catch(() => false);
  }

  static async getAuthMode(): Promise<"AWS_IAM" | undefined> {
    return (await this.isAuthenticated()) ? undefined : "AWS_IAM";
  }
}
