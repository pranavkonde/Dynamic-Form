export const formData = {
    "fields": [
      {
        "name": "firstName",
        "label": "First Name",
        "type": "text",
        "validation": {
          "pattern": "^[a-zA-Z]+$",
          "maxLength": 10,
          "required": true,
          "errorMessage": {
            "pattern": "Name should not contain numbers",
            "maxLength": "First name cannot exceed 10 characters",
            "required": "Please enter your first name"
          }
        }
      },
      {
        "name": "lastName",
        "label": "Last Name",
        "type": "text",
        "validation": {
          "pattern": "^[a-zA-Z]+$",
          "maxLength": 10,
          "required": true,
          "errorMessage": {
            "pattern": "Last name should not contain numbers",
            "maxLength": "Last name cannot exceed 10 characters",
            "required": "Please enter your last name"
          }
        }
      },
      {
        "name": "phoneNumber",
        "label": "Phone Number",
        "type": "tel",
        "validation": {
          "pattern": "^[0-9]+$",
          "maxLength": 10,
          "required": true,
          "errorMessage": {
            "pattern": "Phone number should contain only numbers",
            "maxLength": "Phone number cannot exceed 10 digits",
            "required": "Please enter your phone number"
          }
        }
      },
      {
        "name": "email",
        "label": "Email",
        "type": "email",
        "validation": {
          "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
          "required": true,
          "errorMessage": {
            "pattern": "Invalid email format",
            "required": "Please enter a valid email address"
          }
        }
      },
      {
        "name": "gender",
        "label": "Gender",
        "type": "radio",
        "options": [
          { "value": "male", "label": "Male" },
          { "value": "female", "label": "Female" }
        ],
        "validation": {
          "required": true,
          "errorMessage": {
            "required": "Please select your gender"
          }
        }
      },
      {
        "name": "languagesSpoken",
        "label": "Languages Spoken",
        "type": "checkbox",
        "options": [
          { "value": "english", "label": "English" },
          { "value": "spanish", "label": "Spanish" },
          { "value": "french", "label": "French" },
          { "value": "german", "label": "German" },
          { "value": "italian", "label": "Italian" },
          { "value": "chinese", "label": "Chinese" },
          { "value": "arabic", "label": "Arabic" }
        ],
        "validation": {
          "required": true,
          "errorMessage": {
            "required": "Please select at least one language"
          }
        }
      },
      {
        "name": "state",
        "label": "State",
        "type": "select",
        "options": [
          { "value": "Haryana", "label": "Haryana" },
          { "value": "Jammu and Kashmir", "label": "Jammu and Kashmir" },
          { "value": "Jharkhand", "label": "Jharkhand" },
          { "value": "Karnataka", "label": "Karnataka" },
          { "value": "Kerala", "label": "Kerala" },
          { "value": "Ladakh", "label": "Ladakh" },
          { "value": "Lakshadweep", "label": "Lakshadweep" },
          { "value": "Madhya Pradesh", "label": "Madhya Pradesh" },
          { "value": "Maharashtra", "label": "Maharashtra" },
          { "value": "Meghalaya", "label": "Meghalaya" },
          { "value": "Manipur", "label": "Manipur" },
          { "value": "Mizoram", "label": "Mizoram" },
          { "value": "Nagaland", "label": "Nagaland" },
          { "value": "Odisha", "label": "Odisha" },
          { "value": "Punjab", "label": "Punjab" },
          { "value": "Pondicherry", "label": "Pondicherry" },
          { "value": "Rajasthan", "label": "Rajasthan" },
          { "value": "Sikkim", "label": "Sikkim" },
          { "value": "Tamil Nadu", "label": "Tamil Nadu" },
          { "value": "Telangana", "label": "Telangana" },
          { "value": "Tripura", "label": "Tripura" },
          { "value": "Uttar Pradesh", "label": "Uttar Pradesh" },
          { "value": "Uttarakhand", "label": "Uttarakhand" },
          { "value": "West Bengal", "label": "West Bengal" }
        ],
        "validation": {
          "required": true,
          "errorMessage": {
            "required": "Please select your state"
          }
        }
      },
      {
        "name": "medicalConditions",
        "label": "Do you have any medical conditions?",
        "type": "conditional",
        "conditional": {
          "question": "yes",
          "field": {
            "name": "medicalConditionsText",
            "label": "Please specify",
            "type": "textarea",
            "validation": {
              "required": true,
              "errorMessage": {
                "required": "Please provide details about your medical condition(s)"
              }
            }
          }
        }
      }
    ]
  }
