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
export interface Testimonial {
    review: string;
    studentName: string;
    createdAt: Time;
    rating: bigint;
    course: string;
}
export interface backendInterface {
    deleteAdmissionInquiryAdmin(password: string, id: bigint): Promise<boolean>;
    getAdmissionInquiriesAdmin(password: string): Promise<Array<AdmissionInquiry>>;
    getAdmissionInquiriesWithIdsAdmin(password: string): Promise<Array<[bigint, AdmissionInquiry]>>;
    getAllTestimonials(): Promise<Array<Testimonial>>;
    getContactSubmissionsAdmin(password: string): Promise<Array<ContactSubmission>>;
    submitAdmissionInquiry(name: string, phone: string, email: string, course: string, message: string): Promise<void>;
    submitContact(name: string, email: string, message: string): Promise<void>;
    submitTestimonial(studentName: string, course: string, review: string, rating: bigint): Promise<void>;
}
