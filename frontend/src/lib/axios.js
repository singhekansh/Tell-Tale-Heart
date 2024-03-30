
import axios from "axios";
// import { toast } from "@/components/ui/use-toast";
import { useUserStore } from "@/store/userStore";

const axiosOptions = {
  baseURL: '/api',
}

const API = axios.create(axiosOptions);

const ApiWithAuth = axios.create(axiosOptions)

ApiWithAuth.interceptors.request.use(
  function interceptSuccessfulRequest(config) {
    return new Promise((resolve, reject) => {
      
      // Read Token value from state
      const token = useUserStore.getState().token
      if(!!token) {
        config.headers.Authorization = `Bearer ${token}`
        resolve(config)
      }

      // Wait 5 secons to see if state changes
      const unsub = useUserStore.subscribe((state) => {
        if(!!state.token) {
          config.headers.Authorization = `Bearer ${state.token}`
          unsub()
          resolve(config)
        }
      })
      setTimeout(() => {
        unsub()
        resolve(config)
      }, 5000)
    })
  },
  function interceptFailedRequest(error) {
    return Promise.reject(error)
  }
)

export { API, ApiWithAuth };