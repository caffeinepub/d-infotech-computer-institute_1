import Text "mo:core/Text";
import Time "mo:core/Time";
import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

actor {
  // ── Types ──────────────────────────────────────────────────────────────────

  type AdmissionInquiry = {
    name : Text;
    phone : Text;
    email : Text;
    course : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type Testimonial = {
    studentName : Text;
    course : Text;
    review : Text;
    rating : Nat;
    createdAt : Time.Time;
  };

  type ContactSubmission = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type UserProfile = {
    name : Text;
    email : Text;
    phone : Text;
  };

  // These types and variables are kept solely to satisfy stable-variable
  // upgrade compatibility with the previous deployment that used the
  // authorization mixin. They are not used by any logic in this version.
  type UserRole = { #admin; #user; #guest };
  type AccessControlState = {
    var adminAssigned : Bool;
    userRoles : Map.Map<Principal, UserRole>;
  };

  let accessControlState : AccessControlState = {
    var adminAssigned = false;
    userRoles = Map.empty<Principal, UserRole>();
  };

  let userProfiles : Map.Map<Principal, UserProfile> =
    Map.empty<Principal, UserProfile>();

  // ── Admin password ─────────────────────────────────────────────────────────

  let ADMIN_PASSWORD : Text = "dinfotech@admin";

  // ── State ──────────────────────────────────────────────────────────────────

  let admissionInquiriesMap = Map.empty<Nat, AdmissionInquiry>();
  let testimonialsList = List.empty<Testimonial>();
  let contactSubmissionsMap = Map.empty<Nat, ContactSubmission>();
  var nextAdmissionInquiryId = 1;
  var nextContactSubmissionId = 1;

  // ── Public endpoints ───────────────────────────────────────────────────────

  public shared func submitAdmissionInquiry(
    name : Text,
    phone : Text,
    email : Text,
    course : Text,
    message : Text,
  ) : async () {
    admissionInquiriesMap.add(
      nextAdmissionInquiryId,
      { name; phone; email; course; message; timestamp = Time.now() },
    );
    nextAdmissionInquiryId += 1;
  };

  public shared func submitContact(name : Text, email : Text, message : Text) : async () {
    contactSubmissionsMap.add(
      nextContactSubmissionId,
      { name; email; message; timestamp = Time.now() },
    );
    nextContactSubmissionId += 1;
  };

  public shared func submitTestimonial(
    studentName : Text,
    course : Text,
    review : Text,
    rating : Nat,
  ) : async () {
    testimonialsList.add({ studentName; course; review; rating; createdAt = Time.now() });
  };

  public query func getAllTestimonials() : async [Testimonial] {
    testimonialsList.toArray();
  };

  // ── Admin endpoints (password-protected) ───────────────────────────────────

  public query func getAdmissionInquiriesAdmin(password : Text) : async [AdmissionInquiry] {
    if (password != ADMIN_PASSWORD) {
      Runtime.trap("Unauthorized: Invalid admin password");
    };
    admissionInquiriesMap.values().toArray();
  };

  public query func getAdmissionInquiriesWithIdsAdmin(password : Text) : async [(Nat, AdmissionInquiry)] {
    if (password != ADMIN_PASSWORD) {
      Runtime.trap("Unauthorized: Invalid admin password");
    };
    admissionInquiriesMap.entries().toArray();
  };

  public shared func deleteAdmissionInquiryAdmin(password : Text, id : Nat) : async Bool {
    if (password != ADMIN_PASSWORD) {
      Runtime.trap("Unauthorized: Invalid admin password");
    };
    admissionInquiriesMap.remove(id);
    true;
  };

  public query func getContactSubmissionsAdmin(password : Text) : async [ContactSubmission] {
    if (password != ADMIN_PASSWORD) {
      Runtime.trap("Unauthorized: Invalid admin password");
    };
    contactSubmissionsMap.values().toArray();
  };
};
