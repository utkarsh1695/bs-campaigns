import { fetchCampaignData } from "../../services";
import { STORAGE_DATA_KEY } from "../../constants";

export const fetchData = () =>
  fetchCampaignData().then(res => {
    const past = [], present = [], future = [];
    res.forEach(campaign => {
      const { createdOn } = campaign;
      const today = new Date();
      const campaignDate = new Date(createdOn);
      if (campaignDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
        const daysDiff = parseInt((today.getTime() - campaignDate.getTime()) / (1000 * 60 * 60 * 24));
        campaign = { ...campaign, durationText: `${daysDiff} Days Ago` };
        past.push(campaign);
      }
      else if (campaignDate.setHours(0, 0, 0, 0) > today.setHours(0, 0, 0, 0)) {
        const daysDiff = parseInt((campaignDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        campaign = { ...campaign, durationText: `${daysDiff} Days Ahead` };
        future.push(campaign);
      }
      else {
        campaign = { ...campaign, durationText: 'Today' };
        present.push(campaign);
      }
    });
    localStorage.setItem(STORAGE_DATA_KEY, JSON.stringify({ past, present, future }));
    return { past, present, future };
  })