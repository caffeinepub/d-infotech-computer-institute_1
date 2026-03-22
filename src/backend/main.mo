import Text "mo:core/Text";
import Time "mo:core/Time";
import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Int "mo:core/Int";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  type Student = {
    id : Nat;
    email : Text;
    hashedPassword : Text;
    createdAt : Time.Time;
  };

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

  type SessionToken = {
    token : Text;
    studentId : Nat;
    createdAt : Time.Time;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
    phone : Text;
  };

  let ADMIN_PASSWORD = "dinfotech@admin";

  module AdmissionInquiry {
    public func compareByTimestamp(a : AdmissionInquiry, b : AdmissionInquiry) : Order.Order {
      Int.compare(b.timestamp, a.timestamp); // newest first
    };
  };

  module Testimonial {
    public func compareByTimestamp(a : Testimonial, b : Testimonial) : Order.Order {
      Int.compare(a.createdAt, b.createdAt);
    };
  };

  module SessionToken {
    public func compare(a : SessionToken, b : SessionToken) : Order.Order {
      Text.compare(a.token, b.token);
    };
  };

  let admissionInquiriesMap = Map.empty<Nat, AdmissionInquiry>();
  let testimonials = List.empty<Testimonial>();
  let contactSubmissionsMap = Map.empty<Nat, ContactSubmission>();
  let students = Map.empty<Nat, Student>();
  let sessions = Map.empty<Text, SessionToken>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  var nextStudentId = 1;
  var nextAdmissionInquiryId = 1;
  var nextContactSubmissionId = 1;

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Public: Anyone can submit admission inquiry
  public shared ({ caller }) func submitAdmissionInquiry(name : Text, phone : Text, email : Text, course : Text, message : Text) : async () {
    let inquiry : AdmissionInquiry = {
      name;
      phone;
      email;
      course;
      message;
      timestamp = Time.now();
    };
    let id = nextAdmissionInquiryId;
    admissionInquiriesMap.add(id, inquiry);
    nextAdmissionInquiryId += 1;
  };

  // Public: Anyone can register
  public shared ({ caller }) func registerStudent(email : Text, hashedPassword : Text) : async Nat {
    let student : Student = {
      id = nextStudentId;
      email;
      hashedPassword;
      createdAt = Time.now();
    };
    students.add(nextStudentId, student);
    let id = nextStudentId;
    nextStudentId += 1;
    id;
  };

  // Public: Anyone can login
  public shared ({ caller }) func login(email : Text, hashedPassword : Text) : async ?Text {
    let studentOpt = students.values().find(
      func(student) { student.email == email and student.hashedPassword == hashedPassword }
    );
    switch (studentOpt) {
      case (?student) {
        let token = email.concat(Time.now().toText());
        let session : SessionToken = {
          token;
          studentId = student.id;
          createdAt = Time.now();
        };
        sessions.add(token, session);
        ?token;
      };
      case null {
        null;
      };
    };
  };

  // Public: Anyone can validate session
  public query ({ caller }) func validateSession(token : Text) : async Bool {
    sessions.containsKey(token);
  };

  // Public: Anyone can submit testimonial
  public shared ({ caller }) func submitTestimonial(studentName : Text, course : Text, review : Text, rating : Nat) : async () {
    let testimonial : Testimonial = {
      studentName;
      course;
      review;
      rating;
      createdAt = Time.now();
    };
    testimonials.add(testimonial);
  };

  // Public: Anyone can submit contact form
  public shared ({ caller }) func submitContact(name : Text, email : Text, message : Text) : async () {
    let submission : ContactSubmission = {
      name;
      email;
      message;
      timestamp = Time.now();
    };
    let id = nextContactSubmissionId;
    contactSubmissionsMap.add(id, submission);
    nextContactSubmissionId += 1;
  };

  // Admin panel: password-protected query to view all admission enquiries
  public query func getAdmissionInquiriesAdmin(password : Text) : async [AdmissionInquiry] {
    if (password != ADMIN_PASSWORD) {
      Runtime.trap("Wrong admin password");
    };
    admissionInquiriesMap.values().toArray().sort(AdmissionInquiry.compareByTimestamp);
  };

  // Admin panel: password-protected query to view all contact submissions
  public query func getContactSubmissionsAdmin(password : Text) : async [ContactSubmission] {
    if (password != ADMIN_PASSWORD) {
      Runtime.trap("Wrong admin password");
    };
    contactSubmissionsMap.values().toArray();
  };

  // Admin-only: Retrieve all admission inquiries (ICP role-based)
  public query ({ caller }) func getAllAdmissionInquiries() : async [AdmissionInquiry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all admission inquiries");
    };
    admissionInquiriesMap.values().toArray().sort(AdmissionInquiry.compareByTimestamp);
  };

  // Public: Anyone can view testimonials
  public query ({ caller }) func getAllTestimonials() : async [Testimonial] {
    testimonials.toArray().sort(Testimonial.compareByTimestamp);
  };

  // Admin-only: Retrieve all contact submissions
  public query ({ caller }) func getAllContactSubmissions() : async [ContactSubmission] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all contact submissions");
    };
    contactSubmissionsMap.values().toArray();
  };

  // Protected: Admin or the student themselves can view student data
  public query ({ caller }) func getStudentById(studentId : Nat) : async Student {
    switch (students.get(studentId)) {
      case (null) { Runtime.trap("Student not found") };
      case (?student) {
        let isAdmin = AccessControl.isAdmin(accessControlState, caller);
        if (not isAdmin) {
          Runtime.trap("Unauthorized: Only admins can view student data");
        };
        student;
      };
    };
  };

  // Protected: Only owner of session or admin can view session data
  public query ({ caller }) func getSession(token : Text) : async SessionToken {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view session data");
    };
    switch (sessions.get(token)) {
      case (null) { Runtime.trap("Session not found") };
      case (?session) { session };
    };
  };

  // User profile management functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };
};
