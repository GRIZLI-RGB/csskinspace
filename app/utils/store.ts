import { atom } from "jotai";
import { ItemType, UserType } from "./types";
import { atomWithStorage } from "jotai/utils";

export const _globalLoading_ = atom(true);

export const _disableBodyScroll_ = atom(false);

export const _isMobileMenuOpen_ = atom(false);

export const _user_ = atom<UserType | null>(null);

export const _cartItems_ = atomWithStorage<
	Pick<
		ItemType,
		| "id"
		| "market_hash_name"
		| "wear_short_name"
		| "float"
		| "currency_symbol"
		| "img"
		| "price"
	>[]
>("cartItems", []);

export const _searchQuery_ = atom("");

export const _isOpenReplenishmentModal_ = atom(false);
export const _isOpenPurchaseItemsModal_ = atom(false);
