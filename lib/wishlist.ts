/**
 * Wishlist utility for managing favorite tours in localStorage
 */

export interface WishlistTour {
  id: string;
  title: string;
  image: string;
  description: string;
  price?: string;
  duration?: string;
  location?: string;
  addedDate: string;
  bokunExperienceId?: string;
}

const WISHLIST_KEY = "travel-wishlist";

export const wishlistUtils = {
  /**
   * Get all wishlist items from localStorage
   */
  getWishlist: (): WishlistTour[] => {
    if (typeof window === "undefined") return [];

    try {
      const data = localStorage.getItem(WISHLIST_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error reading wishlist:", error);
      return [];
    }
  },

  /**
   * Add a tour to wishlist
   */
  addToWishlist: (tour: Omit<WishlistTour, "addedDate">): boolean => {
    if (typeof window === "undefined") return false;

    try {
      const wishlist = wishlistUtils.getWishlist();

      // Check if already in wishlist
      if (wishlist.some((item) => item.id === tour.id)) {
        return false;
      }

      const newItem: WishlistTour = {
        ...tour,
        addedDate: new Date().toISOString(),
      };

      wishlist.push(newItem);
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
      return true;
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      return false;
    }
  },

  /**
   * Remove a tour from wishlist
   */
  removeFromWishlist: (id: string): boolean => {
    if (typeof window === "undefined") return false;

    try {
      const wishlist = wishlistUtils.getWishlist();
      const filtered = wishlist.filter((item) => item.id !== id);
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      return false;
    }
  },

  /**
   * Check if a tour is in wishlist
   */
  isInWishlist: (id: string): boolean => {
    if (typeof window === "undefined") return false;

    try {
      const wishlist = wishlistUtils.getWishlist();
      return wishlist.some((item) => item.id === id);
    } catch (error) {
      console.error("Error checking wishlist:", error);
      return false;
    }
  },

  /**
   * Clear all wishlist items
   */
  clearWishlist: (): boolean => {
    if (typeof window === "undefined") return false;

    try {
      localStorage.removeItem(WISHLIST_KEY);
      return true;
    } catch (error) {
      console.error("Error clearing wishlist:", error);
      return false;
    }
  },
};
