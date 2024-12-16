import { cookies } from "next/headers";
import LoadingPage from "../../loading";
import RedirectClient from "./RedirectClient";

const SocialLoginRedirect = async () => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token");

  if (token) {
    return <RedirectClient token={token.value} />;
  }

  return (
    <div className="min-h-screen">
      <LoadingPage />
    </div>
  );
};

export default SocialLoginRedirect;
