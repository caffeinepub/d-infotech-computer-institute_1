/* eslint-disable */

// @ts-nocheck

import { Actor, HttpAgent, type HttpAgentOptions, type ActorConfig, type Agent, type ActorSubclass } from "@icp-sdk/core/agent";
import { idlFactory, type _SERVICE } from "./declarations/backend.did";
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
export class Backend implements backendInterface {
    constructor(private actor: ActorSubclass<_SERVICE>, private processError?: (error: unknown) => never){}
    async deleteAdmissionInquiryAdmin(password: string, id: bigint): Promise<boolean> {
        try {
            return await this.actor.deleteAdmissionInquiryAdmin(password, id);
        } catch (e) {
            if (this.processError) this.processError(e);
            throw e;
        }
    }
    async getAdmissionInquiriesAdmin(password: string): Promise<Array<AdmissionInquiry>> {
        try {
            return await this.actor.getAdmissionInquiriesAdmin(password);
        } catch (e) {
            if (this.processError) this.processError(e);
            throw e;
        }
    }
    async getAdmissionInquiriesWithIdsAdmin(password: string): Promise<Array<[bigint, AdmissionInquiry]>> {
        try {
            return await this.actor.getAdmissionInquiriesWithIdsAdmin(password);
        } catch (e) {
            if (this.processError) this.processError(e);
            throw e;
        }
    }
    async getAllTestimonials(): Promise<Array<Testimonial>> {
        try {
            return await this.actor.getAllTestimonials();
        } catch (e) {
            if (this.processError) this.processError(e);
            throw e;
        }
    }
    async getContactSubmissionsAdmin(password: string): Promise<Array<ContactSubmission>> {
        try {
            return await this.actor.getContactSubmissionsAdmin(password);
        } catch (e) {
            if (this.processError) this.processError(e);
            throw e;
        }
    }
    async submitAdmissionInquiry(name: string, phone: string, email: string, course: string, message: string): Promise<void> {
        try {
            return await this.actor.submitAdmissionInquiry(name, phone, email, course, message);
        } catch (e) {
            if (this.processError) this.processError(e);
            throw e;
        }
    }
    async submitContact(name: string, email: string, message: string): Promise<void> {
        try {
            return await this.actor.submitContact(name, email, message);
        } catch (e) {
            if (this.processError) this.processError(e);
            throw e;
        }
    }
    async submitTestimonial(studentName: string, course: string, review: string, rating: bigint): Promise<void> {
        try {
            return await this.actor.submitTestimonial(studentName, course, review, rating);
        } catch (e) {
            if (this.processError) this.processError(e);
            throw e;
        }
    }
}
export interface CreateActorOptions {
    agent?: Agent;
    agentOptions?: HttpAgentOptions;
    actorOptions?: ActorConfig;
    processError?: (error: unknown) => never;
}
export function createActor(canisterId: string, options: CreateActorOptions = {}): Backend {
    const agent = options.agent || HttpAgent.createSync({ ...options.agentOptions });
    const actor = Actor.createActor<_SERVICE>(idlFactory, {
        agent,
        canisterId,
        ...options.actorOptions,
    });
    return new Backend(actor, options.processError);
}
