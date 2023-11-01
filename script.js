const schema = [
    {
        "name": "firstName",
        "label": "First Name",
        "type": "text",
        "required": true,
        "validationType": "text"
    },
    {
        "name": "lastName",
        "label": "Last Name",
        "type": "text",
        "required": true,
        "validationType": "text"
    },
    {
        "name": "email",
        "label": "Email",
        "type": "text",
        "required": true,
        "validationType": "email"
    },
    {
        "name": "phoneNumber",
        "label": "Phone Number",
        "type": "text",
        "required": true,
        "validationType": "phone",
        "validationFormat": "+92-999-9999999"
    },
    {
        "name": "status",
        "label": "Status",
        "type": "checkBox",
        "required": true,
        "validationType": "boolean",
        "defaultValue": true
    },
    {
        "name": "gender",
        "label": "Gender",
        "type" : "radio",
        "required": true,
        "validationType": "string",
        "options": [
               "Male",
               "Female",
               "Unknown"

        ]
    },
    {
        "name": "websiteURL",
        "label": "Website URL",
        "type": "text",
        "required": false,
        "validationType": "url"
    }
];
function displayForm(){
const formContainer = document.getElementById("form-container");
const form = document.getElementById("form");

schema.forEach(element => {
    const inputElement = document.createElement("input");
    inputElement.classList.add('inputFields');
    inputElement.type = element.type;
    const label = document.createElement("label");
    label.classList.add('label');
    label.innerHTML =  element.label + ":" + " " ;
    form.appendChild(document.createElement("br"));
    if (element.type === "radio"){
        label.innerHTML =  element.label + ":" + " ";
         form.appendChild(label);
        element.options.forEach(option => {
           const optionElement = document.createElement("input");
           optionElement.classList.add("opt")
           optionElement.type = "radio";
           optionElement.name = element.name;
           optionElement.value = option;
           optionElement.setAttribute("id", `${element.name}-${option}`);
           form.appendChild(optionElement);
        inputElement.name = element.name;
        inputElement.value = element.options;
        const mention = document.createElement("label");
        mention.setAttribute("for", `${element.name}-${option}`);
        mention.innerHTML = option;
        form.appendChild(mention);
        });
        form.appendChild(document.createElement("br"));
        return;
        
     }
    if (element.type === "checkBox" ) {
        inputElement.name = element.name;
        inputElement.checked = element.defaultValue ;
      }
       if (element.type === "text") {
        inputElement.name = element.name;
      }
    if (element.required) {
       inputElement.required = true;
    }
    if (element.name === "email") {
        inputElement.name = element.name;
        inputElement.type = "email";
        inputElement.setAttribute("pattern", "^\\ S+@\\S+\\.\\S+$");
        inputElement.title = "Please enter a valid email address";

    }
     if (element.name === "phoneNumber") {
            inputElement.name = element.name;
            inputElement.type = "tel";
            inputElement.pattern = "\\+\\d{2}-\\d{3}-\\d{7}";
            inputElement.title = "Please enter a valid phone number in the format +xx-xxx-xxxxxxx";
    }
    if (element.name === "websiteURL") {
      inputElement.name = element.name;
      inputElement.pattern = "[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?";
      inputElement.title = "Please enter a valid websiteUrl";
    }
    
    
    form.appendChild(label);
    form.appendChild(inputElement);
    form.appendChild(document.createElement("br"));
    
    
}); 
form.appendChild(document.createElement("br"));
 const button = document.createElement('button');
 button.classList.add("btn");
 button.innerHTML = "submit";
 button.addEventListener("click", submit);
 form.appendChild(button);
 formContainer.appendChild(form);

}
function submit() {
    const formData = {};
    schema.forEach(element => {
      if (element.type === "radio") {
        const selectedOption = form.querySelector(`input[name="${element.name}"]:checked`);
        formData[element.name] = selectedOption ? selectedOption.value : null;
      } else if (element.type === "checkbox") {
        formData[element.name] = form.querySelector(`input[name="${element.name}"]`).checked;
      } else {
        formData[element.name] = form.querySelector(`input[name="${element.name}"]`).value;
      }
    });
    const outputSection = document.getElementById("form-output");
    
    outputSection.innerHTML = JSON.stringify(formData);
    
  }
displayForm();