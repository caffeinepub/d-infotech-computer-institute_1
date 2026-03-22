import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Testimonial {
    review: string;
    studentName: string;
    createdAt: Time;
    rating: bigint;
    course: string;
}
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
export interface SessionToken {
    token: string;
    studentId: bigint;
    createdAt: Time;
}
export interface UserProfile {
    name: string;
    email: string;
    phone: string;
}
export interface Student {
    id: bigint;
    createdAt: Time;
    email: string;
    hashedPassword: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllAdmissionInquiries(): Promise<Array<AdmissionInquiry>>;
    getAllContactSubmissions(): Promise<Array<ContactSubmission>>;
    getAdmissionInquiriesAdmin(password: string): Promise<Array<AdmissionInquiry>>;
    getContactSubmissionsAdmin(password: string): Promise<Array<ContactSubmission>>;
    getAllTestimonials(): Promise<Array<Testimonial>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getSession(token: string): Promise<SessionToken>;
    getStudentById(studentId: bigint): Promise<Student>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    login(email: string, hashedPassword: string): Promise<string | null>;
    registerStudent(email: string, hashedPassword: string): Promise<bigint>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitAdmissionInquiry(name: string, phone: string, email: string, course: string, message: string): Promise<void>;
    submitContact(name: string, email: string, message: string): Promise<void>;
    submitTestimonial(studentName: string, course: string, review: string, rating: bigint): Promise<void>;
    validateSession(token: string): Promise<boolean>;
}
