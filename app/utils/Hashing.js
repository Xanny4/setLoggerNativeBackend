const bcrypt = require('bcrypt');
const saltRounds = 10;

async function hashPassword(plainPassword) {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(plainPassword, salt);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
}

// Example usage:
const plainPassword = 'your_plain_password';
hashPassword(plainPassword)
    .then(hashedPassword => {
        console.log('Hashed Password:', hashedPassword);
    })
    .catch(error => {
        console.error('Error:', error);
    });

async function comparePasswords(plainPassword, hashedPassword) {
    try {
        const match = await bcrypt.compare(plainPassword, hashedPassword);
        return match;
    } catch (error) {
        throw error;
    }
}

// Example usage:
const plainPasswordToCheck = 'user_input_password';
const storedHashedPassword = 'hashed_password_from_database';

comparePasswords(plainPasswordToCheck, storedHashedPassword)
    .then(match => {
        if (match) {
            console.log('Password matches!');
        } else {
            console.log('Password does not match.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });


