export default function checkPasswordStrength(password) {
    const lengthRequirement = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    let score = 0;
    if (lengthRequirement) score++;
    if (hasUpperCase) score++;
    if (hasLowerCase) score++;
    if (hasNumbers) score++;
    if (hasSpecialChars) score++;

    let strength = "Very Weak";
    switch (score) {
        case 1:
            strength = "Very Weak";
            break;
        case 2:
            strength = "Weak";
            break;
        case 3:
            strength = "Fair";
            break;
        case 4:
            strength = "Good";
            break;
        case 5:
            strength = "Strong";
            break;
    }

    return {
        score,
        color:["","error","error","warning","success","success"][score],
        strength,
        requirements: {
            lengthRequirement,
            hasUpperCase,
            hasLowerCase,
            hasNumbers,
            hasSpecialChars
        }
    };
}