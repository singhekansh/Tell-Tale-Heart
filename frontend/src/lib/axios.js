
import axios from "axios";
import { toast } from "@/components/ui/toast";
import { useUserStore } from "@/store/userStore";

const axiosOptions = {
  baseURL: '/api',
}

const API = axios.create(axiosOptions);

const ApiWithAuth = axios.create(axiosOptions)

ApiWithAuth.interceptors.request.use(
  async function interceptSuccessfulRequest(config) {
    const token = useUserStore((state) => state.token);
    if(!token) {
      toast({
        title: 'You are not authorized to do this operation.',
      })
      throw new Error('No access token found.')
    } else {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function interceptFailedRequest(error) {
    return Promise.reject(error)
  }
)

export { API, ApiWithAuth };