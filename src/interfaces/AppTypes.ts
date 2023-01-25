import { Dispatch, SetStateAction } from "react";

export type GuidString = string;
export type StateSetter<U> = Dispatch<SetStateAction<U>>;
