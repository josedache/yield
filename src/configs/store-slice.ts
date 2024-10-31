import { createSlice } from "@reduxjs/toolkit";
import { logout } from "./store-actions";
import { userApi } from "apis/user-api";
import { User } from "src/types/user";

type InitialState = {
  authUser: User;
  isSideNavigation: boolean;
  isIconOnly: boolean;
};

export const initialState: InitialState = {
  authUser: null,
  isSideNavigation: false,
  isIconOnly: false,
};

export const slice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    setAuthUser: (state, { payload }) => {
      state.authUser = payload;
    },
    toggleSideNavigation: (state, { payload }) => {
      state.isSideNavigation =
        payload !== undefined ? !!payload : !state.isSideNavigation;
    },
    toggleIconOnlyMenuAction: (state, { payload }) => {
      state.isIconOnly = payload !== undefined ? !!payload : !state.isIconOnly;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(logout, () => ({ ...initialState }))
      .addMatcher(
        userApi.endpoints.signupYieldUser.matchFulfilled,
        (state, { payload }) => {
          state.authUser = { token: payload.data.token } as User;
        }
      )
      .addMatcher(
        userApi.endpoints.loginUser.matchFulfilled,
        (state, { payload }) => {
          state.authUser = { ...payload.data, isAuthenticated: true } as User;
        }
      )
      .addMatcher(
        userApi.endpoints.sendUserResetPassword.matchFulfilled,
        (state, { payload }) => {
          state.authUser = payload.data as User;
        }
      )
      .addMatcher(
        userApi.endpoints.verifyUserResetPassword.matchFulfilled,
        (state, { payload }) => {
          state.authUser.token = payload.data;
        }
      )
      .addMatcher(userApi.endpoints.resetPassword.matchFulfilled, (state) => {
        state.authUser = null;
      })
      .addMatcher(
        userApi.endpoints.getUserClientKyc.matchFulfilled,
        (state, { payload }) => {
          state.authUser = Object.assign(state.authUser, payload.data);
        }
      )
      .addMatcher(
        userApi.endpoints.getUserSelfieFile.matchFulfilled,
        (state, { payload }) => {
          state.authUser.avatar = payload.data;
        }
      ),
});

export const { toggleIconOnlyMenuAction, setAuthUser } = slice.actions;

export default slice;

export function getStorageState({ authUser }: typeof initialState) {
  return { authUser };
}

// export interface MyObjectType {
//   id: string;
// }

// export function providesTags<T extends MyObjectType>(resultsWithIds: T[] | null, tagType: string, options: ProvidesTagsOptions = {}): Tag[] {
//   const { selectId = ((item: T) => item.id) } = options;
//   const listTag: Tag = { type: tagType, id: "LIST" };

//   const result: Tag[] = resultsWithIds
//     ? [
//         listTag,
//         ...resultsWithIds.map((result) => ({
//           type: tagType,
//           id: selectId(result), // Now we can directly access id
//         })),
//       ]
//     : [listTag];

//   return result;
// }

// export interface ProvidesTagsOptions {
//   selectId?: (item: any) => string | undefined;
// }

// export function invalidatesTags(tagType: string, options: InvalidateTagsOptions = {}): Tag[] {
//   const { ids = [] } = options;
//   const result: Tag[] = [
//     { type: tagType, id: "LIST" },
//     ...ids.map((id) => ({ type: tagType, id })),
//   ];

//   return result;
// }

// interface InvalidateTagsOptions {
//   ids?: string[];
// }

// interface Tag {
//   type: string;
//   id: string;
// }
