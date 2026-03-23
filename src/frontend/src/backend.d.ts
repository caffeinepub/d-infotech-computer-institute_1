import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface AdmissionInquiry {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
    phone: string;
    course: string;
}
export interface ContactSubmission {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export interface UserProfile {
    name: string;
    email: string;
    phone: string;
}
export interface Testimonial {
    review: string;
    studentName: string;
    createdAt: Time;
    rating: bigint;
    course: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteAdmissionInquiryAdmin(id: bigint): Promise<boolean>;
    getAdmissionInquiriesAdmin(): Promise<Array<AdmissionInquiry>>;
    getAdmissionInquiriesWithIdsAdmin(): Promise<Array<[bigint, AdmissionInquiry]>>;
    getAllTestimonials(): Promise<Array<Testimonial>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContactSubmissionsAdmin(): Promise<Array<ContactSubmission>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitAdmissionInquiry(name: string, phone: string, email: string, course: string, message: string): Promise<void>;
    submitContact(name: string, email: string, message: string): Promise<void>;
    submitTestimonial(studentName: string, course: string, review: string, rating: bigint): Promise<void>;
}
