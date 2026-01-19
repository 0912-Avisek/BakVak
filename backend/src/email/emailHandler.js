import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "../email/emailtemplate.js";


const sendWelcomeEmail = async (customeremail ,name ,clientURL) =>{

   const { data, error } = await resendClient.emails.send({
        from: sender.email,
        to: customeremail,
        subject: "Welcome to Bak_Vak !",
        html: createWelcomeEmailTemplate(name, clientURL)
    });
 
    if (error) {
        console.error("Error sending welcome email:", error);
        throw new Error("Failed to send welcome email");
    }

   // console.log("Welcome email sent successfully:", data);

}

export default sendWelcomeEmail;

