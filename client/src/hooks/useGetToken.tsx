import { useCookies } from "react-cookie";

export function useGetToken() {
  const [cookies, _] = useCookies(["access_token"]);
  return { headers: { authorization: cookies.access_token } };
}
