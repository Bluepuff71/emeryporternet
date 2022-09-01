import { Auth } from "aws-amplify";

export class AuthUtils {
    static async isAuthenticated(): Promise<boolean> {
        return await Auth.currentAuthenticatedUser()
        .then(() => true)
        .catch(() => false);
    }
}