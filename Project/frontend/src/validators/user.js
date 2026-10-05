import { api } from "@/util";

const email = {
  format: function (v) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
  },
  validateDomain: async function (v) {
    let email = v.split("@");
    if (email.length != 2) return false;
    let temp = await api.post("/api/v1/validator/email", {
      email: v,
    });
    if (temp?.valid)
      return true;
    return false;
  },
  checkDuplicate: async function(v){
    let resp=await api.post("/api/v1/user/check",{mail:v});
    const {data}=resp;
    if(isNaN(data))return false;
    if(data>0)return false;
    return true;
    return false;
  }
};

const user = {
  name: {
    salutation: {
      required: "Salutation is Required",
    },
    first: {
      required: "First Name is Required",
      pattern: {
        value: /^[A-Za-z']+$/,
        message: <>Invalid First Name</>,
      },
    },
    last: {
      required: "Last Name is Required",
      pattern: {
        value: /^[A-Za-z']+$/,
        message: <>Invalid Last Name</>,
      },
    },
  },
  gender: { required: "Gender is Required" },
  email: {
    required: " Email is Required",

    validate: async (v) => {
      if (!email.format(v)) return "Invalid E-Mail";
      if (!(await email.validateDomain(v))) return "E-Mail Address not valid";
      if(!(await email.checkDuplicate(v))) return "This email is already registered";
      return;
    },
  },
  phone: {},
  dob: {
    required: "Date of Birth is Required",
  },
  category: {
    required: "Account Type is Required",
  },
  agreedtoterms:{
    required: "You must agree to the Terms & Conditions and Privacy Policy",
  },
  parent: {
    email: {
      validate: async (v) => {
        if (!email.format(v)) return "Invalid E-Mail";
        if (!(await email.validateDomain(v))) return "E-Mail Address not valid";
        return;
      },
    },

  }
};
export default user;
