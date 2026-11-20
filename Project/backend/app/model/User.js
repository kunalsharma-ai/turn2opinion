import mongoose from "mongoose";
import { mongooseModel } from "../utils/index.js";
import bcrypt from "bcryptjs";
import dns from "dns";
import { promisify } from "util"
import { parsePhoneNumberFromString } from "libphonenumber-js"


const resolveMx = promisify(dns.resolveMx)

// Whole years between a date of birth and today (birthday-exact, not 365.25-day maths).
export function ageInYears(dob, now = new Date()) {
    if (!dob) return null;
    const d = new Date(dob);
    if (isNaN(d.getTime())) return null;
    let y = now.getFullYear() - d.getFullYear();
    const m = now.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < d.getDate())) y--;
    return y;
}

export default mongooseModel(
    "User",
    {
        nayaHai: {
            type: Boolean,
            default: true,
        },
        tourStatus: {
            seenRoutes: {
                type: mongoose.Schema.Types.Mixed,
                default: {},
            },
        },
        respondentID: {
            type: String
        },
        qualityScore: {
            type: Number,
            default: 100,
            min: [0, "Minimum score should not go below zero"]
        },
        category: {
            type: String,
            required: [true, "Please select your category"],
            default: "b2c"
        },
        name: {
            salutation: {
                type: String,
                trim: true,
                enum: ["Mr.", "Ms.", "Mrs.", "Dr.", "Prof.", "Mx."]
            },
            first: {
                type: String,
                trim: true,
                required: [true, "Firstname is required"]
            },
            middle: {
                type: String,
                trim: true,
                default: ""
            },
            // Last name is optional on the registration forms (some members have a single name).
            last: {
                type: String,
                trim: true,
                default: ""
            }
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            required: [true, "Gender is required"]
        },
        dob: {
            type: Date,
            required: [true, "Date of birth is required"],
            validate: {
                validator: function (value) {
                    if (!value || isNaN(new Date(value).getTime())) return false;
                    const today = new Date();
                    const age = (today - new Date(value)) / (1000 * 60 * 60 * 24 * 365.25);
                    return age >= 13 && age <= 120;
                },
                message: "Date of birth must result in age between 13 and 120 years"
            }
        },
        mail: {
            type: String,
            required: [true, "Email is required"],
            // unique: [true, "You are already registered."],
            lowercase: true,
            trim: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please enter a valid email address",
            ],
            validate: {
                validator: async function (email) {
                    // Extract domain
                    const domain = email.split("@")[1];
                    if (!domain) return false;
                    try {
                        const records = await resolveMx(domain);
                        return records && records.length > 0; // has MX record
                    } catch (err) {
                        return false; // domain has no MX record or not resolvable
                    }
                },
                message: "Please type correct email address.",
            },
        },
        phone: {
            type: String,
            // unique: [true, "Phone number is already in use by another user"],
            trim: true,
            validate: {
                validator: function (v) {
                    if (!v) return true;
                    const phoneNumber = parsePhoneNumberFromString(`+${v}`);
                    return phoneNumber ? phoneNumber.isValid() : false;
                },
                message: props => `${props.value} is not a valid phone number`
            },
            set: function (v) {
                const phoneNumber = parsePhoneNumberFromString(v);
                return phoneNumber ? phoneNumber.format("E.164") : v;
            }
        },
        timezone: {
            type: String,
            required: [true, "Timezone required"]
        },
        address: [{
            tag: {
                type: String,
                trim: true,
                required: [true, "Define tag for address"]
            },
            house: {
                type: String,
                trim: true,
                lowercase: true,
            },
            street: {
                type: String,
                trim: true,
                lowercase: true,
            },
            city: {
                type: String,
                trim: true,
                lowercase: true,
            },
            state: {
                type: String,
                trim: true,
                lowercase: true,
            },
            country: {
                type: String,
                trim: true,
                lowercase: true,
            },
            zipcode: {
                type: String,
                trim: true,
                lowercase: true,
            },
            gps: {
                type: {
                    type: String,
                    enum: ["Point"],
                    default: "Point"
                },
                coordinates: {
                    type: [Number],
                    default: [0, 0]
                }
            }
        }],
        isVerified: {
            email: {
                type: String,
                enum: ["unverified", "verified", "rejected"],
                default: "unverified"
            },
            phone: {
                type: String,
                enum: ["unverified", "verified", "rejected"],
                default: "unverified"
            },
            video: {
                type: String,
                enum: ["unverified", "verified", "rejected"],
                default: "unverified"
            },
            inPersonVisit: {
                type: String,
                enum: ["unverified", "verified", "rejected"],
                default: "unverified"
            },
        },
        profilePicture: {
            type: String,
            default: null
        },
        notification: [
            {
                channel: { type: String, required: true },
                category: [{
                    type: String
                }],
                identity: {
                    type: String,
                    required: true
                }
            }
        ],
        referredBy: {
            type: String,
            required: false,
            default: null,
            select: false
        },
        consent: {
            canShareVideo: { type: Boolean, default: false },
            canShareGPS: { type: Boolean, default: false },
            canAcceptPushNotification: { type: Boolean, default: false },
        },
        password: { type: String, select: false },
        origin: {
            type: String,
            required: true,
        },
        terms: [{ type: String }],
        socials: [
            {
                channel: { type: String, required: true },
                account: { type: String }
            }
        ],
        role: {
            type: String,
            default: "respondent",
            lowercase: true,
            trim: true,
            enum: ["respondent", "administrator", "root", "admin"],
            select: false
        },
        paymentMethod: {
            method: {
                type: String,
                default: ""
            },
            details: {}
        },
        parent: {
            email: {
                type: String,
                lowercase: true,
                trim: true,
                match: [
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    "Please enter a valid email address",
                ],
                validate: {
                    validator: async function (email) {
                        // Extract domain
                        const domain = email.split("@")[1];
                        if (!domain) return false;
                        try {
                            const records = await resolveMx(domain);
                            return records && records.length > 0; // has MX record
                        } catch (err) {
                            return false; // domain has no MX record or not resolvable
                        }
                    },
                    message: "Please type correct email address.",
                },
            },
            name: {
                salutation: {
                    type: String,
                    trim: true,
                    enum: ["Mr.", "Ms.", "Mrs.", "Dr.", "Prof.", "Mx."]
                },
                first: {
                    type: String,
                    trim: true
                },
                middle: {
                    type: String,
                    trim: true
                },
                last: {
                    type: String,
                    trim: true
                }
            },
            relation: {
                type: String,
                trim: true,
                lowercase: true,
                enum: ["father", "mother", "guardian"]
            },
            phone: { type: String, trim: true },
            dob: { type: Date },
            // Asked only when the relation is "guardian".
            gender: { type: String, enum: ["Male", "Female", "Other"] },
            consent: {
                type: Boolean,
                default: null
            },
            // Consent record for Teen (13-17) members. consentStatus is what the member area reads.
            consentStatus: {
                type: String,
                enum: ["pending", "approved", "withdrawn"]
            },
            submittedAt: { type: Date },
            onboardingOpenedAt: { type: Date },
            consentAt: { type: Date },
            consentVersion: { type: String },
            consentIP: { type: String },
            consentConfirmations: [{ type: String }],
            verifiedVia: { type: String }
        }
    },
    [
        [
            {
                mail: 1,
                origin: 1
            },
            {
                unique: true
            }
        ]
    ],
    {
        virtuals: {
            country: function () {
                let { address } = this;
                if (!address || !Array.isArray(address) || address.length === 0) return "";
                let { country } = address[0];
                if (!country) return "";
                return country.toUpperCase();
            },
            fullName: function () {
                return [this.name.salutation, this.name.first, this.name.middle, this.name.last]
                    .filter(Boolean)
                    .join(" ");
            },
            fullname: function () {
                return [this.name.salutation, this.name.first, this.name.middle, this.name.last]
                    .filter(Boolean)
                    .join(" ");
            },
            // Where a member is in sign-up, from real backend events (see docs in the PR).
            registrationStatus: function () {
                const verified = this.isVerified?.email === "verified";
                const years = ageInYears(this.dob);
                const isTeen = this.category === "minor" || (years !== null && years < 18);
                if (!isTeen) return verified ? "account-active" : "email-verification-pending";
                const p = this.parent || {};
                if (!p.email) return verified ? "parent-details-needed" : "registration-started";
                if (p.consent === true || p.consentStatus === "approved") return verified ? "account-active" : "account-activation-pending";
                if (p.consentStatus === "withdrawn") return "consent-withdrawn";
                return p.onboardingOpenedAt ? "consent-pending" : "parent-verification-pending";
            },
            age: function () {
                if (!this.dob) return null;
                const today = new Date();
                const dob = new Date(this.dob);
                let temp = {
                    years: today.getFullYear() - dob.getFullYear(),
                    month: today.getMonth() - dob.getMonth(),
                    day: today.getMonth() - dob.getMonth()
                }
                if (temp.day < 0) { temp.month = temp.month - 1; temp.day += 30; }
                if (temp.month < 0) { temp.years = temp.years - 1; temp.month += 12; }
                return temp;
            }
        },
        method: {
            verifyPassword: async function (password) {
                const user = await this.constructor.findById(this._id).select("+password");
                if (!user.password) throw new Error("Account is inactive");
                return await bcrypt.compare(password, user.password)
            },
            setPassword: async function (password) {
                this.isVerified.email = "verified";
                this.password = await bcrypt.hash(password, 10);
                await this.save();
                return this;
            },
            resetPassword: async function (admin, password) {
                if (!admin || !admin.category || !["admin", "superadmin", "root"].includes(admin.category)) throw new Error("Permission denined");
                this.isVerified.email = "verified";
                this.password = await bcrypt.hash(password, 10);
                await this.save();
                return this;
            },
            changePassword: async function (currentPassword, newPassword) {
                const user = await this.constructor.findById(this._id).select("+password");
                if (!(await bcrypt.compare(currentPassword, user.password))) throw new Error("Current password invalid. Check your password and try again.");
                this.isVerified.email = "verified";
                this.password = await bcrypt.hash(newPassword, 10);
                await this.save();
                return this;
            },
            changeRole: async function (newRole = "respondent") {
                this.role = newRole;
                await this.save();
                return this;
            }
        }
    }
)