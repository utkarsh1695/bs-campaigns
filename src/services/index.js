import { DUMMY_DATA } from "./constants"

export const fetchCampaignData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(DUMMY_DATA)
    }, 2000)
  })
}