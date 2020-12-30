const mailer = require('nodemailer');

const transport = mailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
                user: 'srinathctf@gmail.com',
                pass: 'cegguindy'
        }
});

exports.emailer = (header, body, user) => {
        const message = {
                from: 'srinathsk0528@ctftask',
                to: user.email,
                subject: header,
                html: body
        };
        
        transport.sendMail(message, function(err, info) {
                if(err)
                        console.log(err);
                else    
                        console.log(info);      
        });
}