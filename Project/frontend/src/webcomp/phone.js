"use client";

import React from "react";
import ReactDOM from "react-dom/client";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";
if (typeof window !== "undefined") {
  class ValidatedPhoneElement extends HTMLElement {
    static formAssociated = true; // makes it act like <input> inside forms

    constructor() {
      super();
      this._value = "";
      this._valid = false;
      this._name="phone";
      this._internals = this.attachInternals();
      this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
      this.renderReactComponent();
    }

    disconnectedCallback() {
      if (this._root) this._root.unmount();
    }

    // Form behavior
    get form() {
      return this._internals.form;
    }
    get name() {
      return this.getAttribute("name") || "phone";
    }
    get type() {
      return "tel";
    }
    get value() {
      return this._value;
    }
    set name(val){
      return this._name=val;
    }
    set value(val) {
      this._value = val || "";
      this._internals.setFormValue(this._value);
      this.renderReactComponent();
    }

    // Native-like validity
    get validity() {
      return { valid: this._valid };
    }
    checkValidity() {
      return this._valid;
    }
    reportValidity() {
      if (!this._valid) {
        alert("Invalid phone number");
      }
      return this._valid;
    }

    // Handle change
    handleChange = (value) => {
      this._value = value;
      this._internals.setFormValue(this._value);

      try {
        const phone = parsePhoneNumberFromString("+" + value);
        this._valid = phone?.isValid() ?? false;
      } catch {
        this._valid = false;
      }

      // Dispatch change event
      this.dispatchEvent(
        new CustomEvent("change", {
          bubbles: true,
          composed: true,
          detail: {
            value: this._value,
            validity: { valid: this._valid },
          },
        })
      );

      this.renderReactComponent();
    };

    renderReactComponent() {
      if (!this._root) {
        this._root = ReactDOM.createRoot(this.shadowRoot);
      }

      this._root.render(
        <PhoneInput
          country={ this.getAttribute("country") || "in" }
          value={ this._value }
          onChange={ this.handleChange }
          inputProps={ {
            required: this.hasAttribute("required"),
            name: this.name,
          } }
        />
      );
    }
  }

  // Register once (safe for Next.js)

  if (!customElements.get("frfs-phone")) {
    customElements.define("frfs-phone", ValidatedPhoneElement);
  }
}