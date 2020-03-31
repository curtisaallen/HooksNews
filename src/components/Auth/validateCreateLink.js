export default function validateCreateLink(values) {
    let errors = {}
    // Email Errors
     if(!values.description) {
        errors.description = "description required"
    } else if(values.description.length < 10) {
        errors.description = "description mush be at least 10 charcters"
     }
    // Password Errors
    if(!values.url) {
        errors.url = "url required";
    } else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {    
        errors.url = "url must be a url";
     }
    return errors;
}

