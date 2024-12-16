import { jwtDecode } from "jwt-decode";

const extractUserInfo = (token: string) => {
  try {
    const decodedToken: any = jwtDecode(token);
    const userInfo = {
      id: decodedToken.id,
      name: decodedToken.name,
      email: decodedToken.sub,
      role: decodedToken.role,
    };
    return userInfo;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default extractUserInfo;
