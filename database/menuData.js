export async function getMenuData() {
    try {
      const response = await fetch('/api/menu');
      if (!response.ok) {
        throw new Error('Failed to fetch menu data');
      }
      const data = await response.json();
      return data.menu;
    } catch (error) {
      console.error('Error fetching menu data:', error);
      return [];
    }
  }
  