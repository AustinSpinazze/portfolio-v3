import { fetchData } from '@/lib/fecthData';

function useAnalytics() {
  async function trackEvent(event) {
    try {
      const { error } = await fetchData('/api/track-event', {
        method: 'POST',
        body: event,
      });
      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  }

  return [trackEvent];
}

export default useAnalytics;
