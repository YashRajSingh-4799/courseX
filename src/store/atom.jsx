import { atom } from "recoil";

export const userAtom = atom({
  key: "userState",
  default: "",
});
export const adminAtom = atom({
  key: "adminState",
  default: "",
});

export const userCourseAtom = atom({
  key: "userCourseState",
  default: [],
});
export const adminCourseAtom = atom({
  key: "adminCourseState",
  default: [],
});

export const adminToken = atom({
  key: "adminTokenState",
  default: localStorage.getItem("token"),
});
