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
            createSpanForErrorMessages(form, element.name);
            form.appendChild(document.createElement("br"));
            return;
            
         }
        if (element.type === "checkBox" && element.defaultValue === true ) {
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
        createSpanForErrorMessages(form, element.name);
        form.appendChild(document.createElement("br"));
        
        
    }); 
    form.appendChild(document.createElement("br"));
     const button = document.createElement('button');
     button.classList.add("btn");
     button.type = "button";
     button.innerHTML = "submit";
     button.addEventListener("click", submit);
     form.appendChild(button);
     formContainer.appendChild(form);
    
    }
    function createSpanForErrorMessages(form, name){
        const span = document.createElement("span");
        span.setAttribute("id",`error-${name}`);
        span.classList.add("spanStyling")
        span.style = "color : red";
        form.appendChild(span);
    }
    const outputVal ={};

    function validate() {
   
            let allValid = true;
           
           schema.forEach(element => {
            
               const input = document.querySelector(`[name="${element.name}"]`);
               const error = document.getElementById(`error-${element.name}`);
               error.innerHTML = ''; 
        
               if (element.required) {
                   if (element.type == "checkbox") {
                       if (!document.querySelector(`[name="${element.name}"]:checked`)) {
                           allValid = false;
                           error.innerHTML = `Please fill in your ${element.label}`;
                       }  
                        else {
                            outputVal[element.name] = true;
                             }
                   } 
        
                   else if (element.type == "radio") {
                       if (!document.querySelector(`[name="${element.name}"]:checked`)) 
                       {
                           allValid = false;
                           error.innerHTML = `Please select a ${element.label}`;
                       } 
                       else {
                        outputVal[element.name] = document.querySelector(`[name="${element.name}"]:checked`).value;
                             }
                   } 
                   else 
                   {  if (input.value.trim() == '')
                        {
                       allValid = false;
                       error.innerHTML = `Please fill in your ${element.label}`;
                        }
                        else{
                            outputVal[element.name] = input.value;
                        }
               
                    } 
               }
        
               else {
                   if (element.type == "checkbox" && document.querySelector(`[name="${element.name}"]:checked`)) 
                   {
                    outputVal[element.name] = true;
                   } 
                   else if (element.type == "radio" && document.querySelector(`[name="${element.name}"]:checked`)) 
                      {
                        outputVal[element.name] = document.querySelector(`[name="${element.name}"]:checked`).value;
                      }
               }
        
               if (element.validationType == "email" && input.value.trim() != "") 
               {
                   const emailPattern = /^\S+@\S+\.\S+$/;
                   if (!emailPattern.test(input.value)) {
                       allValid = false;
                       error.innerHTML = `Please enter a valid ${element.label}`;
                   } 
                   else 
                   {
                    outputVal[element.name] = input.value;
                   }
               } 
        
               else{
                    if (element.validationType == "phone" && input.value.trim() != "") 
                   {
                       const phonePattern = /^[+]?\d{2}-\d{3}-\d{7}$/;
                       if (!phonePattern.test(input.value)) 
                       {
                           allValid = false;
                           error.innerHTML = `Please enter a valid ${element.label}`;
                       } 
                       else {
                        outputVal[element.name] = input.value;
                       }
                  } 
               }
               
                if (element.validationType == "url" && input.value.trim() != "") 
                {
                       const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
                       if (!urlPattern.test(input.value)) {
                           allValid = false;
                           error.innerHTML = `Please enter a valid ${element.label}`;
                       }
                       else{
                        outputVal[element.name] = input.value;
                       }
               }
                  
               
           });
        
           return allValid;
           }
function submit()
{
    const isValid = validate();

        if (isValid) {
   
    const outputSection = document.getElementById("output-data");
    
    outputSection.innerHTML = JSON.stringify(outputVal);

  
          
     }
}

displayForm();