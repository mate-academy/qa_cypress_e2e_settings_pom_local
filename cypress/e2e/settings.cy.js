import BioPage from '../support/pages/BioPage';
import UsernamePage from '../support/pages/UsernamePage';
import EmailPage from '../support/pages/EmailPage';
import PasswordPage from '../support/pages/PasswordPage';
import faker from 'faker';

describe('User Profile Update', () => {
    

    it('should update the bio', () => {
        const newBio = faker.lorem.sentence(); 
        BioPage.updateBio(newBio);
        BioPage.verifyBio(newBio); 
    });

    it('should update the username', () => {
        const newUsername = faker.internet.userName(); 
        UsernamePage.updateUsername(newUsername);
        UsernamePage.verifyUsername(newUsername); 
    });

    it('should update the email', () => {
        const newEmail = faker.internet.email(); 
        EmailPage.updateEmail(newEmail);
        EmailPage.verifyEmail(newEmail); 
    });

    it('should update the password', () => {
        const newPassword = faker.internet.password(); 
        PasswordPage.updatePassword(newPassword);
        
    });
});
